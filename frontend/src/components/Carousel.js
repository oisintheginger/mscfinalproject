import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { propertyData } from './PropertyDataSample';

const CarouselItem = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {propertyData.map((property, index) => (
                <div key={index}>
                    <img src={property.imgSrc} alt={property.buildingName} />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselItem;
