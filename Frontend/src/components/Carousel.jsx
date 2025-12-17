// HOOKS
import { useState, useEffect } from "react";

// COMPONENTS
import { CircleArrowLeft, CircleArrowRight, CircleDot, Circle } from 'lucide-react';

// IMAGES
import image1 from '/image-1.jpg'
import image2 from '/image-2.jpg'
import image3 from '/image-3.jpg'
import image4 from '/image-4.jpg'
import image5 from '/image-5.jpg'

// AN ARRAY OF URLs
const IMAGES = [image1, image2, image3, image4, image5];

export default function Carousel () {
    
    const [ imageIndex, setImageIndex ] = useState(0);
    
    function showPrevImage () {

        setImageIndex((prevIndex) => {

            if (prevIndex === 0) {
                return IMAGES.length - 1;
            }

            return prevIndex - 1;
        });
    }

    function showNextImage () {
        
        setImageIndex((prevIndex) => {

            if (prevIndex === IMAGES.length - 1) {
                return 0;
            }

            return prevIndex + 1;
        });
    }
    /*
    // AUTOMATIC CAROUSEL
    useEffect(() => {

        const interval = setInterval(() => {

            console.log('NEXT IMAGE');
            showNextImage();
            
        }, 10000);

        return () => {
            clearInterval(interval);
        }

    }, []);
    */
    return (
        <div className="carousel">
            <div className="img-slider-container">

                <div className="img-placeholder">
                    {IMAGES.map((url) => (
                        <img 
                            key={url}
                            src={url}
                            className="img-slider-img"
                            style={{translate: `${-100 * imageIndex}%`}}
                        /> 
                    ))}
                </div>

                {/* SLIDER LEFT & RIGHT BUTTONS */}
                <button 
                    className="img-slider-btn" 
                    style={{ left: 20 }}
                    onClick={showPrevImage}
                >
                    <CircleArrowLeft/>
                </button>
                <button 
                    className="img-slider-btn" 
                    style={{ right: 20 }}
                    onClick={showNextImage}
                >
                    <CircleArrowRight/>
                </button>

                {/* DOT BUTTONS */}
                <div className="img-slider-dot-container">
                    {IMAGES.map((_, index) => (
                        <button 
                            key={index}
                            className='img-slider-dot-btn' 
                            onClick={() => setImageIndex(index)} 
                        >
                            {index === imageIndex ? <CircleDot style={{stroke: "#C64B50"}} /> : <Circle />}
                        </button>
                    ))}
                </div>
                <button className="carousel-shop-now-btn">Shop now</button>
            </div>    
        </div>
    )
}