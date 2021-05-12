import UserDropdown from "./UsersDropdown";

const EmptyEvent = props => {
    return (
        <tr style={{color: '#2A9D8F'}} onClick={props.onClick}>
            <td><h3>{props.room.name}</h3></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}

const NotEmptyEvent = props => {
    const event = props.room.events[0];
    const start_time_stamp = Date.parse(event.start_time)
    const now_time_stamp = Date.parse(new Date());
    const min = Math.floor((start_time_stamp-now_time_stamp)/1000/60);
    return (
        <tr style={{color: '#2A9D8F'}} onClick={props.onClick}>
            <td>
                <h3>{props.room.name}</h3>
            </td>
            <td>
                {min>=60? <span><b>{Math.floor(min/60)}</b>시간 <b>{min%60}</b></span>: <b>{min}</b>}분 남음
            </td>
            <td>{event.summary}</td>
            <td><UserDropdown users={event.users}/></td>
        </tr>
    )   
}

const intToString = int => {
    return int.toString().padStart(2, "0");
}

const AvaliableInfo = props => {
    const room=props.room;
    const date = new Date();
    if (room.events.length>0){
        const event = room.events[0];
        const start_time = {
            year: event.start_time.substring(0, 4),
            month: event.start_time.substring(5, 7),
            day: event.start_time.substring(8, 10)
        };
        if (start_time.year===date.getFullYear().toString() && start_time.month===intToString(date.getMonth()+1) && start_time.day===intToString(date.getDate())){
            return <NotEmptyEvent room={room} onClick={props.onClick}/>
        }
            return <EmptyEvent room={room} onClick={props.onClick}/>
    }
        return <EmptyEvent room={room} onClick={props.onClick}/>
}

export default AvaliableInfo;