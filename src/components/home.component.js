import React, { Component } from "react";

import UserService from "../services/user.service";
import { Switch, Route, Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div>


    <section className="hero-area">
        <div className="hero-slides owl-carousel">
            
            <div className="single-hero-slide bg-img" style={{ backgroundImage: "url('estilos/img/bg-img/bg7.jpg')"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="hero-slides-content" data-animation="fadeInUp" data-delay="100ms">
                                <h2 data-animation="fadeInUp" data-delay="300ms">NIKAIDO APP</h2>
                                <p data-animation="fadeInUp" data-delay="700ms">Choose the ingredients you have at home and find the tastiest recipes selected for you.</p>
                               
                                <Link to={"/receipies"} className="btn delicious-btn">Start </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    </section>
{/*
    <section className="top-catagory-area section-padding-80-0">
        <div className="container">
            <div className="row">
                
                <div className="col-12 col-lg-6">
                    <div className="single-top-catagory">
                        <img src="estilos/img/bg-img/bg2.jpg" alt="" />
                     
                        <div className="top-cta-content">
                            <h3>Strawberry Cake</h3>
                            <h6>Simple &amp; Delicios</h6>
                            <a href="receipe-post.html" className="btn delicious-btn">See Full Receipe</a>
                        </div>
                    </div>
                </div>
               
                <div className="col-12 col-lg-6">
                    <div className="single-top-catagory">
                        <img src="estilos/img/bg-img/bg3.jpg" alt="" />
                      
                        <div className="top-cta-content">
                            <h3>Chinesse Noodles</h3>
                            <h6>Simple &amp; Delicios</h6>
                            <a href="receipe-post.html" className="btn delicious-btn">See Full Receipe</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="best-receipe-area">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading">
                        <h3>The best Receipies</h3>
                    </div>
                </div>
            </div>

            <div className="row">
                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r1.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Sushi Easy Receipy</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r2.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Homemade Burger</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r3.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Vegan Smoothie</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r4.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Calabasa soup</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

         
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r5.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Homemade Breakfast</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>

          
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-best-receipe-area mb-30">
                        <img src="estilos/img/bg-img/r6.jpg" alt="" />
                        <div className="receipe-content">
                            <a href="receipe-post.html">
                                <h5>Healthy Fruit Desert</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="cta-area bg-img bg-overlay" style={{ backgroundImage: "url('estilos/img/bg-img/bg4.jpg')"}}>
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
               
                    <div className="cta-content text-center">
                        <h2>Gluten Free Receipies</h2>
                        <p>Fusce nec ante vitae lacus aliquet vulputate. Donec scelerisque accumsan molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras sed accumsan neque. Ut vulputate, lectus vel aliquam congue, risus leo elementum nibh</p>
                        <a href="#" className="btn delicious-btn">Discover all the receipies</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="small-receipe-area section-padding-80-0">
        <div className="container">
            <div className="row">

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr1.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Homemade italian pasta</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr2.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Baked Bread</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr3.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Scalops on salt</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr4.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Fruits on plate</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr5.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Macaroons</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr6.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Chocolate tart</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr7.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Berry Desert</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr8.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Zucchini Grilled on peper</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="single-small-receipe-area d-flex">
                        
                        <div className="receipe-thumb">
                            <img src="estilos/img/bg-img/sr9.jpg" alt="" />
                        </div>
                        
                        <div className="receipe-content">
                            <span>January 04, 2018</span>
                            <a href="receipe-post.html">
                                <h5>Chicken Salad</h5>
                            </a>
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                            <p>2 Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
 
    <section className="quote-subscribe-adds">
        <div className="container">
            <div className="row align-items-end">
            
                <div className="col-12 col-lg-4">
                    <div className="quote-area text-center">
                        <span>"</span>
                        <h4>Nothing is better than going home to family and eating good food and relaxing</h4>
                        <p>John Smith</p>
                        <div className="date-comments d-flex justify-content-between">
                            <div className="date">January 04, 2018</div>
                            <div className="comments">2 Comments</div>
                        </div>
                    </div>
                </div>

             
                <div className="col-12 col-lg-4">
                    <div className="newsletter-area">
                        <h4>Subscribe to our newsletter</h4>
                        
                        <div className="newsletter-form bg-img bg-overlay" style={{ backgroundImage: "url('estilos/img/bg-img/bg1.jpg')"}}>
                            <form action="#" method="post">
                                <input type="email" name="email" placeholder="Subscribe to newsletter" />
                                <button type="submit" className="btn delicious-btn w-100">Subscribe</button>
                            </form>
                            <p>Fusce nec ante vitae lacus aliquet vulputate. Donec sceleri sque accumsan molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.</p>
                        </div>
                    </div>
                </div>

           
                <div className="col-12 col-lg-4">
                    <div className="delicious-add">
                        <img src="estilos/img/bg-img/add.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    */}
      </div>
    );
  }
}
