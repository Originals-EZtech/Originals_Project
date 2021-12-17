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
                                    
                                    <h3><li><Link to="/room" >방 참여하기</Link></li></h3>
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
                            <h2>Services</h2>
                        </div>
                        <div className="owl-carousel owl-theme owl-courses">
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                        <div class="courses-thumb">
                                            <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/WebRTC.png" class="img-responsive" alt="" />
                                                    </div>
                                            </div>
                                            <div class="courses-detail">
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
                                                        <img src="assets/images/courses-image3.jpg" class="img-responsive" alt="" />
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
                                                        <img src="assets/images/courses-image4.jpg" class="img-responsive" alt="" />
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
                                                        <img src="assets/images/courses-image5.jpg" class="img-responsive" alt="" />
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