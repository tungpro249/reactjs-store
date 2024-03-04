import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderCarosel = () => (
  <Carousel autoPlay showThumbs={false} infiniteLoop>
    <div>
      <img
        alt=""
        src="https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=202"
      />
    </div>
    <div>
      <img alt="" src="https://360.com.vn/wp-content/uploads/2023/11/BANNER-WEB-1350X490.jpg" />
    </div>
    <div>
      <img
        alt=""
        src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=840"
      />
    </div>
  </Carousel>
);

export default SliderCarosel;
