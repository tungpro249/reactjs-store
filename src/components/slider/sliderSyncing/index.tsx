// import React, { useState } from 'react'
// import { Carousel } from 'react-responsive-carousel'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'

// const SliderSyncing = ({ images }) => {
//     const [selectedIndex, setSelectedIndex] = useState(0)

//     // Hàm xử lý khi thay đổi slide
//     const handleSlideChange = (index) => {
//         setSelectedIndex(index)
//     }

//     return (
//         <div>
//             <h2>Slider 1</h2>
//             <Carousel
//                 selectedItem={selectedIndex}
//                 onChange={handleSlideChange}
//                 showThumbs={false}
//             >
//                 {images.map((image, index) => (
//                     <div key={index}>
//                         <img alt={`slide-${index}`} src={image} />
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     )
// }

// export default SliderSyncing
