import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        <div>
          <img
            src="https://i.ibb.co.com/p246TGp/adv-23042024-12-24-1735022744.jpg"
            alt="Banner 1"
            className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>

        <div>
          <img
            src="https://i.ibb.co.com/X3rxMMW/adv-54712024-12-24-1735022931.jpg"
            alt="Banner 2"
            className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;