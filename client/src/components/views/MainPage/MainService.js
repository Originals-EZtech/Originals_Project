import React from 'react';

function MainService() {
    return (
        <>
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
        </>
    );
}

export default MainService;