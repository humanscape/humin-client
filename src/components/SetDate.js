import { useDispatch, useSelector } from "react-redux";
import getFormatDate from "../common/lib/GetFormatDate";
import { setDate, dropDate } from "../store/modules/Date";

const SetDate = () => {

    const date = useSelector(state => state.date);
    const dispatch = useDispatch();

    const changeDate = e => {
        dispatch(setDate(e.target.value));
    }

    const setNow = e => {
        dispatch(dropDate());
    }

    const setYesterday = e => {
        const nowDate = new Date(document.getElementById("dateCalendar").value);
        dispatch(setDate(getFormatDate(new Date(nowDate.setDate(nowDate.getDate()-1)))));
    }
    
    const setNextday = e => {
        const nowDate = new Date(document.getElementById("dateCalendar").value);
        dispatch(setDate(getFormatDate(new Date(nowDate.setDate(nowDate.getDate()+1)))));
    }

    return (
        <div id="SetDate">
            <input id="dateCalendar"type="date" onChange={changeDate} value={(date)? date: getFormatDate(new Date)}/>
            <button id="NowButton" onClick={setNow}>Now</button>
            <button onClick={setYesterday}>&lt;</button>
            <button onClick={setNextday}>&gt;</button>
        </div>
    )
}

export default SetDate;