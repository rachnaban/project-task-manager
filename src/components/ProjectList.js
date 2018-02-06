import React from "react";
import Project from "./Project";
import Card from "./Card";
import AddProject from "./AddProject";
import Modal from "./Modal";
import Header from "./Header";
import { base, firebase } from "../base";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Loader from './Loader';
class ProjectList extends React.Component {
	database = firebase.database();
	state = {
		projects: {},	
		loading: true,
		createProjectModalShow: false
	};
    getPath(path = '') {
    return `users/${this.props.user.uid}/projects${path}`
  }
  getRef(path = '') {
    return this.database.ref(`users/${this.props.user.uid}/projects${path}`)
  }
	componentDidMount() {
	this.ref = base.bindToState(this.getPath(),						
						{
							context: this,
							state: "projects",
							then() {
								this.setState({ loading: false });
							}
						}
					);
		
	}

	componentWillUnmount() {
		this.ref && base.removeBinding(this.ref);
	}
	
	addProject = project => {		
		const newProject = this.getRef().push();
		newProject.set({
			id: newProject.key,
			...project
		});
		this.setState({ createProjectModalShow: false });
	};
	deleteProject = id => {
		this.getRef(`/${id}`).set(null);
	};
	updateProject = (project, id) => {
		this.getRef(`/${id}`).update({
			...project
		});
	};
	onCardClick = () => {
		this.setState({ createProjectModalShow: true });
	};
	cancelCreateProject = () => {
		this.setState({ createProjectModalShow: false });
	};

	render() {
		const { projects, loading } = this.state;
		let jsx = <Loader/>;
		if (!loading) {
			jsx = (
				<ReactCSSTransitionGroup
					component="div"
					className="project-list"
					transitionName="animate"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				>
					{Object.keys(projects).map(key => (
						<Project
							key={key}
							details={projects[key]}
							deleteProject={this.deleteProject}
							updateProject={this.updateProject}
							uid={this.props.user.uid}
						/>
					))}
					<Card
					label="New Project"
					onCardClick={this.onCardClick}
				/>
				</ReactCSSTransitionGroup>
			);
		}

		return (
			<div className="app">
				<Header message="Project Tasks Manager" />

				{jsx}

				
				{this.state.createProjectModalShow ? (
					<Modal
						show={this.state.createProjectModalShow}
						modalClosed={this.cancelCreateProject}
					>
						<AddProject addProject={this.addProject} />
					</Modal>
				) : null}
			</div>
		);
	}
}

export default ProjectList;
