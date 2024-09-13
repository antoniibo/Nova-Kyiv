// Header and Bento
import present from '../assets/present.webp'
import books from '../assets/card.webp'
import style from '../assets/glasses.webp'
import goods from '../assets/tocobo.webp'
import house from '../assets/monkey.webp'


export const conection = [
    { name: 'Стиль', path: '/style', image:style, category:0, heading:"Який моднявий!" },
    { name: 'Дрібнички', path: '/goods', image:goods, category:1, heading:"Що за краса?" },
    { name: 'Для Дому', path: '/house', image:house, category:2, heading:"Який моднявий!" },
    { name: 'Книги', path: '/books', image:books, category:3, heading:"Даси почитати?" },
    { name: 'У Подарунок', path: '/present',image:present,category:4, heading:"Оце подарунок!" }
];