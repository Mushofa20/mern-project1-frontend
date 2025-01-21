import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

const Menu = () => {
    
    const [activeTab, setActiveTab] = useState('drink');
    const [products, setProducts] = useState([]);
    const [dishAndMealProducts, setDishAndMealProducts] = useState([]); // Produk dish dan meal

    const {ref: refHome, inView: inViewHome} = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });

    const { ref: refInfo, inView: inViewInfo } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });

    const { ref: refPrice, inView: inViewPrice } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });

    const { ref: refMenu, inView: inViewMenu } = useInView ({
        threshold: 0.5,
        triggerOnce: true,
    });

    //fetch data produk
    useEffect(() => {
        const fetchProducts = async () => {
            //fetch data berdasarkan tab aktif
            try {
                const response = await fetch(`http://localhost:5000/api/products?type=${activeTab}`);
                const data = await response.json();
                setProducts(data);

            //fetch data produk meals dan dish
            const dishAndMealResponse = await fetch(`http://localhost:5000/api/products?type=dish,meal`);
            const dishAndMealData = await dishAndMealResponse.json();
            setDishAndMealProducts(dishAndMealData);
            } catch (error) {
                console.error('error fetching products:', error);
            }
        };
        fetchProducts();
    }, [activeTab]);

    //fungsi untuk format harga
    const formatPrice = (price) => {
        if (price >= 1000000) {
            return price % 1000000 === 0
            ? `${price / 1000000}M`
            : `${(price / 1000000).toFixed(1)}M`;
        } else if (price >= 1000) {
            return price % 1000 === 0
            ? `${price / 1000}K`
            : `${(price / 1000).toFixed(1)}K`;
        }
        return price.toString();
    };

  return (
    <div>
        <ParallaxProvider>
        <section className='slick-slider home-slider'>
            <ParallaxBanner
            className='slider-item'
            layers={[
                { image : "/assets/bg_3.jpg", speed: -30, style: { backgroundSize: "contain" }, }
            ]}
            >
                <div className="overlay"></div>
                <div className="custom-container">
                    <div className="row slider-text justify-content-center align-items-center">
                        <div ref={refHome} className={`col-md-7 col-sm-12 text-center ftco-animate ${inViewHome ? "fadeInUp ftco-animated" : ""}`}>
                            <h1 className='mb-3 mt-5 bread'>Our Menu</h1>
                            <p className='breadcrumbs'>
                                <span className='mr-2'>
                                    <Link to="/">Home</Link>
                                </span>
                                <span>MENU</span>
                            </p>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </section>
        <section className='ftco-intro'>
            <div className="custom-container-wrap">
                <div className="wrap d-md-flex align-items-xl-end">
                    <div className="info">
                        <div className="row no-gutters">
                            <div ref={refInfo} className={`col-md-4 d-flex ftco-animate ${inViewInfo ? "fadeInUp ftco-animated" : ""}`}>
                                <div className="icon"><span className='icon-phone'></span></div>
                                <div className="text">
                                    <h3>000 (123) 456 7890</h3>
                                    <p>A small river named Duden flows by their place and supplies.</p>
                                </div>
                            </div>
                            <div ref={refInfo} className={`col-md-4 d-flex ftco-animate ${inViewInfo ? "fadeInUp ftco-animated" : ""}`}>
                                <div className="icon"><span className='icon-my_location'></span></div>
                                <div className="text">
                                    <h3>198 West 21th Street</h3>
                                    <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                                </div>
                            </div>
                            <div ref={refInfo} className={`col-md-4 d-flex ftco-animate ${inViewInfo ? "fadeInUp ftco-animated" : ""}`}>
                                <div className="icon"><span className='icon-clock-o'></span></div>
                                <div className="text">
                                    <h3>Open Monday - Friday</h3>
                                    <p>8:00 am - 9:00 pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book p-4">
                        <h3>Book a Table</h3>
                        <form action="/" method="post" className='appointment-form'>
                            <div className="d-md-flex">
                                <div className="form-group">
                                    <input type="text" name="first_name" className='form-control' placeholder='First Name'/>
                                </div>
                                <div className="form-group ml-md-4">
                                    <input type="text" name="last_name" className='form-control' placeholder='Last Name'/>
                                </div>
                            </div>
                            <div className="d-md-flex">
                                <div className="form-group">
                                    <div className="input-wrap">
                                        <div className="icon"><span className='icon-md-calendar'></span></div>
                                        <input type="text" name="date" className='form-control appointment_date' placeholder='Date' />
                                    </div>
                                </div>
                                <div className="form-group ml-md-4">
                                    <div className="input-wrap">
                                        <div className="icon"><span className='icon-ios-clock'></span></div>
                                        <input type="text" name="time" className='form-control appointment_time' placeholder='Time' />
                                    </div>
                                </div>
                                <div className="form-group ml-md-4">
                                    <input type="text" name="phone" className='form-control' placeholder='Phone' />
                                </div>
                            </div>
                            <div className="d-md-flex">
                                <div className="form-group">
                                    <textarea name="message" cols="30" rows="2" className='form-control' placeholder='Message'></textarea>
                                </div>
                                <div className="form-group ml-md-4">
                                    <input type="submit" name='submit' value="book table" className='btn btn-white py-3 px-4' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <section className='ftco-section'>
            <div className="custom-container">
                <div className="row">
                    <div className="col-md-6">
                        <h3 ref={refPrice} className={`mb-5 heading-pricing ftco-animate ${inViewPrice ? "fadeInUp ftco-animated" : ""}`}>Dish</h3>
                        {dishAndMealProducts
                        .filter((product) => product.type === "dish")
                        .map((dish) => (
                            <div 
                                key={dish._id}
                                ref={refPrice} 
                                className={`pricing-entry d-flex ftco-animate ${inViewPrice ? "fadeInUp ftco-animated" : ""}`}
                            >
                                <div className="img" style={{backgroundImage: `url(${dish.image})`,}}></div>
                                <div className="desc pl-3">
                                    <div className="d-flex text align-items-center">
                                        <h3>
                                            <span>{dish.name}</span>
                                        </h3>
                                        <span className='price'>{formatPrice(dish.price)}</span>
                                    </div>
                                    <div className="d-block">
                                        <p>{dish.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-6">
                        <h3 ref={refPrice} className={`mb-5 heading-pricing ftco-animate ${inViewPrice ? "fadeInUp ftco-animated" : ""}`}>Meals</h3>
                        {dishAndMealProducts
                        .filter((product) => product.type === "meal")
                        .map((meal) => (
                            <div
                                key={meal._id}
                                ref={refPrice}
                                className={`pricing-entry d-flex ftco-animate ${inViewPrice ? "fadeInUp ftco-animated" : ""}`}
                            >
                                <div className="img" style={{backgroundImage: `url(${meal.image})`,}}></div>
                                <div className="desc pl-3">
                                    <div className="d-flex text align-items-center">
                                        <h3>
                                            <span>{meal.name}</span>
                                        </h3>
                                        <span className='price'>{formatPrice(meal.price)}</span>
                                    </div>
                                    <div className="d-block">
                                        <p>{meal.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <section className='ftco-menu mb-5 pb-5'>
            <div className="custom-container">
                <div className="row justify-content-center mb-5">
                    <div ref={refMenu} className={`col-md-7 heading-section text-center ftco-animate ${inViewMenu ? "fadeInUp ftco-animated" : ""}`}>
                        <span className='subheading'>Discover</span>
                        <h2 className='mb-4'>Our Products</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                <div className="row d-md-flex">
                    <div ref={refMenu} className={`col-lg-12 p-md-5 ftco-animate ${inViewMenu ? "fadeInUp ftco-animated" : ""}`}>
                        <div className="row">
                            <div className="col-md-12 nav-link-wrap mb-5">
                                <div ref={refMenu} className={`nav nav-pills justify-content-center ftco-animate ${inViewMenu ? "fadeInUp ftco animated" : ""}`} id='v-pills-tab' role='tablist' aria-orientation='vertical'>
                                    <button className={`nav-link ${activeTab === 'drink' ? 'active' : ''}`} onClick={() => setActiveTab('drink')}>Drinks</button>
                                    <button className={`nav-link ${activeTab === 'dessert' ? 'active' : ''}`} onClick={() => setActiveTab('dessert')}>Dessert</button>
                                    {/* <a className='nav-link active' id='v-pills-2-tab' data-toggle="pill" href="#-pills-2" role='tab' aria-controls='v-pills-2' aria-selected="false">Drinks</a>
                                    <a className='nav-link' id='v-pills-3-tab' data-toggle="pill" href="#-pills-3" role='tab' aria-controls='v-pills-3' aria-selected="false">Dessert</a> */}
                                </div>
                            </div>
                            <div className="col-md-12 d-flex align-items-center">
                                <div ref={refMenu} className={`tab-content ftco-animate ${inViewMenu ? "fadeInUp ftco-animated" : ""}`} id='v-pills-tabContent'>
                                    <div className="tab-pane fade show active" id='v-pills-2' role='tabpanel' aria-labelledby='v-pills-2-tab'>
                                        <div className="row">
                                            {products.map((product) => (
                                                <div className="col-md-4 text-center" key={product._id}>
                                                    <div className="menu-wrap" >
                                                        <Link 
                                                            to={`/products/${product._id}`}
                                                            className='menu-img img mb-4'
                                                            style={{ backgroundImage: `url(${product.image})` }}
                                                        ></Link>
                                                        <div className="text">
                                                            <h3>
                                                                <Link to={`/products/${product._id}`}>{product.name}</Link>
                                                            </h3>
                                                            <p>{product.description}</p>
                                                            <p className='price'>
                                                                <span>Rp. {product.price.toLocaleString('id-ID')}</span>
                                                            </p>
                                                            <p>
                                                                <Link className='btn btn-primary btn-outline-primary' to={`/products/${product._id}`}>Show</Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* <div className="col-md-4 text-center">
                                                <div className="menu-wrap">
                                                    <a className='menu-img img mb-4' href="#">Image Product</a>
                                                    <div className="text">
                                                        <h3><a href="#">Drink Name</a></h3>
                                                        <p>Drink Description</p>
                                                        <p className='price'><span>Drink Price</span></p>
                                                        <p><a className='btn btn-primary btn-outline-primary' href="#">Show</a></p>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="tab-pane fade" id='v-pills-3' role='tabpanel' aria-labelledby='v-pills-3-tab'>
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                <div className="menu-wrap">
                                                    <a className='menu-img img mb-4' href="#">Dessert Image</a>
                                                    <div className="text">
                                                        <h3><a href="#">Dessert Name</a></h3>
                                                        <p>Dessert Description</p>
                                                        <p className='price'><span>Dessert Price</span></p>
                                                        <p><a className='btn btn-primary btn-outline-primary' href="#">Show</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
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

export default Menu