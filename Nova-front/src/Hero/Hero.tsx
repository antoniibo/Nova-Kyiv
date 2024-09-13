import React,{ useState, useEffect } from "react";
import './Hero.css';
import { Slide } from "../tools/slides";
import image1 from '../assets/heroImg1.webp';
import image2 from '../assets/heroImg2.webp';
import image3 from '../assets/heroImg3.webp';

const sliderData=[
    {
        id:0,
        image:image1,
        header:'НОВА КОЛЕКЦІЯ',
        link:'Дізнатися більше',
        url:'/search?filter=new'
    },
    {
        id:1,
        image:image2,
        header:'ПОПУЛЯРНІ ШТУЧКИ',
        link:'Хочу побачити',
        url:'/search?filter=popular'
    },
    {
        id:2,
        image:image3,
        header:'ХТО МИ?',
        link:'Усе про нас',
        url:'/about'
    }
]

function Hero(){

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
        }, 5000);
        // }, 500000);  

        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };



    return(
        <section className="hero">
            {sliderData.map((data, index) => (
                <Slide
                    key={data.id}
                    image={data.image}
                    header={data.header}
                    link={data.link}
                    url={data.url}
                    active={index === currentSlide}
                />
            ))}
            <div className="dots">
                {sliderData.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </section>
    )
}

export default Hero