import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// IMPORT THIS STATEMENT INTO PROPERTY DETAILS PAGE AND IT SHOULD WORK
// <Carousel propDat={data.imgSrc}/>

const Carousel = ({ propDat }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
    };

    return (
        <div>
            <Slider {...settings}>
                {propDat.map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
