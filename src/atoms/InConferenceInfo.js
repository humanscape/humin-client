const InConferenceInfo = props => {
    const room=props.room;
    const event = room.events[0];
    const now_stamp = Date.parse(new Date());
    const end_time_stamp = Date.parse(event.end_time);
    return (
        <tr style={{color: '#E76F51'}}>
            <td>
                <h3>{room.name}</h3>
                <div className="RoomTime">{Math.floor((end_time_stamp-now_stamp)/1000/60)} 분 후에 종료</div>
            </td>
            <td>{event.summary}</td>
            <td></td>
        </tr>
    )   
}

export default InConferenceInfo;