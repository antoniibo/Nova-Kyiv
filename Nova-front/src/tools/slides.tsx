import React,{memo} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// Hero slider
interface SlideProps {
    image: string;
    header: string;
    link: string;
    url: string;
    active: boolean;
}
export const Slide: React.FC<SlideProps> = memo(({ image, header, link, url, active }) => {
    return (
        <div className={`slide ${active ? 'active' : ''}`}>
            <img src={image} alt="hero image" />
            <h1>{header}</h1>
            {/* <Link to='/search?filter=popular'>Ще <span className="to-hide">більше </span><FontAwesomeIcon icon={faArrowRight} className="svg-linker"/></Link> */}
            <p><Link to={url}>{link} <FontAwesomeIcon icon={faArrowRight} className="svg-linker"/></Link></p>
            {/* <Link to={url}> <FontAwesomeIcon icon={faArrowRight} className="svg-linker"/></Link> */}

        </div>
    );
});