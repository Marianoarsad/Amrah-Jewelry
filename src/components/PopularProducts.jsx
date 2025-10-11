import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PearlBracelet from '../assets/pearl-bracelet.jpg'

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
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
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
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                        </button>
                    </div>
                ))}
            </Slider>
            </div>
        </div>
    )
}