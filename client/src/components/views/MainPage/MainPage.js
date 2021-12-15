import React, { useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import {Link} from 'react-router-dom';
import RoomJoin from '../Room/RoomJoin';

function MainPage() {

    const mainStyle={
        paddingTop: 70
    }

    return (
      <div>
       
        <NavBar />
        
        <div style={mainStyle}></div>
  
        {/* 메인 화면 */}
        <section id="home">
            <div class="row">
                <div class="owl-carousel owl-theme home-slider">
                    <div class="item item-first">
                        <div class="caption">
                            <div class="container">
                                    <div class="col-md-6 col-sm-12">
                                        <h1>Distance Learning Education Center</h1>
                                        <h3>Our online courses are designed to fit in your industry supporting all-round with latest technologies.</h3>
                                        <a href="#feature" class="section-btn btn btn-default smoothScroll">Discover more</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="item item-second">
                        <div class="caption">
                            <div class="container">
                                    <div class="col-md-6 col-sm-12">
                                        <h1>Start your journey with our practical courses</h1>
                                        <h3>Our online courses are built in partnership with technology leaders and are designed to meet industry demands.</h3>
                                        <a href="#courses" class="section-btn btn btn-default smoothScroll">Take a course</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="item item-third">
                        <div class="caption">
                            <div class="container">
                                    <div class="col-md-6 col-sm-12">
                                        <h1>Efficient Learning Methods</h1>
                                        <h3>Nam eget sapien vel nibh euismod vulputate in vel nibh. Quisque eu ex eu urna venenatis sollicitudin ut at libero. Visit <a rel="nofollow" href="https://www.facebook.com/templatemo">templatemo</a> page.</h3>
                                        <a href="#contact" class="section-btn btn btn-default smoothScroll">Let's chat</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* <section id="about">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="about-info">
                                <h2>Start your journey to a better life with online practical courses</h2>
                                <figure>
                                    <span><i class="fa fa-users"></i></span>
                                    <figcaption>
                                        <h3>Professional Trainers</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                    </figcaption>
                                </figure>
                                <figure>
                                    <span><i class="fa fa-certificate"></i></span>
                                    <figcaption>
                                        <h3>International Certifications</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                    </figcaption>
                                </figure>
                                <figure>
                                    <span><i class="fa fa-bar-chart-o"></i></span>
                                    <figcaption>
                                        <h3>Free for 3 months</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                    </figcaption>
                                </figure>
                        </div>
                    </div>
                    <div class="col-md-offset-1 col-md-4 col-sm-12">
                        <div class="entry-form">
                            
                                    <h2>Signup today</h2>
                                    <input type="text" name="full name" class="form-control" placeholder="Full name" required="" />
                                    <input type="email" name="email" class="form-control" placeholder="Your email address" required="" />
                                    <input type="password" name="password" class="form-control" placeholder="Your password" required="" />
                                    <button class="submit-btn form-control" id="form-submit">Get started</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
    

        {/* 사용 기술 및 스택 소개 */}
        <section id="team">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="section-title">
                                <h2>Components <small>방 만들기  방 참여하기</small></h2>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>방 만들기</h3>
                                    <span>I love Teaching</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-facebook-square" attr="facebook icon"></Link></li>
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>방 참여하기</h3>
                                    <RoomJoin />
                                    <span>Education is the key!</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-google"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image3.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Jessie Ca</h3>
                                    <span>I like Online Courses</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-envelope-o"></Link></li>
                                    <li><Link to="" class="fa fa-linkedin"></Link></li>
                                </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image4.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Andrew Berti</h3>
                                    <span>Learning is fun</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-google"></Link></li>
                                    <li><Link to="" class="fa fa-behance"></Link></li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        {/* 웹 사이트 기능 소개 */}
        <section id="courses">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="section-title">
                                <h2>Services <small>웹 사이트 기능 소개</small></h2>
                        </div>
                        <div className="owl-carousel owl-theme owl-courses">
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image1.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 12 / 7 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 7 Hours</span>
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3><Link to="">Social Media Management</Link></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                                        <span>Mark Wilson</span>
                                                    </div>
                                                    <div class="courses-price">
                                                        <Link to=""><span>USD 25</span></Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image2.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 20 / 7 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 4.5 Hours</span>
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3><Link to="">Graphic & Web Design</Link></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                                        <span>Jessica</span>
                                                    </div>
                                                    <div class="courses-price">
                                                        <Link to=""><span>USD 80</span></Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image3.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 15 / 8 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 6 Hours</span>
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3><Link to="">Marketing Communication</Link></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image3.jpg" class="img-responsive" alt="" />
                                                        <span>Catherine</span>
                                                    </div>
                                                    <div class="courses-price free">
                                                        <Link to=""><span>Free</span></Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image4.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 10 / 8 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 8 Hours</span>
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3><Link to="">Summer Kids</Link></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                                        <span>Mark Wilson</span>
                                                    </div>
                                                    <div class="courses-price">
                                                        <Link to=""><span>USD 45</span></Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image5.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 5 / 10 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 10 Hours</span>
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3><Link to="">Business &amp; Management</Link></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                            <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                                        <span>Jessica</span>
                                                    </div>
                                                    <div class="courses-price free">
                                                        <Link to=""><span>Free</span></Link>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* 팀원 소개 */}
        <section id="contact">
            <div class="container">
                <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="section-title">
                                <h2>Contact <small>팀원 소개</small></h2>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Mark Wilson</h3>
                                    <span>I love Teaching</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-facebook-square" attr="facebook icon"></Link></li>
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Catherine</h3>
                                    <span>Education is the key!</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-google"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image3.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Jessie Ca</h3>
                                    <span>I like Online Courses</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-envelope-o"></Link></li>
                                    <li><Link to="" class="fa fa-linkedin"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image4.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Andrew Berti</h3>
                                    <span>Learning is fun</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-google"></Link></li>
                                    <li><Link to="" class="fa fa-behance"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Mark Wilson</h3>
                                    <span>I love Teaching</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-facebook-square" attr="facebook icon"></Link></li>
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image3.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Jessie Ca</h3>
                                    <span>I like Online Courses</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fa fa-twitter"></Link></li>
                                    <li><Link to="" class="fa fa-envelope-o"></Link></li>
                                    <li><Link to="" class="fa fa-linkedin"></Link></li>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>
        </section>
      
        <Footer />
  </div>
) 
}
export default MainPage;