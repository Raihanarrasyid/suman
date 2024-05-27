import { Box, IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slider from "react-slick";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// imports all images from assets folder
// const importAll = (r) =>
//   r.keys().reduce((acc, item) => {
//     acc[item.replace("./", "")] = r(item);
//     return acc;
//   }, {});

// export const heroTextureImports = importAll(
//   require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
// );

const MainCarousel = () => {
  const setting = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {},
      },
    ],
  };
  return (
    <Slider
      className="overflow-hidden md:rounded-lg w-full md:w-4/5 mx-auto px-0"
      {...setting}
    >
      {/* {Object.values(heroTextureImports).map((texture, index) => ( */}
      <div className="md:rounded-lg">
        <img
          className="md:rounded-lg"
          src={image1}
          alt={`carousel-1`}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className="md:rounded-lg">
        <img
          className="md:rounded-lg"
          src={image2}
          alt={`carousel-2`}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className="md:rounded-lg">
        <img
          className="md:rounded-lg"
          src={image3}
          alt={`carousel-3`}
          style={{
            width: "100%",
          }}
        />
      </div>
      {/* ))} */}
    </Slider>
    // <Carousel
    //   autoPlay={true}
    //   interval={3000}
    //   infiniteLoop={true}
    //   showThumbs={false}
    //   showIndicators={false}
    //   showStatus={false}
    //   renderArrowPrev={(onClickHandler, hasPrev, label) => (
    //     <IconButton
    //       onClick={onClickHandler}
    //       sx={{
    //         position: "absolute",
    //         top: "50%",
    //         left: "0",
    //         color: "black",
    //         padding: "5px",
    //         zIndex: "10",
    //       }}
    //     >
    //       <NavigateBeforeIcon sx={{ fontSize: 40 }} />
    //     </IconButton>
    //   )}
    //   renderArrowNext={(onClickHandler, hasNext, label) => (
    //     <IconButton
    //       onClick={onClickHandler}
    //       sx={{
    //         position: "absolute",
    //         top: "50%",
    //         right: "0",
    //         color: "black",
    //         padding: "5px",
    //         zIndex: "10",
    //       }}
    //     >
    //       <NavigateNextIcon sx={{ fontSize: 40 }} />
    //     </IconButton>
    //   )}
    // >
    //   {Object.values(heroTextureImports).map((texture, index) => (
    //     <Box key={`carousel-image-${index}`}>
    //       <img
    //         src={texture}
    //         alt={`carousel-${index}`}
    //         style={{
    //           width: "100%",
    //           height: "max-content",
    //           objectFit: "cover",
    //           backgroundAttachment: "fixed",
    //         }}
    //       />
    //     </Box>
    //   ))}
    // </Carousel>
  );
};

export default MainCarousel;
