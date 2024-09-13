import React from "react";
import team from '../assets/team.webp'

const AboutData = () =>{
    return(
        <>
            <h3>НОВА КИЇВ: СТИЛЬ, ЯКИЙ ВІДОБРАЖАЄ ДУХ СУЧАСНОЇ УКРАЇНИ</h3>
            <p>
                Nova Kyiv – це не просто бренд одягу, це справжня філософія, яка 
                поєднує в собі сучасні тренди, високу якість та любов до рідної країни. 
                Від стильних курток до унікальних прикрас, кожен виріб створений з увагою 
                до деталей та з думкою про клієнта.
            </p>
            <h4>МОДА, ЯКА ВІДОБРАЖАЄ ІНДИВІДУАЛЬНІСТЬ</h4>
            <p>
                Nova Kyiv пропонує широкий асортимент товарів, які відповідають останнім модним 
                тенденціям. Кожен клієнт може знайти щось особливе для себе, що підкреслить 
                його індивідуальність та стиль. Від базових елементів гардеробу до яскравих 
                акцентів – Nova Kyiv має все, що потрібно для створення неповторного образу.
            </p>
            <h4>ПІДТРИМКА МІСЦЕВИХ ТАЛАНТІВ</h4>
            <p>
                Окрім одягу та аксесуарів, Nova Kyiv активно підтримує місцевих авторів, популяризуючи
                їхні книги. У магазині можна знайти твори талановитих українських письменників, які
                заслуговують на увагу широкої аудиторії. Це не лише сприяє розвитку літератури в 
                Україні, але й допомагає клієнтам відкривати для себе нові імена та захоплюючі 
                історії.
            </p>
            <h4>ВИГОТОВЛЕНО В УКРАЇНІ З ЛЮБОВ’Ю</h4>
            <p>
                Важливою особливістю Nova Kyiv є те, що весь їхній товар виготовлений в Україні. 
                Компанія пишається тим, що підтримує місцевих виробників і сприяє розвитку національної
                економіки. Кожен клієнт, купуючи продукцію Nova Kyiv, може бути впевнений, що він 
                отримує якісний товар, створений з дотриманням високих стандартів і з повагою до 
                українських традицій.
            </p>
            <h4>НАТХНЕННЯ ТА ІННОВАЦІЇ</h4>
            <p>
                Nova Kyiv постійно шукає нові ідеї та натхнення для створення своїх колекцій. 
                Вони черпають натхнення з сучасного мистецтва, музики, вуличної культури та 
                повсякденного життя. Це дозволяє їм створювати унікальні вироби, які відображають 
                дух часу та відповідають потребам сучасних клієнтів.
            </p>
            <h4>СПІЛЬНОТА ТА ВІДПОВІДАЛЬНІСТЬ</h4>
            <p>
                Nova Kyiv – це не лише про моду, але й про спільноту. Вони активно підтримують 
                соціальні ініціативи та благодійні проекти, спрямовані на покращення життя в Україні. 
                Компанія вірить у важливість відповідальності перед суспільством і прагне робити свій 
                внесок у розвиток країни.
            </p>
            <div className="about-image">
                <img src={team} alt="about image" />
            </div>
        </>
    )
}

export default AboutData