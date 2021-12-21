import React from 'react';

function MainHome() {
    return (
        <>
        {/* 메인 화면 */}
        <secion id="home">
            <div class="row">
                <div class="box-wrap">
                    <div class="text-box">
                        <h1>Online Course</h1>
                        <h3>Our online courses are designed to fit in your industry supporting all-round with latest technologies.</h3>
                        <a href="#courses" class="section-btn btn btn-default smoothScroll">Discover more</a>
                    </div>
                    <div class="image-box">
                        <img src="assets/images/main_pic.jpg" alt="" class="image" />
                    </div>
                </div>
            </div>
        </secion>
    </>
    );
}

export default MainHome;