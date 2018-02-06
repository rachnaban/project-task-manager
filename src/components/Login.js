import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Authentication from "./Authentication";
import { withRouter } from "react-router-dom";
import ProjectList from './ProjectList';
import PropTypes from 'prop-types';

class Login extends React.Component {
	 static propTypes = {
    location: PropTypes.object
  };
	render() {
		const {from} = this.props.location.state || '/';
		return (
			<Authentication
				render={({ user, login, error, logout }) => (
					<React.Fragment>
						
						{error ? <div>Error: {error}</div> : null}
						{user ? (
							<ProjectList user={user}/>
						) : (
							
			<ReactCSSTransitionGroup
				transitionName="animate"
				transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				component='div'
				className='box-layout'
			>				
					<div className="box-layout__box" key="login">
					<header>
						<h1 className="box-layout__title">
							Project Tasks Manager
						</h1>
						</header>
												
						<ul className="project-components">
							<li><a href='#'>All projects landing screen.</a></li>
							<li><a href='#'>
								A stream of all members of a particular project.</a>
							</li>
							<li><a href='#'>Task cards for each member.</a></li>
							<li><a href='#'>
								Simple popups for creating new member, new
								project and new task.</a>
							</li>
							<li><a href='#'>
								On the fly editing of project , task status and
								member.</a>
							</li>
						</ul>
						<button onClick={login}>Log In with Google</button>
					</div>				
			</ReactCSSTransitionGroup>			
		
						)}
					</React.Fragment>
				)}
			/>
		);
	}
}
export default withRouter(Login);
