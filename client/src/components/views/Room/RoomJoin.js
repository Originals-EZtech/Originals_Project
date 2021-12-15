import React from "react";

export default class RoomJoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  onclick = () => {
    fetch("/api/data2", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
        });
      });
  };

  render() {
    return (
      <div>
        <h2>테이블 명 가져오기</h2>
        <h3>{this.state.data}</h3>
        <button onClick={this.onclick}>가져오기</button>
      </div>
    );
  }
}