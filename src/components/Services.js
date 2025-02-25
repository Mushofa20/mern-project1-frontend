import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import '../assets/flaticon/flaticon.css';

const Services = () => {
    const {ref: refBanner, inView: inViewBanner} = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const {ref: refServices, inView: inViewServices} = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    })

  return (
    <div>
        <ParallaxProvider>
        <section className='home-slider slick-slider'>
            <ParallaxBanner
            className='slider-item'
            layers={[
                { image: "/assets/bg_3.jpg", speed: -40, style: { backgroundSize: "contain" }}
            ]}
            >
                <div className="overlay"></div>
                <div className="custom-container">
                    <div className="row slider-text justify-content-center align-items-center">
                        <div ref={refBanner} className={`col-md-7 col-sm-12 text-center ftco-animate ${inViewBanner ? "fadeInUp ftco-animated" : ""}`}>
                            <h1 className='mb-3 mt-5 bread'>Services</h1>
                            <p className='breadcrumbs'>
                                <span className='mr-2'>
                                    <Link to="/">Home</Link>
                                </span>
                                <span>Services</span>
                            </p>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </section>
        <section className='ftco-section ftco-services'>
            <div className="custom-container">
                <div className="row">
                    <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
                        <div className="media d-block text-center block-6 services">
                            <div className="icon d-flex justify-content-center align-items-center mb-5">
                                <span className='flaticon-choices'></span>
                            </div>
                            <div className="media-body">
                                <h3 className='heading'>Easy to Order</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut risus eget erat luctus aliquet.</p>
                            </div>
                        </div>
                    </div>
                    <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
                        <div className="media d-block text-center block-6 services">
                            <div className="icon d-flex justify-content-center align-items-center mb-5">
                                <span className='flaticon-delivery-truck'></span>
                            </div>
                            <div className="media-body">
                                <h3 className='heading'>Fastest Delivery</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut risus eget erat luctus aliquet.</p>
                            </div>
                        </div>
                    </div>
                    <div ref={refServices} className={`col-md-4 ftco-animate ${inViewServices ? "fadeInUp ftco-animated" : ""}`}>
                        <div className="media d-block text-center block-6 services">
                            <div className="icon d-flex justify-content-center align-items-center mb-5">
                                <span className='flaticon-coffee-bean'></span>
                            </div>
                            <div className="media-body">
                                <h3 className='heading'>Quality Coffee</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut risus eget erat luctus aliquet.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </ParallaxProvider>
    </div>
  )
}

export default Services
