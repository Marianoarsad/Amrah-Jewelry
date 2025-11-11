
// IMAGES
import PearlBracelet from '../assets/pearl-bracelet.jpg'

export default function Categories ({  }) {
    return (
        <div className="categories">
            
            <h2>Popular Categories</h2>

            <div className="categories-category-container">
                <a className="categories-category" href='#'>
                    <img src={PearlBracelet} height="100rem" />
                    <h2>BRACELET</h2>
                </a>
                <a className="categories-category" href='#'>
                    <img src={PearlBracelet} height="100rem" />
                    <h2>EARRINGS</h2>
                </a>
                <a className="categories-category" href='#'>
                    <img src={PearlBracelet} height="100rem" />
                    <h2>RINGS</h2>
                </a>
                <a className="categories-category" href='#'>
                    <img src={PearlBracelet} height="100rem" />
                    <h2>NECKLACES</h2>
                </a>
            </div>
        </div>
    )
}