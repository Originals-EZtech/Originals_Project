/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
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
                                <img src="assets/images/dongsoo.jpg" class="img-responsive" height="50px" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Dong Soo</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="https://github.com/sjagz" class="fab fa-github"></a></li>
                                {/* <li><a href="" class="fa fa-instagram"></a></li> */}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <div class="team-thumb">
                            <div class="team-image">
                                <img src="assets/images/chanhyuk.jpg" class="img-responsive" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Chan Huk</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="https://github.com/mintorca" class="fab fa-github"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <div class="team-thumb">
                            <div class="team-image">
                                <img src="assets/images/mingi.jpg" class="img-responsive" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Min Gi</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="!#" class="fab fa-github"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <div class="team-thumb">
                            <div class="team-image">
                                <img src="assets/images/hyunil.jpg" class="img-responsive" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Hyun Il</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="https://github.com/johney-suk" class="fab fa-github"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <div class="team-thumb">
                            <div class="team-image">
                                <img src="assets/images/nagyung.jpg" class="img-responsive" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Na Gyung</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="https://github.com/nagggyung" class="fab fa-github"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <div class="team-thumb">
                            <div class="team-image">
                                <img src="assets/images/yoonseon.jpg" class="img-responsive" alt="" />
                            </div>
                            <div class="team-info">
                                <h3>Yoon Seon</h3>
                            </div>
                            <ul class="social-icon">
                                <li><a href="https://github.com/ynsseon07" class="fab fa-github"></a></li>
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