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
                                                <h3>화상 기능 (WebRTC)</h3>
                                                <p>영상 on/off, 음성 on/off, 자막 on/off, 화면 공유 기능 이용 가능합니다.</p>
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
                                                <h3>전체 채팅</h3>
                                                <p>화상 기능에 참여한 구성원 간의 전체 채팅이 가능합니다.</p>
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
                                                <h3>자막 기능 (STT)</h3>
                                                <p>선생님의 음성을 자막으로 변환시켜 제공하여 효과적인 수업 진행이 가능합니다.</p>
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
                                                <h3>개인 채팅</h3>
                                                <p>화상 기능에 참여한 구성원 간의 개인 채팅이 가능합니다.</p>
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
                                                <h3>권한 구분</h3>
                                                <p>관리자 / 선생님 / 학생 권한으로 구분된 기능들로 웹 사이트 이용 가능합니다.</p>
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