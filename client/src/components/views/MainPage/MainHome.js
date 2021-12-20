import React from 'react';

function MainHome() {
    return (
        <>
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
    </>
    );
}

export default MainHome;