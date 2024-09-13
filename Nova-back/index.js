const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors()); 
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// all data
app.get('/data', (req, res) => {
    res.json(data);
});

app.post('/data', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.status(201).json(newItem);
});

// new data
app.get('/data/sorted', (req, res) => {
    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
    res.json(sortedData);
});

// popular data
app.get('/data/popular', (req, res) => {
    const popularData = data.filter(item => item.popular && item.category >= 0 && item.category <= 3);
    const uniqueCategories = [...new Set(popularData.map(item => item.category))];
    const firstItemsByCategory = uniqueCategories
        .map(category => popularData
            .filter(item => item.category === category)
            .sort((a, b) => a.id - b.id)[0]
        )
        .filter(item => item !== undefined);
    res.json(firstItemsByCategory);
});

// category data
app.get('/data/category/:category', (req, res) => {
    const category = parseInt(req.params.category, 10);
    const categoryData = data.filter(item => item.category === category);
    res.json(categoryData);
});

// data by id
app.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = data.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// subscribe email
const filePath = path.join(__dirname, 'subscribe.json');

const saveEmailToFile = (email) => {
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return;
        }

        let emails = [];
        if (data) {
            try {
                emails = JSON.parse(data);
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
        }

        if (!emails.includes(email)) {
            emails.push(email);
        }

        fs.writeFile(filePath, JSON.stringify(emails, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
        });
    });
};
app.post('/mail/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Будь ласка, вкажіть дійсну електронну пошту' });
    }
    saveEmailToFile(email);
    // lettersub setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Ласкаво просимо!',
        text: 'Дякуємо за підписку на наші новини!',
    };

    // send letter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Не вдалося відправити лист' });
        } else {
            res.status(200).json({ message: 'Лист успішно відправлено!' });
        }
    });
});

// callback availability
const CallbackPath = path.join(__dirname, 'callback.json');
app.post('/mail/callback', (req, res) => {
    const { email, id, size } = req.body;
    let itemId=id;
    if (!itemId || !size || !email) {
        return res.status(400).json({ message: 'Щось пішло не так' });
    }

    fs.readFile(CallbackPath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Помилка при зчитуванні файлу' });
        }

        let emails = [];
        if (data) {
            try {
                emails = JSON.parse(data);
            } catch (err) {
                console.error('Error parsing JSON:', err);
                return res.status(500).json({ message: 'Помилка при парсингу JSON' });
            }
        }

        // duplicate check
        const isDuplicate = emails.some(
            (entry) => entry.itemId === itemId && entry.size === size && entry.email === email
        );

        if (!isDuplicate) {
            emails.push({ itemId, size, email });

            fs.writeFile(CallbackPath, JSON.stringify(emails, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ message: 'Помилка при записі у файл' });
                }
                res.status(200).json({ message: 'Ваш email успішно збережений для повідомлення' });
            });
        } else {
            res.status(200).json({ message: 'Ваш email успішно збережений для повідомлення' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});