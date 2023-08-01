import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import style from "./Slider.module.css"
function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className={style.img}>
        <img
          className={"d-block w-100 "+style.slider}
          src="https://source.unsplash.com/t7YycgAoVSw/1600x900"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className={style.img}>
        <img
          className={"d-block w-100 "+style.slider}
          src="https://source.unsplash.com/11H1SSVcIxc/1600x900"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className={style.img}>
        <img
          className={"d-block w-100 "+style.slider}
          src="https://source.unsplash.com/OlZ1nWLEEgM/1600x900"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;