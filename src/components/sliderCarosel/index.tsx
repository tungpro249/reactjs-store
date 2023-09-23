import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderCarosel = () => (
  <Carousel autoPlay showThumbs={false} infiniteLoop>
    <div>
      <img
        alt=""
        src="https://file.hstatic.net/200000182297/file/banner_web_15_02_23_bc417e51b3bb4665845c5e80fa268e1c.jpg"
      />
    </div>
    <div>
      <img
        alt=""
        src="https://file.hstatic.net/200000182297/file/sacc_3ac903271d5a4ea0b08e55159bbabfd0.jpg"
      />
    </div>
    <div>
      <img
        alt=""
        src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=840"
      />
    </div>
    <div>
      <img
        alt=""
        src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=840"
      />
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
