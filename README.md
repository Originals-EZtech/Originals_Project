# Originals Projectπ
# μ²­κ°μ₯μ μΈμ μν κ³΅κ°μ© STT APIλ₯Ό μ΄μ©ν μκ²©μμ νλ«νΌ
## Online live class platform using STT API for auditory disordered people
#### Project nickname : **Helen Class**
#### Project execution period : 2021.11.30~2022.01.14

-----------------------
## Background 
μ½λ‘λ19 μΈκ³μ  λμ νμΌλ‘ μΈν΄ λνκ°λ₯Ό λΉλ‘―ν μ΄, μ€, κ³ λ±νκ΅μμ μ¨λΌμΈ μμμ μ§ννλ€.<br/>
νμ κ°μμμλ κ΅μμμ μΌκ΅΄μ΄ λμ€μ§ μκ±°λ, μκ° μλ£μ μλ¦¬λ§ λμ€λ λ°©μμ μμμ΄ μ§νλκ³ <br/>
μ²­κ° μ₯μ μΈλ€ λλ€μκ° μλμ μλͺ¨μμ λ³΄κ³  λ§ λ»μ μ΄ν΄ν΄μΌνλλ° μ¨λΌμΈ μμμμλ μλͺ¨μμ λ³΄κΈ° νλ€μ΄ μ΄λ €μμ κ²ͺμλ€. <br/>


## Description

Helen Kellerκ° κ°μ‘λ μκ°,μ²­κ°,μΈμ΄ λ±μ μ₯μ λ₯Ό κ΅μ‘μ λμμΌλ‘ κ·Ήλ³΅νλ κ²μ²λΌ <br/>
μ²­κ°μ₯μ μΈλ€μ κ΅μ‘μ λμμ΄ λκ³  λμκ° μ¨λΌμΈ μμνκ²½μ λμμ΄ λ  μμλ μλ§ μλΉμ€λ₯Ό μ κ³΅νλ μκ²©μμ νλ«νΌ

