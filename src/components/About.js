import React, { useState, useEffect } from "react";
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import '../assets/flaticon/flaticon.css';

const About = () => {

    // State untuk menyimpan data review
    const [testimony, setTestimony] = useState([]);
    
    const { ref: refBanner, inView: inViewBanner } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref:refAbout, inView: inViewAbout } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refTestimony, inView: inViewTestimony } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refSection, inView: inViewSection } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refCounter, inView: inViewCounter } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });

    //state number animation
    const [currentNumber1, setCurrentNumber1] = useState(0);
    const [currentNumber2, setCurrentNumber2] = useState(0);
    const [currentNumber3, setCurrentNumber3] = useState(0);
    const [currentNumber4, setCurrentNumber4] = useState(0);

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
        if (inViewCounter) {
          animateNumber(100, setCurrentNumber1);
          animateNumber(85, setCurrentNumber2);
          animateNumber(10567, setCurrentNumber3);
          animateNumber(900, setCurrentNumber4);
        }
      }, [inViewCounter]);
    
      useEffect (() => {
          const fetchTestimony = async () => {
              try {
                const response = await fetch('https://mern-project1-backend-production.up.railway.app/api/testimony');
                const data = await response.json();
                setTestimony(data);
              } catch (error) {
                console.error('Error fetching testimony:', error);
              }
    };
    fetchTestimony();
    }, []);

  return (
    <div>
        <ParallaxProvider>
        <section className='home-slider slick-slider'>
            <ParallaxBanner
            className='slider-item'
            layers={[
                { image: "/assets/bg_3.jpg", speed: -40, style: { backgroundSize: "contain"}}
            ]}
            >
                <div className="overlay"></div>
                <div className="custom-container">
                    <div className="row slider-text justify-content-center align-items-center">
                        <div ref={refBanner} className={`col-md-7 col-sm-12 text-center ftco-animate ${inViewBanner ? "fadeInUp ftco-animated" : ""}`}>
                            <h1 className='mb-3 mt-5 bread'>About Us</h1>
                            <p className='breadcrumbs'>
                                <span className='mr2'>
                                    <Link to="/home">Home</Link>
                                </span>
                                <span>
                                    About
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </section>
        <section className='ftco-about d-md-flex'>
            <div className="one-half img" style={{backgroundImage: "url(assets/about.jpg)"}}></div>
            <div ref={refAbout} className={`one-half ftco-animate ${inViewAbout ? "fadeInUp ftco-animated" : ""}`}>
                <div className="overlap">
                    <div ref={refAbout} className={`heading-section ftco-animate ${inViewAbout ? "fadeInUp ftco-animated" : ""}`}>
                        <span className='subheading'>Discover</span>
                        <h2 className='mb-4'>Our Story</h2>
                    </div>
                    <div>
                        <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                    </div>
                </div>
            </div>
        </section>
        <section id='ftco-testimony'>
            <ParallaxBanner
            className='ftco-section img'
            layers={[
                { image: "/assets/bg_1.jpg", speed: -40, style: { backgroundSize: "contain"}}
            ]}
            >
                <div className="overlay"></div>
                <div className="custom-container">
                    <div className="row justify-content-center mb-5">
                        <div ref={refTestimony} className={`col-md-7 heading-section text-center ftco-animate ${inViewTestimony ? "fadeInUp ftco-animated" : ""}`}>
                            <span className='subheading'>Testimony</span>
                            <h2 className='mb-4'>Customers Says</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div className="container-wrap">
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
        <section className='ftco-section'>
            <div className="custom-container">
                <div className="row align-items-center">
                    <div className="col-md-6 pr-md-5">
                        <div ref={refSection} className={`heading-section text-md-right ftco-animate ${inViewSection ? "fadeInUp ftco-animated" : ""}`}>
                            <span className='subheading'>Discover</span>
                            <h2 className='mb-4'>Our Menu</h2>
                            <p className='mb-4'>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                            </p>
                            <p>
                                <Link to="/menu" className='btn btn-primary btn-outline-primary px-4 py-3' >View Full Menu</Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="menu-entry">
                                    <div className="img" style={{ backgroundImage: `url('/assets/menu-1.jpg')` }}></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="menu-entry">
                                    <div className="img" style={{ backgroundImage: `url('/assets/menu-4.jpg')` }}></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="menu-entry">
                                    <div className="img" style={{ backgroundImage: `url('/assets/menu-1.jpg')` }}></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="menu-entry">
                                    <div className="img" style={{ backgroundImage: `url('/assets/menu-4.jpg')` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="section-counter">
            <ParallaxBanner
            className="ftco-counter ftco-bg-dark img"
            layers={[
                { image: "/assets/bg_2.jpg", speed: -20 }
            ]}
            style={{ height: "100%"}}
            >
                <div className="overlay"></div>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="row">
                                <div ref={refCounter} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCounter ? "fadeInUp ftco-animated" : ""}`}>
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <div className="icon"><span className='flaticon-coffee-cup'></span></div>
                                            <strong className="number">{currentNumber1.toLocaleString()}</strong>
                                            <span>Coffee Branches</span>
                                        </div>
                                    </div>
                                </div>
                                <div ref={refCounter} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCounter ? "fadeInUp ftco-animated" : ""}`}>
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <div className="icon"><span className='flaticon-coffee-cup'></span></div>
                                            <strong className="number">{currentNumber2.toLocaleString()}</strong>
                                            <span>Number of Awards</span>
                                        </div>
                                    </div>
                                </div>
                                <div ref={refCounter} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCounter ? "fadeInUp ftco-animated" : ""}`}>
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <div className="icon"><span className='flaticon-coffee-cup'></span></div>
                                            <strong className="number">{currentNumber3.toLocaleString()}</strong>
                                            <span>Happy Customers</span>
                                        </div>
                                    </div>
                                </div>
                                <div ref={refCounter} className={`col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate ${inViewCounter ? "fadeInUp ftco-animated" : ""}`}>
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <div className="icon"><span className='flaticon-coffee-cup'></span></div>
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
        </ParallaxProvider>
    </div>
  )
}

export default About
