import React from "react";
export default class RoomJoinComp extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data:"",
    };
  }

  handlChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onclick = () => {
    //데이터 가져오기(방이름들)
    fetch("/api/data2/roomjoinname_2", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("6json="+json);
        console.log(json);
        this.setState({
          data: json,
        });
        console.log("3this.roomnamestate:"+this.state);
        console.log("4this.roomnamestate.data:"+this.state.data);
      });
  };
  
  render() {    
  const element = document.getElementsByClassName('team-info');
  const rendering = () => {
    const result = [];
    console.log("1this.roomnamestate : "+this.state);
    console.log("2this.roomnamestate.data :"+this.state.data);
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
