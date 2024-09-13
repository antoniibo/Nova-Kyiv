import cactus from './cactus.webp'
import cactus2 from './cactus2.webp'
import cactus3 from './cactus3.webp'
import card from './card.webp'
import card2 from './card2.webp'
import card3 from './card3.webp'
import glasses from './glasses.webp'
import glasses2 from './glasses2.webp'
import glasses3 from './glasses3.webp'
import koala from './koala.webp'
import koala2 from './koala2.webp'
import koala3 from './koala3.webp'
import monkey from './monkey.webp'
import monkey2 from './monkey2.webp'
import monkey3 from './monkey3.webp'
import pen from './pen.webp'
import pen2 from './pen2.webp'
import pen3 from './pen3.webp'
import tocobo from './tocobo.webp'
import tocobo2 from './tocobo2.webp'
import tocobo3 from './tocobo3.webp'

export const data =[
    {
        id:0,
        category:1,
        popular:true,
        date: '2024-07-11',
        header:'Фломастер',
        photo1:pen,
        photo2:pen2,
        photo3:pen3,
        price:'100',
        desc:'Найкращий фломастер у світі',
        addstaff:'Складові: пластик 100% <br/> Зроблений в Україні',
        remainder:20,
    },
    {
        id:9,
        category:0,
        popular:true,
        date: '2024-07-21',
        header:'Кофтинка',
        photo1:koala,
        photo2:koala2,
        photo3:koala3,
        price:'100',
        desc:'Найкраща кофтинка у світі',
        addstaff:'Складові: бавовна 100% <br/> Зроблений в Україні',
        size:{
            'S':{remainder:20},
            'M':{remainder:20},
            'L':{remainder:20},
            'X':{remainder:20},
        }
    },
    {
        id:2,
        category:2,
        popular:true,
        date: '2024-07-23',
        header:'Свічка',
        photo1:monkey,
        photo2:monkey2,
        photo3:monkey3,
        price:'100',
        desc:'Найкраща свічка у світі',
        addstaff:'Складові: віск 90%, фетиль 10% <br/> Зроблений в Україні',
    },
    {
        id:3,
        category:3,
        popular:true,
        date: '2024-07-10',
        header:'Книжка "Київ навесні"',
        photo1:card,
        photo2:card2,
        photo3:card3,
        price:'100',
        desc:'Найкраща книжка у світі',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
    {
        id:4,
        category:4,
        popular:false,
        date: '2024-07-20',
        header:'Подарунковий сертифікат 200',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'200',
        desc:'Гарний варіянт для всіх, хто не знає, що дарувати',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
    {
        id:5,
        category:4,
        popular:true,
        date: '2024-07-19',
        header:'Подарунковий сертифікат 500',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'500',
        desc:'Гарний варіянт для всіх, хто не знає, що дарувати',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
    {
        id:6,
        category:4,
        popular:false,
        date: '2024-07-18',
        header:'Подарунковий сертифікат 1000',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'1000',
        desc:'Гарний варіянт для всіх, хто не знає, що дарувати',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
    {
        id:7,
        category:1,
        popular:false,
        date: '2024-07-17',
        header:'Ручка-коала',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'100',
        desc:'Найкраща ручка у світі',
        addstaff:'Складові: пластик 100% <br/> Зроблений в Україні',
        remainder:20,
    },
    {
        id:8,
        category:1,
        popular:true,
        date: '2024-07-16',
        header:'Ножиці',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'100',
        desc:'Найкращі ножиці у світі',
        addstaff:'Складові: метал 80% пластик 20% <br/> Зроблений в Україні',
        remainder:20,
    },
    {
        id:1,
        category:0,
        popular:true,
        date: '2024-07-15',
        header:'Окуляри',
        photo1:glasses,
        photo2:glasses2,
        photo3:glasses3,
        price:'100',
        desc:'Найкращі окуляри у світі',
        addstaff:'Складові: пластик 100% <br/> Зроблений в Україні',
        size:{
            'S':{remainder:20},
            'R':{remainder:20}
        }
    },
    {
        id:10,
        category:0,
        popular:false,
        date: '2024-07-14',
        header:'Футболка',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'100',
        desc:'Найкраща футболка у світі',
        addstaff:'Складові: бавовна 100% <br/> Зроблений в Україні',
        size:{
            'S':{remainder:20},
            'M':{remainder:20},
            'L':{remainder:20},
            'X':{remainder:20},
        }
    },
    {
        id:11,
        category:2,
        popular:true,
        date: '2024-07-13',
        header:'Статуетка',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'100',
        desc:'Найкраща статуетка у світі',
        addstaff:'Складові: камінь 100% <br/> Зроблений в Україні',
    },
    {
        id:12,
        category:2,
        popular:true,
        date: '2024-07-24',
        header:'Склянка',
        photo1:cactus,
        photo2:cactus2,
        photo3:cactus3,
        price:'100',
        desc:'Найкраща склянка у світі',
        addstaff:'Складові: скло 100% <br/> Зроблений в Україні',
    },
    {
        id:13,
        category:3,
        popular:true,
        date: '2024-07-25',
        header:'Книжка "Вечір"',
        photo1:tocobo,
        photo2:tocobo2,
        photo3:tocobo3,
        price:'100',
        desc:'Найкраща книжка у світі',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
    {
        id:14,
        category:3,
        popular:true,
        date: '2024-07-12' ,
        header:'Книжка "Ранок"',
        photo1:'',
        photo2:'',
        photo3:'',
        price:'100',
        desc:'Найкраща книжка у світі',
        addstaff:'Складові: перероблений папір 100% <br/> Зроблений в Україні',
    },
]