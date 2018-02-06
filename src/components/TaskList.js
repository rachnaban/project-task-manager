import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import Card from "./Card";
import Modal from "./Modal";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class TaskList extends React.Component {
	state = {
		createTaskModalShow: false
	};

	cancelModal = () => {
		this.setState({ createTaskModalShow: false });
	};
	onCardClick = () => {
		this.setState({ createTaskModalShow: true });
	};
	render() {
		return (
			<React.Fragment>
				<ReactCSSTransitionGroup
					transitionName="animate"
					component="div"
					className="task-list"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				>
					{this.props.tasks.map(task => (
						<Task
							key={task.id}
							details={task}
							updateState={this.props.updateState}
							deleteTask={this.props.deleteTask}
						/>
					))}
					<Card label="New Task" onCardClick={this.onCardClick} />
				</ReactCSSTransitionGroup>
				
				{this.state.createTaskModalShow ? (
					<Modal
						show={this.state.createTaskModalShow}
						modalClosed={this.cancelModal}
					>
						<AddTask
							addTask={task => {
								this.setState({ createTaskModalShow: false });
								this.props.addTask(task);
							}}
						/>
					</Modal>
				) : null}
			</React.Fragment>
		);
	}
}

export default TaskList;
