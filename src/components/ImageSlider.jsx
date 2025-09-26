import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, CircleDot, Circle } from 'lucide-react';

export default function ImageSlider ({ images }) {
    
    const [ imageIndex, setImageIndex ] = useState(0);
    
    function showPrevImage () {

        setImageIndex((prevIndex) => {

            if (prevIndex === 0) {
                return images.length - 1;
            }

            return prevIndex - 1;
        });
    }

    function showNextImage () {
        
        setImageIndex((prevIndex) => {

            if (prevIndex === images.length - 1) {
                return 0;
            }

            return prevIndex + 1;
        });
    }

    return (
        <div style={{width: "100%", height: "100%", position: "relative"}}>
            <div style={{width: "100%", height: "100%", display: "flex", overflow: "hidden"}}>
                {images.map((url) => (
                    <img 
                    key={url}
                    src={url}
                    className="img-slider-img"
                    style={{translate: `${-100 * imageIndex}%`}}
                    /> 
                ))}
            </div>
            <button 
                className="image-slider-btn" 
                style={{ left: 0 }}
                onClick={showPrevImage}
            >
                <ArrowBigLeft/>
            </button>
            <button 
                className="image-slider-btn" 
                style={{ right: 0 }}
                onClick={showNextImage}
            >
                <ArrowBigRight/>
            </button>
            <div style={{
                position: "absolute",
                bottom: ".5rem",
                left: "50%",
                translate: "-50%",
                display: "flex",
                gap: ".50rem"
            }}>
                {images.map((_, index) => (
                    <button 
                        key={index} 
                        className='img-slider-dot-btn' 
                        onClick={() => setImageIndex(index)} 
                    >
                        {index === imageIndex ? <CircleDot /> : <Circle />}
                    </button>
                ))}
            </div>
        </div>
    )
}