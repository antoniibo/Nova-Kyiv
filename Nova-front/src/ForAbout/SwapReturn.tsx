import React from "react";

const SwapReturn =()=>{
    return(
        <>
            <h3>Правила обміну та повернення:</h3>
            <p>Обмін та повернення товарів можливі протягом 14 днів з моменту отримання замовлення.​</p>

            <h4>Процес повернення:</h4>
            <ul className="num">
                <li>Покупець відправляє товар поштою (укрпоштою або новою поштою).</li>
                <li>Доставка оплачується покупцем.</li>
                <li>Після отримання, товар оглядається на предмет збереження його товарного вигляду.</li>
                <li>Якщо товар належного вигляду, відбувається повернення коштів покупцю.</li>
                <li>Повернення коштів відбувається у термін не більше 3 банківських днів з моменту отримання відповідного запиту на реквізити, з яких здійснювалась оплата.</li>
            </ul>

            <h4>Винятки:</h4>
            <p>Згідно законодавства України (додаток N 3 до постанови Кабінету Міністрів України від 19 березня 1994 р N172) поверненню <b>​НЕ підлягають:</b>​</p>
            <ul className="dash">
                <li>Товари зі слідами вжитку</li>
                <li>Друковані видання</li>
                <li>Ювелірні вироби з дорогоцінних металів</li>
                <li>Панчіщно-шкарпеткові вироби</li>
                <li>Парфумерно-косметичні вироби</li>
            </ul>
        </>
    )
}

export default SwapReturn;