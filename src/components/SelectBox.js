import React from "react";

class SelectBox extends React.Component {
	constants = {
			options: {
				Done: { color: "green", value: "Done" },
				OnHold: { color: "red", value: "On Hold" },
				InProcess: { color: "blue", value: "In Process" },
				Sent: { color: "purple", value: "Sent" },
				Schedule: { color: "orange", value: "Schedule" },
				Open: { color: "orange", value: "Open" }
			}
		};
	state = {
			backgroundColor: this.constants.options[this.props.value].color,
			value: this.props.value
		};
	
	handleChange = e => {
		this.setState({
			backgroundColor: this.constants.options[e.target.value].color
		});
		this.setState({ value: e.target.value });
		this.props.onChange(e);
	};
	render() {
		return (
			<select name='status'
				onChange={e => this.handleChange(e)}
				value={this.state.value}

				style={{ backgroundColor: this.state.backgroundColor }}
			>
				{Object.keys(this.constants.options).map(key => (
					<option
						value={key}
						key={key}
						style={{
							backgroundColor: this.constants.options[key].color
						}}
					>
						{this.constants.options[key].value}
					</option>
				))}
			</select>
		);
	}
}
export default SelectBox;
