import axios from "axios";
import React from "react";
import Info from "../atoms/Info";

const roomList = ["안방", "골방", "H1", "H2", "H3", "주방", "C1", "C2", "C3", "PR Room", "휴방"]

async function getEventList(roomName){
    return await axios.get("http://localhost:8000/event/"+roomName+"/")
} 

class InfoList extends React.Component {

     constructor(props){
         super(props)
         this.state = {
             rooms: []
         }
     }

    componentDidMount(){
        roomList.forEach(roomName => {
            getEventList(roomName).then(response => {
                this.setState({rooms: this.state.rooms.concat(response.data)})
            })
        });
    };

    render() {
        return (
            <table id="InfoList">
                <thead>
                    <tr>
                        <th id="RoomName">공간</th>
                        <th id="Schedule">일정</th>
                        <th id="EventSummary">이벤트</th>
                        <th id="Users">참석자</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.rooms.map(room => {
                        console.log(room);
                        return(<Info room={room}/>)
                    })}
                </tbody>
            </table>
        )
    }
}

export default InfoList;