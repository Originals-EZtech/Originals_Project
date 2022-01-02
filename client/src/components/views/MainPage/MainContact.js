import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer';

function MainContact() {

    const footerStyle={
        position: "absolute",
        bottom: 0,
        width: "100%"
    }

    return (
        <>
        {/* 팀원 소개 */}
        <section id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
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
            <div style={footerStyle}>
                <Footer />
            </div>
        </section>
        </>
    );
}

export default MainContact;