const EventClassifier = (eventTime) => {
    const currentTimeStamp = Date.parse(new Date());
    const eventTimeStamp = Date.parse(eventTime);
    const soonTimeRange = 60 * 60 * 1000;
    if (currentTimeStamp>=eventTimeStamp){
        return 3;
    }
    else if (eventTimeStamp-currentTimeStamp<=soonTimeRange){
        return 2;
    }
    else {
        return 1;
    }
}

export default EventClassifier;