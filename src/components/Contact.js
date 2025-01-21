import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { Form, Button } from 'react-bootstrap';

const Contact = () => {
    const { ref: refBanner, inView: inViewBanner } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refContact, inView: inViewContact } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });
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
                                <h1 className="mb-3 mt-5 bread">Contact Us</h1>
                                <p className='breadcrumbs'>
                                    <span className='mr-2'>
                                        <Link to="/">Home</Link>
                                    </span>
                                    <span>
                                        Contact
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </ParallaxBanner>
            </section>
            <section className='ftco-section contact-section'>
                <div className="custom-container mt-5">
                    <div className="row block-9">
                        <div ref={refContact} className={`col-md-4 contact-info ftco-animate ${inViewContact ? "fadeInUp ftco-animated" : ""}`}>
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <h2 className='h4'>Contact Information</h2>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Address:</span>198 West 21th Street, Suite 721 New York NY 10016</p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p>
                                        <span>Phone: </span>
                                        <Link to="tel://085320344238">+62 853 2034 4238</Link>
                                    </p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p>
                                        <span>Email: </span>
                                        <Link to="mailto:ahmadmushofasalsabil@gmail.com">ahmadmushofasalsabil@gmail.com</Link>
                                    </p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p>
                                        <span>Website: </span>
                                        <Link to="#">yoursite.com</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div ref={refContact} className={`col-md-6 ftco-animate ${inViewContact ? "fadeInUp ftco-animated" : ""}`}>
                            <Form className='contact-form'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className='form-group'>
                                            <Form.Control type='text' placeholder='Your Name' />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className='form-group'>
                                            <Form.Control type='text' placeholder='Your Email' />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Form.Group className='form-group'>
                                    <Form.Control type='text' placeholder='Subject' />
                                </Form.Group>
                                <Form.Group className='form-group'>
                                    <Form.Control as="textarea" cols="30" rows="7" placeholder='Message' />
                                </Form.Group>
                                <Form.Group className='form-group'>
                                    <Button className='btn btn-primary py-3 px-5' variant="primary" type="submit">Send Message</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </ParallaxProvider>
    </div>
  )
}

export default Contact