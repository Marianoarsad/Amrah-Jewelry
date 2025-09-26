// COMPONENTS
import Page from "./components/Page.jsx";
import Header from "./components/Header.jsx";

import ImageSlider from "./components/ImageSlider.jsx";

// IMAGES
import image1 from '/image-1.jpg'
import image2 from '/image-2.jpg'
import image3 from '/image-3.jpg'
import image4 from '/image-4.jpg'
import image5 from '/image-5.jpg'

// CONTAINS THE URL OF THE IMAGES
const IMAGES = [image1, image2, image3, image4, image5];

function App() {

  return (
    <>
            <Header />
            <div style={{ 
                maxWidth: "100vw", 
                width: "100%", 
                height: "100vh", 
                margin: "0 auto",
                aspectRatio: "10 / 6"
            }}>
               <ImageSlider images={IMAGES} /> 
            </div>
            
        
    </>
  )
}

export default App
