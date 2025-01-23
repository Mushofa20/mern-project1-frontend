import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import Slider from "react-slick";
import imageAbout from "../assets/images/about.jpg";
import '../assets/flaticon/flaticon.css';

const Main = () => {
const sliderRef = useRef(null);

  useEffect(() => {
    console.log("Slider Element:", sliderRef.current);
  }, []);

  // State untuk menyimpan data produk
  const [products, setProducts] = useState([]); 

  //State untuk menyimpan data review customer
  const [testimony, setTestimony] = useState([]);

  //state slider
  const [currentSlide, setCurrentSlide] = useState(0);

  //state number animation
  const [currentNumber1, setCurrentNumber1] = useState(0);
  const [currentNumber2, setCurrentNumber2] = useState(0);
  const [currentNumber3, setCurrentNumber3] = useState(0);
  const [currentNumber4, setCurrentNumber4] = useState(0);

  const { ref: refIntro, inView: inViewIntro } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refAbout, inView: inViewAbout } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refServices, inView: inViewServices } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refCount, inView: inViewCount } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refMenu, inView: inViewMenu } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  })

  const { ref: refProduct, inView: inViewProduct } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refGallery, inView: inViewGallery } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { ref: refTestimony, inView: inViewTestimony } = useInView ({
    threshold: 0.5,
    triggerOnce: true,
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "linear",
    afterChange: (index) => setCurrentSlide(index),
  };

  const slides = [
    {
      id: 1,
      background: "/assets/bg_1.jpg",
      title: "The Best Coffee Testing Experience",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
      id: 2,
      background: "/assets/bg_2.jpg",
      title: "Amazing Taste & Beautiful Place",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
      id: 3,
      background: "/assets/bg_3.jpg",
      title: "Creamy Hot and Ready to Serve",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
  ];

  const menuImg = [
    { id: 1, 
      background: "url('/assets/menu-1.jpg')",
    },
    { id: 2, 
      background: "url('/assets/menu-2.jpg')",
    },
    { id: 3, 
      background: "url('/assets/menu-3.jpg')",
    },
    { id: 4, 
      background: "url('/assets/menu-4.jpg')",
    },
  ];

  const animateNumber = (targetNumber, setCurrentNumber) => {
    const start = 0;
    const end = targetNumber;
    const duration = 2000;
    let startTime;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentProgress = Math.min(progress / duration, 1);
      const currentValue = Math.floor(start + (end - start) * currentProgress);

      setCurrentNumber(currentValue);

      if (currentProgress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    if (inViewCount) {
      animateNumber(100, setCurrentNumber1);
      animateNumber(85, setCurrentNumber2);
      animateNumber(10567, setCurrentNumber3);
      animateNumber(900, setCurrentNumber4);
    }
  }, [inViewCount]);

  useEffect(() => {
    slides.forEach((slide) => {
      fetch(`${process.env.PUBLIC_URL}${slide.background}`)
        .then((response) => {
          if (response.status === 403) {
            console.error(`Akses dilarang (403) pada gambar: ${slide.background}`);
          } else if (response.status === 404) {
            console.error(`Gambar tidak ditemukan (404): ${slide.background}`);
          } else if (!response.ok) {
            console.error(`Terjadi kesalahan pada gambar: ${slide.background} - Status: ${response.status}`);
          } else {
            console.log(`Gambar ditemukan: ${slide.background} - Status: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error('Terjadi kesalahan saat memeriksa gambar:', error);
        });
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('mern-project1-backend-production.up.railway.app/api/products?type=drink&status=best%20sellers'); // URL backend
        const data = await response.json();
        setProducts(data); // Simpan data produk di state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTestimony = async () => {
      try {
        const response = await fetch('mern-project1-backend-production.up.railway.app/api/testimony');
        const data = await response.json();
        setTestimony(data);
      } catch (error) {
        console.error('Error fetching testimony:', error);
      }
    };
    fetchTestimony();
  }, []);

  return (
    <div ref={sliderRef}>
      <Slider className="home-slider" {...sliderSettings}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`bg-${ slide.id } slider-item ${currentSlide === index ? "active-slide" : ""}`}
            style={{ backgroundImage: `url(${slide.background}) !important` }}
          >
            <div className="overlay"></div>
            <div className="custom-container">
              <div className="row slider-text justify-content-center align-items-center">
                <div
                  className={`col-md-8 col-sm-12 text-center ftco-animate ${
                    currentSlide === index ? "fadeInUp ftco-animated" : ""
                  }`}
                >
                  <span className="subheading">Welcome</span>
                  <h1 className="mb-4">{slide.title}</h1>
                  <p className="mb-4 mb-md-5">{slide.description}</p>
                  <p>
                    <Link to="#" className="btn btn-primary p-3 px-xl-4 py-xl-3">
                      Order Now
                    </Link>{" "}
                    <Link to="#" className="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">
                      View Menu
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <ParallaxProvider>
      <section className="ftco-intro">
        <div className="custom-container-wrap">
          <div className="wrap d-md-flex align-items-xl-end">
            <div className="info">
              <div className="row no-gutters">
                <div ref={refIntro} className={`col-md-4 d-flex ftco-animate ${inViewIntro ? "fadeInUp ftco-animated" : ""}`}>
                  <div className="icon"><span className="icon-phone"></span></div>
                    <div className="text">
                      <h3>000 (123) 456 7890</h3>
                      <p>
                        A small river named Duden flows by their place and supplies.
                      </p>
                    </div>
                </div>
                <div ref={refIntro} className={`col-md-4 d-flex ftco-animate ${inViewIntro ? "fadeInUp ftco-animated" : ""}`}>
                  <div className="icon"><span className="icon-my_location"></span></div>
                    <div className="text">
                      <h3>198 West 21th Street</h3>
                      <p>
                        03 Fake St. Mountain View, San Francisco, California, USA
                      </p>
                    </div>
                </div>
                <div ref={refIntro} className={`col-md-4 d-flex ftco-animate ${inViewIntro ? "fadeInUp ftco-animated" : ""}`}>
                  <div className="icon"><span className="icon-clock-o"></span></div>
                    <div className="text">
                      <h3>Open Monday - Friday</h3>
                      <p>
                        8:00am - 9:00pm
                      </p>
                    </div>
                </div>
              </div>
            </div>
            <div className="book p-4">
              <h3>Book a Table</h3>
              <form action="/" method="post" className="appointment-form">
                <div className="d-md-flex">
                  <div className="form-group">
                    <input type="text" name="first_name" className="form-control" placeholder="First Name"/>
                  </div>
                  <div className="form-group ml-md-4">
                    <input type="text" name="last_name" className="form-control" placeholder="Last Name"/>
                  </div>
                </div>
                <div className="d-md-flex">
                  <div className="form-group">
                    <div className="input-wrap">
                      <div className="icon"><span className="ion-md-calendar"></span></div>
                      <input type="text" name="date" className="form-control appointment_date" placeholder="Date"/>
                    </div>
                  </div>
                  <div className="form-group ml-md-4">
                    <div className="input-wrap">
                      <div className="icon"><span className="ion-ios-clock"></span></div>
                      <input type="text" name="time" className="form-control appointment_time" placeholder="Time"/>
                    </div>
                  </div>
                  <div className="form-group ml-md-4">
                    <input type="text" name="phone" className="form-control" placeholder="Phone"/>
                  </div>
                </div>
                <div className="d-md-flex">
                  <div className="form-group">
                    <textarea name="message" id="" cols={30} rows={2} className="form-control" placeholder="Message"></textarea>
                  </div>
                  <div className="form-group ml-md-4">
                    <button type="submit" name="submit" className="btn btn-white py-3 px-4">Book Now</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-about d-md-flex">
        <div className="one-half img" style={{backgroundImage: `url(${imageAbout})`}}></div>
        <div ref={refAbout} className={`one-half ftco-animate ${inViewAbout ? "fadeInUp ftco-animated" : ""}`}>
          <div className="overlap">
            <div ref={refAbout} className={`heading-section ftco-animate ${inViewAbout ? "fadeInUp ftco-animated" : ""}`}>
              <span className="subheading">Discover</span>
              <h2 className="mb-4">Our Story</h2>
            </div>
            <div>
              <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section ftco-services">
        <div className="custom-container">
          <div className="row">
            <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
              <div className="media d-block text-center block-6 services">
                <div className="icon d-flex justify-content-center align-items-center mb-5">
                  <span className="flaticon-choices"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Easy to Order</h3>
                  <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                </div>
              </div>
            </div>
            <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
              <div className="media d-block text-center block-6 services">
                <div className="icon d-flex justify-content-center align-items-center mb-5">
                  <span className="flaticon-delivery-truck"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Fastest Delivery</h3>
                  <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                </div>
              </div>
            </div>
            <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
              <div className="media d-block text-center block-6 services">
                <div className="icon d-flex justify-content-center align-items-center mb-5">
                  <span className="flaticon-coffee-bean"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Quality Coffe</h3>
                  <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section">
        <div className="custom-container">
          <div className="row align-items-center">
            <div className="col-md-6 pr-md-5">
              <div ref={refMenu} className={`heading-section text-md-right ftco-animate ${inViewMenu ? "fadeInUp ftco-animated" : ""}`}>
                <span className="subheading">Discover</span>
                <h2 className="mb-4">Our Menu</h2>
                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                <p><a href="/" className="btn btn-primary btn-outline-primary px-4 py-3">View Full Menu</a></p>
              </div>
            </div>
            <div className="col-md-6">
            <div className="row">
              {menuImg.map((menu) => (
                <div key={menu.id} className="col-md-6">
                <div className="menu-entry">
                  <Link to="/" className="img" style={{backgroundImage: menu.background}}></Link>
                </div>
              </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>
      <section id="section-counter" >
      <ParallaxBanner
      className="ftco-counter ftco-bg-dark img"
      layers={[
        { image: "/assets/bg_2.jpg", speed: -20 }
      ]}
      style={{ height: "100%" }}
      >
      <div className="overlay"></div>
      <div className="custom-container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              <div ref={refCount} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCount ? "fadeInUp ftco-animated" : ""}`}>
                <div className="block-18 text-center">
                  <div className="text">
                    <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                    <strong className="number">{currentNumber1.toLocaleString()}</strong>
                    <span>Coffee Branches</span>
                  </div>
                </div>
              </div>
              <div ref={refCount} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCount ? "fadeInUp ftco-animated" : ""}`}>
                <div className="block-18 text-center">
                  <div className="text">
                    <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                    <strong className="number">{currentNumber2.toLocaleString()}</strong>
                    <span>Number of Awards</span>
                  </div>
                </div>
              </div>
              <div ref={refCount} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCount ? "fadeInUp ftco-animated" : ""}`}>
                <div className="block-18 text-center">
                  <div className="text">
                    <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                    <strong className="number">{currentNumber3.toLocaleString()}</strong>
                    <span>Happy Customer</span>
                  </div>
                </div>
              </div>
              <div ref={refCount} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCount ? "fadeInUp ftco-animated" : ""}`}>
                <div className="block-18 text-center">
                  <div className="text">
                    <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                    <strong className="number">{currentNumber4.toLocaleString()}</strong>
                    <span>Staff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ParallaxBanner>
      </section>
      <section className="ftco-section">
        <div className="custom-container">
          <div className="row justify-content-center mb-5 pb-3">
            <div ref={refProduct} className={`col-md-7 heading-section text-center ftco-animate ${inViewProduct ? "fadeInUp ftco-animated" : ""}`}>
              <span className="subheading">Discover</span>
              <h2 className="mb-4">Best Coffee Sellers</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3">
                <div className="menu-entry">
                  <Link to="/" className="img"
                    style={{ 
                      backgroundImage: `url(${product.image})`, 
                    }}
                  >
                  </Link>
                  <div className="text text-center pt-4">
                    <h3 className="mb-3">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">
                      <span>Rp. {product.price.toLocaleString('id-ID')}</span>
                    </p>
                    <p>
                      <Link to={`/product-single/${product._id}`} className="btn btn-primary btn-outline-primary">Show</Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ftco-gallery">
        <div className="custom-container-wrap">
          <div className="row no-gutters">
            <div ref={refGallery} className={`col-md-3 ftco-animate ${inViewGallery ? "fadeInUp ftco-animated" : ""}`}>
              <a href="/" className="gallery img d-flex align-items-center" style={{backgroundImage: 'url(/assets/gallery-1.jpg)'}}>
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-search"></span>
                </div>
              </a>
            </div>
            <div ref={refGallery} className={`col-md-3 ftco-animate ${inViewGallery ? "fadeInUp ftco-animated" : ""}`}>
              <a href="/" className="gallery img d-flex align-items-center" style={{backgroundImage: 'url(/assets/gallery-2.jpg)'}}>
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-search"></span>
                </div>
              </a>
            </div>
            <div ref={refGallery} className={`col-md-3 ftco-animate ${inViewGallery ? "fadeInUp ftco-animated" : ""}`}>
              <a href="/" className="gallery img d-flex align-items-center" style={{backgroundImage: 'url(/assets/gallery-3.jpg)'}}>
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-search"></span>
                </div>
              </a>
            </div>
            <div ref={refGallery} className={`col-md-3 ftco-animate ${inViewGallery ? "fadeInUp ftco-animated" : ""}`}>
              <a href="/" className="gallery img d-flex align-items-center" style={{backgroundImage: 'url(/assets/gallery-4.jpg)'}}>
                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                  <span className="icon-search"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
      <ParallaxBanner
      id="ftco-testimony"
      className="ftco-section img"
      layers={[
        { image: "/assets/bg_1.jpg", speed: -30, style:{backgroundSize: "contain"} }
      ]}
      style={{ height: "100%" }}
      >
        <div className="overlay"></div>
        <div className="custom-container">
          <div className="row justify-content-center mb-5">
            <div ref={refTestimony} className={`col-md-7 heading-section text-center ftco-animate ${inViewTestimony ? "fadeInUp ftco-animated" : ""}`}>
              <span className="subheading">Testimony</span>
              <h2 className="mb-4">Customers Says</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </div>
        </div>
        <div className="custom-container-wrap">
          <div className="row d-flex no-gutters">
          {testimony.map((testimony) => (
              <div ref={refTestimony} className={`col-md-3 align-self-sm-end ftco-animate ${inViewTestimony ? "fadeInUp ftco-animated" : ""}`}>
                <div className="testimony">
                  <blockquote>
                    <p>&ldquo;{testimony.review}&rdquo;</p>
                  </blockquote>
                  <div className="name align-self-center">{testimony.email.toLocaleString('id-ID')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxBanner>
      </section>
      </ParallaxProvider>
    </div>
  );
};

export default Main;
