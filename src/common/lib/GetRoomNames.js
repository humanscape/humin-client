const roomList = {
    public: ["PR", "C1", "C2", "C3", "휴방", "주방","H1", "H2", "H3", "M2", "M3"]
}

function getRoomNames(organization){
    if (organization==="humanscape"){
        return roomList.public.concat(roomList.humanscape, roomList.mommytalk);
    }
    else {
        return [];
    }
    
}

export default getRoomNames;