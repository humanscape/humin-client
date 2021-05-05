const BookedInfo = props => {
    const room=props.room;
    const event = room.events[0];
    return (
        <tr style={{color: '#F4A261'}}>
            <td>{room.name}</td>
            <td>{event.summary}</td>
            <td>{event.start_time}~{event.end_time}</td>
        </tr>
    )      
}

export default BookedInfo;