
    const colors = ["rgb(38, 70, 83)", "rgb(42, 157, 143)", "rgb(244, 162, 97)", "rgb(231, 111, 81)"];

const ColorBar = () => {
    return (
        <div id="ColorBar">
            <div className="ColorItem"><div className="Color" style={{backgroundColor: colors[0]}}></div>사용불가</div>
            <div className="ColorItem"><div className="Color" style={{backgroundColor: colors[1]}}></div>예약가능</div>
            <div className="ColorItem"><div className="Color" style={{backgroundColor: colors[2]}}></div>곧 사용</div>
            <div className="ColorItem"><div className="Color" style={{backgroundColor: colors[3]}}></div>회의중</div>
        </div>
    )
}

export default ColorBar;