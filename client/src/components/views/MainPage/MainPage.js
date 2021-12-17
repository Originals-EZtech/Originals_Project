import React from 'react';
import MainNavBar from '../NavBar/MainNavBar';
import Footer from '../Footer/Footer';
import {Link} from 'react-router-dom';

function MainPage() {

    const mainStyle={
        paddingTop: 70
    }

    return (
      <div>
       
        <MainNavBar />
        
        <div style={mainStyle}></div>
  
        {/* 메인 화면 */}
        <section id="home">
            <div class="row">
                <div class="owl-carousel owl-theme home-slider">
                    <div class="item item-first">
                        <div class="caption">
                            <div class="container">
                                <div class="col-md-12 col-sm-12">
                                    <h1>Online Course</h1>
                                    <h3>Our online courses are designed to fit in your industry supporting all-round with latest technologies.</h3>
                                    <a href="#courses" class="section-btn btn btn-default smoothScroll">Discover more</a>
                                </div>
                            </div>
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
                            <h2>Services</h2>
                        </div>
                        <div className="owl-carousel owl-theme owl-courses">
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/service-image1.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3>Summer Kids</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/service-image2.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3>Graphic & Web Design</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/service-image3.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3>Marketing Communication</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/service-image4.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3>Summer Kids</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/service-image5.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
                                                    <h3>Business &amp; Management</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                        <div class="col-md-18 col-sm-12">
                            <div class="section-title">
                                <h2>Contact</h2>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Dong Soo</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
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
                                    <h3>Chan Hyuk</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
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
                                    <h3>Min Gi</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image4.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Hyun Il</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6">
                            <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Na Gyeong</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
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
                                    <h3>Yoon Seon</h3>
                                    <span>...</span>
                                </div>
                                <ul class="social-icon">
                                    <li><Link to="" class="fab fa-github"></Link></li>
                                    <li><Link to="" class="fa fa-instagram"></Link></li>
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