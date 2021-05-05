const AvaliableInfo = props => {
    const room=props.room;
    if (room.events.length>0){
        const event = room.events[0];
        return (
            <tr style={{color: '#2A9D8F'}}>
                <td>{room.name}</td>
                <td>{event.summary}</td>
                <td>{event.start_time}~{event.end_time}</td>
            </tr>
        )   
    }
    else{
        return (
            <tr style={{color: '#2A9D8F'}}>
                <td>{room.name}</td>
            </tr>
        )
    }
}

export default AvaliableInfo;