![image](https://user-images.githubusercontent.com/74586346/150096423-8e1116f3-ed81-446b-bb1c-90f2f1855168.png)

-----------------------

## π Core Service 

<img src="https://user-images.githubusercontent.com/74586346/150273421-426de63b-fc58-43fe-999b-644eca16ccb0.png"  width="550" height="280"/>

- μ€μκ° λ€μ€ νμ κ³΅μ  μμ
- μ€μκ° μμ μλ§
- μ€μκ° μ μ²΄ μ±νκ³Ό κ°μΈ μ±ν
- μ€μκ° νμ΅μλ£ μ²¨λΆ λ° κ³΅μ 
- μΉμ¬μ΄νΈμ ν΅κ³ λ° λ‘κ·Έ κ΄λ¦¬ 
- μ¬μ΄νΈ μ΄μ© κΆν κ΅¬λΆ
- MyClass(μμ νμ€ν λ¦¬ νμΈ λ° μ¬κ°μ€κ°λ₯)

-----------------------

## π» Development Stack  

![](https://user-images.githubusercontent.com/74586346/150274787-1e9927de-2eda-4599-9233-9143e79327ae.png)
                                                                                                                                         
-----------------------

##  UI(example)  

μμ νλ©΄          |  μ μλ κ³΅μ  νλ©΄
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/74586346/150288837-10f4f65d-fdec-4443-a1f2-8a7d87843e2a.png" width="480" height="370"> | <img src="https://user-images.githubusercontent.com/74586346/150273028-06a9e7e3-f2ff-48b2-88a4-1561c4ee97c6.png" width="480" height="370">

 
 ν΅κ³ λ° λ‘κ·Έ λͺ¨λν°λ§           |   μ μ²΄ μ±ν & νμ΅μλ£ μ²¨λΆ
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/74586346/150272930-8092fed0-e251-443a-b33f-f779465e34b4.png" width="640" height="483"> |  <img src="https://user-images.githubusercontent.com/74586346/150261326-de53c0bb-54f0-489d-ba13-0d3873bab465.png"  width="320" height="483"/>

μμ μ΄λ ₯ & μ¬μ°Έμ¬        |
:--------------------------------------------------:
 |  ![MyClass](https://user-images.githubusercontent.com/74586346/150272708-e126d30c-cfc3-426f-a00e-79f49ab1a963.png)

 

 -----------------------
 
## π· Livestreaming 

<img src="https://user-images.githubusercontent.com/74478432/150239269-d46f541c-5668-4a66-bd62-9b31f252a4ef.png"  width="550" height="280"/>

* <b>simple-peer(https://github.com/feross/simple-peer)</b><br>
node.js style WebRTC API 
* <b>peer-to-peer connection</b><br>
`RTCPeerConnection` μΈν°νμ΄μ€λ λ‘μ»¬ μ»΄ν¨ν°μ μκ²© νΌμ΄κ°μ WebRTC μ°κ²°μ λ΄λΉνλ©° μκ²© νΌμ΄μ μ°κ²°νκΈ° μν λ©μλλ₯Ό μ κ³΅νκ³ , μ°κ²°μ μ μ§νκ³  μ°κ²° μνλ₯Ό λͺ¨λν°λ§ νλ©° λ μ΄μ μ°κ²°μ΄ νμνμ§ μμ κ²½μ° μ°κ²°μ μ’λ£νλ€. 
* <b>MediaDevices.getUserMedia()</b><br>
`navigator.mediaDevices.getUserMedia()` λ©μλλ μ¬μ©μμκ² λ―Έλμ΄ μλ ₯ μ₯μΉ μ¬μ© κΆνμ μμ²­νλ©°, μ¬μ©μκ° μλ½νλ©΄ μμ²­ν λ―Έλμ΄ μ’λ₯μ νΈλμ ν¬ν¨ν MediaStreamμ λ°ννλ€.
* <b>STUN(Sesssion Traversal Utilities for NAT)</b><br>
STUN μλ²λ ν΄λΌμ΄μΈνΈκ° κ³΅μ© μ£Όμ, μ΄λ©΄μ μλ NATμ μ ν λ° NATμ μν΄ νΉμ  λ‘μ»¬ ν¬νΈμ μ°κ²°λ μΈν°λ· μΈ‘ ν¬νΈλ₯Ό μ°Ύμ μ μλλ‘ ν΄μ€λ€. κ° Peerλ STUN μλ²μκ² μμ²­μ λ³΄λ΄ Public IP μ£Όμμ ν¬νΈλ₯Ό μ°Ύκ² λκ³  μ΄λ₯Ό μ΄μ©νμ¬ μκ·Έλλ§μ νκ²λλ€. 
* <b>TURN(Traversal Using Relays around NAT)</b><br>
λ©ν°λ―Έλμ΄ μ νλ¦¬μΌμ΄μμ μν΄ λ€νΈμν¬ μ£Όμ λ³ν(NAT) λλ λ°©νλ²½μμ λ³΄μ‘°νλ νλ‘ν μ½μ΄λ€. Symmetric NATμ κ²½μ° NAT λ°μΈλ©μ μ±κ³΅μ μΌλ‘ μνν  μ μκ² λλλ° μ΄λ¬ν κ²½μ° TURN μλ²λ₯Ό μ΄μ©νμ¬ Relay νκ²½μ κ°μΆκ² λλ€. 
* <b>SDP(Session Description Protocol)</b><br>
ν΄μλλ νμ, μ½λ±, μνΈνλ±μ λ©ν°λ―Έλμ΄ μ»¨νμΈ μ μ°κ²°μ μ€λͺνκΈ° μν νμ€μ΄λ€. 



---

### πββοΈRole

μ΄λ¦ | GitHub |  Email | Position |
 --- | ------- | ------| ------- | 
μ΅μ€μ  |<img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/ynsseon07) | ynsseon@gmail.com | Front-End | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
μνμΌ | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/johney-suk) | sukhyunil19@gmail.com | Back-End API | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
μ λμ | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/sjagz) | sjagz2558@gmail.com | Back-End API | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
μ‘°λκ²½ | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/nagggyung) | skql775@gmail.com | WebRTC | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
μ λ―ΌκΈ° | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/Yoo-mingi) | zerotansan@gmail.com | WebRTC | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
μμ°¬ν | <img src="http://img.shields.io/badge/-655ced?style=social&logo=github"/>[GitHub](https://github.com/mintorca) | chanhuk96@gmail.com | STT | [κ²μΈ λΈλ‘κ·Έλ λΈμ](#)
