import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronRight, ChevronLeft } from 'lucide-react';

import PearlBracelet from '../assets/pearl-bracelet.jpg'
/*
import CustomPrevArrow from "./CustomPrevArrow.jsx";
import CustomNextArrow from './CustomNextArrow.jsx';
*/

function CustomPrevArrow (props) {

    const { className, onClick } = props;
    const isDisabled = className?.includes("slick-disabled");

    return (
        <button
            className="custom-arrow custom-prev" 
            onClick={onClick}
            disabled={isDisabled}
        >
            <ChevronLeft size={50} color="#C64B50"/>
        </button>
    )
}

function CustomNextArrow (props) {

    const { className, onClick } = props;
    const isDisabled = className?.includes("slick-disabled");

    return (
        <button
            className="custom-arrow custom-next" 
            onClick={onClick}
            disabled={isDisabled}
        >
            <ChevronRight size={50} color="#C64B50" />
        </button>
    )
}

const products = [
    { name: 'Pearl Bracelet', price: 20000, img: PearlBracelet },
    { name: 'Pearl Necklace', price: 23400, img: PearlBracelet },
    { name: 'Pearl Earrings', price: 87000, img: PearlBracelet },
    { name: 'Pearl Pendant', price: 92000, img: PearlBracelet },
    { name: 'Pearl Pendant', price: 37000, img: PearlBracelet },
    { name: 'Pearl Pendant', price: 14000, img: PearlBracelet },
    { name: 'Pearl Pendant', price: 19999, img: PearlBracelet },
]

export default function PopularProducts () {
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>
    }
    
    return (
        <div className="popular-products">

            <h2>Popular Products</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div className="popular-products-card">
                            <button>
                                <img src={product.img} alt="product"/>
                                <h3>{product.name.toUpperCase()}</h3>
                                <p>₱{product.price.toLocaleString('en-US')}</p>
                            </button>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}