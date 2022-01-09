import React, { useEffect } from 'react';
import chartInfoService from '../Dashboard/DashboardApp/service/chartInfoService';

function MainHome() {

    //방문자수 카운트
    useEffect(()=>{
        chartInfoService.getVisitorCount().then();
    }, [])
    return (
        <>
        {/* 메인 화면 */}
        <section id="home">
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
        </section>
    </>
    );
}

export default MainHome;