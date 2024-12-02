import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SliderCarouselProps {
  images: string[]; 
  autoPlay?: boolean; 
  showThumbs?: boolean;
  infiniteLoop?: boolean; 
}

const SliderCarousel: React.FC<SliderCarouselProps> = ({
  images,
  autoPlay = true,
  showThumbs = false,
  infiniteLoop = true,
}) => (
  <Carousel autoPlay={autoPlay} showThumbs={showThumbs} infiniteLoop={infiniteLoop}>
    {images.map((image, index) => (
      <div key={index}>
        <img alt={`slide-${index}`} src={image} />
      </div>
    ))}
  </Carousel>
);

export default SliderCarousel;
