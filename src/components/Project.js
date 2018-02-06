import React from "react";
import { Link , withRouter} from "react-router-dom";

class Project extends React.Component {
	deleteProject = () => {
		this.props.deleteProject(this.props.details.id);
	};
	handleChange = e => {
		const project = this.props.details;
		// take a copy of that project and update it with the new data
		const updatedProject = {
			...project,
			[e.target.name]: e.target.value
		};
		this.props.updateProject(updatedProject, this.props.details.id);
	};
	render() {
		const { id, name, description } = this.props.details;
		return (
			<div className="single-project">
				<Link
					to={{
						pathname: `/project/${id}`,						
						state: { message: name , uid:this.props.uid}
					}}
				>
					Members of {name}
				</Link>
		

				<input className='project-name'
					type="text"
					name="name"
					value={name}
					onChange={e => this.handleChange(e)}
				/>
				<textarea
					name="description"
					value={description}
					onChange={e => this.handleChange(e)}
				/>
				<i
					className="delete-project fa fa-times"
					aria-hidden="true"
					onClick={this.deleteProject}
					title="click to remove project"
				/>
			</div>
		);
	}
}

export default withRouter(Project);
