import React from "react";
import { Link } from "react-router-dom";
import kyiv from '../assets/kyiv.webp'
import './Introduction.css'

function Introduction(){
    return(
        <section className="introduction">
                <main>
                    <h2>Самих про себе</h2>
                    <p className="to-hide">
                        Nova Kyiv – це сучасна компанія, яка спеціалізується на продажу стильного молодіжного одягу та аксесуарів. 
                        Від модних кофтин до унікальних прикрас, Nova Kyiv пропонує широкий асортимент товарів, які відповідають останнім трендам і підкреслюють індивідуальність кожного клієнта. 
                        Кожен виріб створений з любов’ю та увагою до деталей, що робить їх не лише стильними, але й високоякісними.
                    </p>
                    <p>
                        Кожен клієнт, купуючи продукцію Nova Kyiv, може бути впевнений, що він отримує якісний товар, створений з дотриманням високих стандартів і з повагою до українських традицій!
                    </p>
                    <Link to='/about'className="linker"><p >Ще про нас</p></Link>
                </main>
                <aside>
                    <img src={kyiv} alt="Kyiv photo" />
                </aside>
        </section>
    )
}
export default Introduction;