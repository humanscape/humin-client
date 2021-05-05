const BookedInfo = props => {
    const room=props.room;
    const event = room.events[0];
    const now_stamp = Date.parse(new Date());
    const start_time_stamp = Date.parse(event.start_time);
    const users = event.users;
    console.log(users);
    return (
        <tr style={{color: '#F4A261'}}>
            <td>
                <h3>{room.name}</h3>
                <div className="RoomTime">{Math.floor((start_time_stamp-now_stamp)/1000/60)} 분 후에 시작</div>
            </td>
            <td>{event.summary}</td>
            <td></td>
        </tr>
    )      
}

export default BookedInfo;