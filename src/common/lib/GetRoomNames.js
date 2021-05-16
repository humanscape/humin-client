const roomList = {
    public: ["PR", "C1", "C2", "C3", "휴방", "주방"],
    humanscape : ["H1", "H2", "H3", "안방", "골방"],
    mommytalk: ["M1", "M2", "M3"]
}

function getRoomNames(organization){
    if (organization==="all"){
        return roomList.public.concat(roomList.humanscape, roomList.mommytalk);
    }
    else if (organization==="humanscape"){
        return roomList.public.concat(roomList.humanscape);
        
    }
    else if (organization==="mommytalk"){
        return roomList.public.concat(roomList.mommytalk);
    }
    else {
        return [];
    }
    
}

export default getRoomNames;