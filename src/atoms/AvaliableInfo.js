const AvaliableInfo = props => {
    const room=props.room;
    if (room.events.length>0){
        const event = room.events[0];
        const start_time = {
            year: event.start_time.substring(0, 4),
            month: event.start_time.substring(5, 7),
            day: event.start_time.substring(8, 10),
            hour: event.start_time.substring(11, 13),
            min: event.start_time.substring(14, 16),
        }
        return (
            <tr style={{color: '#2A9D8F'}}>
                <td>
                    <h3>{room.name}</h3>
                    <div className="RoomTime">{start_time.year}년 {start_time.month}월 {start_time.day}일 {start_time.hour}시 {start_time.min}분에 시작</div>
                </td>
                <td>{event.summary}</td>
                <td></td>
            </tr>
        )   
    }
    else{
        return (
            <tr style={{color: '#2A9D8F'}}>
                <td><h3>{room.name}</h3></td>
                <td>Avaliable</td>
                <td></td>
            </tr>
        )
    }
}

export default AvaliableInfo;