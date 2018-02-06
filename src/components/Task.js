import React from "react";
import SelectBox from "./SelectBox";

class Task extends React.Component {
	options = {
		Done: { color: "green", value: "Done" },
		OnHold: { color: "red", value: "On Hold" },
		InProcess: { color: "blue", value: "In Process" },
		Sent: { color: "purple", value: "Sent" },
		Schedule: { color: "orange", value: "Schedule" },
		Open: { color: "orange", value: "Open" }
	};
	state = {
		backgroundColor: this.options[this.props.details.status].color
	};
	handleChange = e => {
		if (e.target.name === "status")
			this.setState({
				backgroundColor: this.options[e.target.value].color
			});
		const task = this.props.details;
		// take a copy of that task and update it with the new data
		const updatedTask = {
			...task,
			[e.target.name]: e.target.value
		};
		this.props.updateState(updatedTask, this.props.details.id);
	};
	deleteTask = () => {
		this.props.deleteTask(this.props.details.id);
	};
	render() {
		return (
			<div
				className="single-task"
				style={{
					borderLeft: `5px solid ${this.state.backgroundColor}`
				}}
			>
				<input
					type="text"
					name="name"
					value={this.props.details.name}
					onChange={e => this.handleChange(e)}
				/>
				<SelectBox
					name="status"
					value={this.props.details.status}
					onChange={e => this.handleChange(e)}
				/>

				<textarea
					name="description"
					ref={input => (this.desc = input)}
					value={this.props.details.description}
					onChange={e => this.handleChange(e)}
				/>
				<i
					className="delete-task fa fa-times"
					aria-hidden="true"
					title="click to remove task"
					onClick={this.deleteTask}
				/>
			</div>
		);
	}
}

export default Task;
