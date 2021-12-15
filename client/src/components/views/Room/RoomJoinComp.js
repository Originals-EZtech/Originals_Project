import React from "react";

export default class RoomJoinComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  
  onclick = () => {
    fetch("/api/data2/roomjoin", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json="+json);
        console.log(json);
        
        
        this.setState({
          data: json,
        });
        console.log(this.state);
      });
  };
  // setInnerHTML() {
  //   const element = document.getElementsByClassName('team-info');
  //   element.innerHTML 
  //     = '<div style="color:blue">InnerHTML<div>';
  // } 
  
  render() {
    const element = document.getElementsByClassName('team-info');
    const rendering = () => {
      const result = [];
      for (let i = 0; i < this.state.data.length; i++) {
        element.innerHTML= result.push(<span key={i}>{i+"번째 방:"+this.state.data[i] + "  "}</span>);
      }
      return result;
    };
    return (
      <div>
        <h2>방 이름 가져오기</h2>
        <h3><div>{rendering()}</div></h3>

        <button onClick={this.onclick}>가져오기</button>
      </div>
    );
  }
};
