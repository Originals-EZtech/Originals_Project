// 업로드한 파일 이미지 불러오기 테스트
import React from 'react';

function Customer ({key, id, image}) {
    return(
    <tr>
        <td>{id}</td>
        <td><img src={image} alt="profile"/></td>
    </tr>
    )
}

export default Customer;