import React from "react";
class Card extends React.Component {
	render() {
		return (
			<div className="card" onClick={this.props.onCardClick}>
				<i className="fa fa-3x fa-plus-circle" aria-hidden="true"></i>
				<label className="card-label">{this.props.label}</label>
			</div>
		);
	}
}

export default Card;
