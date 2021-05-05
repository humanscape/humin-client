import React from "react";

class RoomBlock extends React.Component {
    render() {
        const blockStyle = {
            left: this.props.left,
            top: this.props.top,
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color,
            lineHeight: this.props.height
        }
        return (
            <div 
            className="RoomBlock"
            style={blockStyle}>{this.props.name}</div>
        )
    }
}

export default RoomBlock;