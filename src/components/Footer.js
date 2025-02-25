import React from 'react';
import image1 from '../assets/images/image_1.jpg';
import image2 from '../assets/images/image_2.jpg';
import '../assets/icomoon/icomoon.css';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="ftco-footer ftco-section img">
    	<div className="overlay"></div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
            <div className="ftco-footer-widget mb-4" data-aos="fade-up" data-aos-delay="100">
              <h2 className="ftco-heading-2">About Us</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut risus eget erat luctus aliquet.</p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li data-aos="fade-up" data-aos-delay="200"><a href="/"><span className="icon-twitter"></span></a></li>
                <li data-aos="fade-up" data-aos-delay="200"><a href="/"><span className="icon-facebook"></span></a></li>
                <li data-aos="fade-up" data-aos-delay="200"><a href="/"><span className="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-5 mb-md-5">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Recent Blog</h2>
              <div className="block-21 mb-4 d-flex">
                <a href='/' className="blog-img mr-4" style={{ backgroundImage: `url(${image1})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h3>
                  <div className="meta">
                    <div><a href="/"><span className="icon-calendar"></span> Sept 15, 2018</a></div>
                    <div><a href="/"><span className="icon-person"></span> Admin</a></div>
                    <div><a href="/"><span className="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a href='/' className="blog-img mr-4" style={{ backgroundImage: `url(${image2})` }}></a>
                <div className="text">
                  <h3 className="heading"><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h3>
                  <div className="meta">
                    <div><a href="/"><span className="icon-calendar"></span> Sept 15, 2018</a></div>
                    <div><a href="/"><span className="icon-person"></span> Admin</a></div>
                    <div><a href="/"><span className="icon-chat"></span> 19</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 mb-5 mb-md-5">
             <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Services</h2>
              <ul className="list-unstyled">
                <li><a href="/" className="py-2 d-block">Cooked</a></li>
                <li><a href="/" className="py-2 d-block">Deliver</a></li>
                <li><a href="/" className="py-2 d-block">Quality Foods</a></li>
                <li><a href="/" className="py-2 d-block">Mixed</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Have a Questions?</h2>
            	<div className="block-23 mb-3">
	              <ul>
	                <li><span className="icon icon-map-marker"></span><span className="text">Jl. Xxxxxx No. xx</span></li>
	                <li><a href="/"><span className="icon icon-phone"></span><span className="text">+62 xxx xxxx xxxx</span></a></li>
	                <li><a href="/"><span className="icon icon-envelope"></span><span className="text">info@domain.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              Copyright &copy;{currentYear} All rights reserved | This website is made with
              <a href="https://abil-liart.vercel.app" target="_blank" rel="noopener noreferrer">
                Abil
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
