import Carousel from 'react-bootstrap/Carousel';
import SliderImage from './assets/slider.jpg';
import Image from 'react-bootstrap/Image';

function HomeCarousel() {
  return (
    <Carousel className='carousel-container'>
      <Carousel.Item interval={1000}>
        <Image src={SliderImage} className="d-block w-100" alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Image src={SliderImage} className="d-block w-100" alt="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={SliderImage} className="d-block w-100" alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;