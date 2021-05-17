import UserDropdown from "./UsersDropdown";

const BookedInfo = props => {
    const room=props.room;
    const event = room.events[0];
    const now_stamp = Date.parse(new Date());
    const start_time_stamp = Date.parse(event.start_time);
    const users = event.users;
    return (
        <tr style={{color: '#F4A261'}} onClick={props.onClick}>
            <td>
                <h3>{room.name}</h3>
            </td>
            <td><b>{Math.floor((start_time_stamp-now_stamp)/1000/60)}</b>분 후 시작</td>
            <td>{event.summary}</td>
            <td><UserDropdown users={users}/></td>
        </tr>
    )      
}

export default BookedInfo;