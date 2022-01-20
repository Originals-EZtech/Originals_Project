# Originals Project📖
# 청각장애인을 위한 공개용 STT API를 이용한 원격수업 플랫폼
# Online live class platform using STT API for auditory disordered people
#### Project nickname : Helen Class
#### Project execution period : 2021.11.30~2022.01.14

-----------------------
## Background
코로나19 세계적 대유행으로 인해 대학가를 비롯한 초, 중, 고등학교에서 온라인 수업을 진행했다.<br/>
화상 강의에서는 교수자의 얼굴이 나오지 않거나, 시각 자료와 소리만 나오는 방식의 수업이 진행됐고<br/>
청각 장애인들 대다수가 상대의 입모양을 보고 말 뜻을 이해해야하는데 온라인 수업에서는 입모양을 보기 힘들어 어려움을 겪었다. <br/>


## Description

Helen Keller가 가졌던 시각,청각,언어 등의 장애를 교육의 도움으로 극복했던 것처럼<br/>
청각장애인들의 교육에 도움이 되고 나아가 온라인 수업환경에 도움이 될 수있는 자막 서비스를 제공하는 원격수업 플랫폼

![image](https://user-images.githubusercontent.com/74586346/150096423-8e1116f3-ed81-446b-bb1c-90f2f1855168.png)

-----------------------

## 📋 Core Service 

<img src="https://user-images.githubusercontent.com/74586346/150092246-ecdb5c0e-e75d-44d7-bc26-a1ae5462a944.png"  width="550" height="280"/>

- 실시간 다중 화상 공유 수업
- 실시간 수업 자막
- 실시간 전체 채팅과 개인 채팅
- 실시간 학습자료 첨부 및 공유
- 웹사이트의 통계 및 로그 관리 
- 사이트 이용 권한 구분
- MyClass(수업 히스토리 확인 및 재개설가능)

-----------------------

## 💻 Development Stack  

                                                                                                                                         
-----------------------
## ⚙ Service Architecture

-----------------------

##  UI(example)  



수업 화면          |  수업 이력
:-------------------------:|:-------------------------:
 ![수업화면](https://user-images.githubusercontent.com/74586346/150248270-6dd14776-a787-4290-93bc-1ddd10506ee5.png) |  ![MyClass](https://user-images.githubusercontent.com/74586346/150248359-22a12078-62ec-4fee-a22f-ce8a94a468f4.png)
 
 통계 및 로그 모니터링           |   전체 채팅 & 학습자료 첨부
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/74586346/150258954-42752f6e-9a96-4068-b403-376f3ca3d142.png" width="600" height="483"> |  <img src="https://user-images.githubusercontent.com/74586346/150247837-9c05e2a1-cdda-48b1-9508-7f0d4f23e765.png"  width="320" height="483"/>

<!--  ![수업화면](https://user-images.githubusercontent.com/74586346/150250669-a4a3cb5c-b2dd-4e26-baac-1d48c908da14.png) ![수업화면](https://user-images.githubusercontent.com/74586346/150252252-41ba6cb4-a224-4630-83f1-a5257da829f6.png) | <img src="https://user-images.githubusercontent.com/74586346/150247837-9c05e2a1-cdda-48b1-9508-7f0d4f23e765.png"  width="450" height="580"/> -->

 -----------------------
 
## 📷 Livestreaming 

<img src="https://user-images.githubusercontent.com/74478432/150239269-d46f541c-5668-4a66-bd62-9b31f252a4ef.png"  width="550" height="280"/>

* <b>simple-peer(https://github.com/feross/simple-peer)</b><br>
node.js style WebRTC API 
* <b>peer-to-peer connection</b><br>
`RTCPeerConnection` 인터페이스는 로컬 컴퓨터와 원격 피어간의 WebRTC 연결을 담당하며 원격 피어에 연결하기 위한 메서드를 제공하고, 연결을 유지하고 연결 상태를 모니터링 하며 더 이상 연결이 필요하지 않을 경우 연결을 종료한다. 
* <b>MediaDevices.getUserMedia()</b><br>
`navigator.mediaDevices.getUserMedia()` 메서드는 사용자에게 미디어 입력 장치 사용 권한을 요청하며, 사용자가 수락하면 요청한 미디어 종류의 트랙을 포함한 MediaStream을 반환한다.
* <b>STUN(Sesssion Traversal Utilities for NAT)</b><br>
STUN 서버는 클라이언트가 공용 주소, 이면에 있는 NAT의 유형 및 NAT에 의해 특정 로컬 포트와 연결된 인터넷 측 포트를 찾을 수 있도록 해준다. 각 Peer는 STUN 서버에게 요청을 보내 Public IP 주소와 포트를 찾게 되고 이를 이용하여 시그널링을 하게된다. 
* <b>TURN(Traversal Using Relays around NAT)</b><br>
멀티미디어 애플리케이션을 위해 네트워크 주소 변환(NAT) 또는 방화벽에서 보조하는 프로토콜이다. Symmetric NAT의 경우 NAT 바인딩을 성공적으로 수행할 수 없게 되는데 이러한 경우 TURN 서버를 이용하여 Relay 환경을 갖추게 된다. 
* <b>SDP(Session Description Protocol)</b><br>
해상도나 형식, 코덱, 암호화등의 멀티미디어 컨텐츠의 연결을 설명하기 위한 표준이다. 



---

### 🙋‍♂️Role

이름 | GitHub |  Email | Position |
 --- | ------- | ------| ------- | 
최윤선 |<img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/ynsseon07) | ynsseon@gmail.com | Front-End | [게인 블로그나 노션](#)
석현일 | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/johney-suk) | sukhyunil19@gmail.com | Back-End API | [게인 블로그나 노션](#)
신동수 | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/sjagz) | sjagz2558@gmail.com | Back-End API | [게인 블로그나 노션](#)
조나경 | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/nagggyung) | skql775@gmail.com | WebRTC | [게인 블로그나 노션](#)
유민기 | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/Yoo-mingi) | zerotansan@gmail.com | WebRTC | [게인 블로그나 노션](#)
양찬혁 | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/mintorca) | chanhuk96@gmail.com | STT | [게인 블로그나 노션](#)
