import UserDropdown from "./UsersDropdown";

const InConferenceInfo = props => {
    const room=props.room;
    const event = room.events[0];
    const now_stamp = Date.parse(new Date());
    const end_time_stamp = Date.parse(event.end_time);
    const min = Math.floor((end_time_stamp-now_stamp)/1000/60);
    return (
        <tr style={{color: '#E76F51'}}>
            <td>
                <h3>{room.name}</h3>
            </td>
            <td>
                {min>=60? <span><b>{Math.floor(min/60)}</b>시간 <b>{(min%60)}</b></span>: <b>{min}</b>}분 후 종료</td>
            <td>{event.summary}</td>
            <td><UserDropdown users={event.users}/></td>
        </tr>
    )   
}

export default InConferenceInfo;