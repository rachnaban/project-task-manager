import React from "react";
import { base, firebase } from "../base";
import { withRouter } from "react-router-dom";
import TaskList from "./TaskList";
import Loader from './Loader';

class Member extends React.Component {
	state = {
		loading: true,
		tasks: []
	};
	database = firebase.database();
	getPath(path = '') {
		 return `users/${this.props.uid}/tasks${path}`
    }
  	getRef(path = '') {
    	return this.database.ref(`users/${this.props.uid}/tasks${path}`)
  	}
	init = memberid => {
		this.ref = base.bindToState(this.getPath(), {
			context: this,
			state: "tasks",
			asArray: true,
			queries: {
				orderByChild: "memberid",
				equalTo: memberid
			},
			then() {
				this.setState({ loading: false });
			}
		});
	};
	componentDidMount() {
		const { id } = this.props.details;
		this.init(id);
	}

	componentWillReceiveProps(nextProps) {
		const currentMember = this.props.details.id;
		const nextMember = nextProps.details.id;

		if (currentMember !== nextMember) {
			base.removeBinding(this.ref);
			this.init(nextMember);
		}
	}

	componentWillUnmount() {
		this.ref && base.removeBinding(this.ref);
	}

	addTask = task => {
		const newTask = this.getRef().push();
		newTask.set({
			id: newTask.key,
			...task,
			memberid: this.props.details.id,
			projectid: this.props.match.params.id
		});
	};
	updateTask=(task, id)=> {
		this.getRef(`/${id}`).update({
			...task
		});
	}
	deleteTask=(id)=>
	{		
		this.getRef(`/${id}`).set(null);		
	}
	handleChange = e => {
		const member = this.props.details;
		// take a copy of that member and update it with the new data
		const updatedMember = {
			...member,
			[e.target.name]: e.target.value
		};
		this.props.updateState(updatedMember, this.props.details.id);
	};
	deleteMember=()=>{
		this.props.deleteMember(this.props.details.id);
	}
	render() {
		if (this.state.loading) {
			return <Loader/>;
		}
		const { name } = this.props.details;
		return (
			<div className="single-member">
				<input
					type="text"
					value={name}
					name="name"
					className='member-name'
					onChange={e => this.handleChange(e)}
				/>

				<TaskList
					tasks={this.state.tasks}
					addTask={this.addTask}
					updateState={this.updateTask}
					deleteTask={this.deleteTask}					
				/>
				<i 
						className="delete-member fa fa-times fa-2x"
						 aria-hidden="true"
						 onClick={this.deleteMember}
						 title='click to remove member'></i>
			</div>
		);
	}
}

export default withRouter(Member);
