import React from "react";
import Card from "./Card";
import Modal from "./Modal";
import Member from "./Member";
import AddMember from "./AddMember";
import Header from "./Header";
import { base, firebase } from "../base";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Loader from './Loader';

class MemberList extends React.Component {
	state = {
		loading: true,
		members: [],
		createMemberModalShow: false
	};
	database = firebase.database();
	getPath(path = '') {
		 return `users/${this.props.uid}/members${path}`
    }
  getRef(path = '') {
    return this.database.ref(`users/${this.props.uid}/members${path}`)
  }
	componentDidMount() {		
		this.ref = base.bindToState(this.getPath(), {
			context: this,
			state: "members",
			asArray: true,
			queries: {
				orderByChild: "projectid",
				equalTo: this.props.match.params.id
			},
			then() {
				this.setState({ loading: false });
			}
		});
	}

	componentWillUnmount() {
		this.ref && base.removeBinding(this.ref);
	}
	addMember = member => {
		const newMember = this.getRef().push();
		newMember.set({
			id: newMember.key,
			...member,
			projectid: this.props.match.params.id
		});
		this.setState({ createMemberModalShow: false });
	};
	updateMember = (member, id) => {
		this.getRef(`/${id}`).update({
			...member
		});
	};
	deleteMember = id => {
		this.getRef(`/${id}`).set(null);
	};
	cancelModal = () => {
		this.setState({ createMemberModalShow: false });
	};
	onCardClick = () => {
		this.setState({ createMemberModalShow: true });
	};
	render() {
		if (this.state.loading) {
			return <Loader/>;
		}
		return (
			<React.Fragment>
				<Header
					message={this.props.location.state.message}
					closeheader={true}
					uid={this.props.uid}
				/>

				<ReactCSSTransitionGroup
					transitionName="animate"
					component="div"
					className="member-list"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				>
					{this.state.members.map(member => (
						<Member
							key={member.id}
							details={member}
							updateState={this.updateMember}
							deleteMember={this.deleteMember}
							uid={this.props.uid}
						/>
					))}
					<Card
					label="New Member"
					onCardClick={this.onCardClick}
				/>
				</ReactCSSTransitionGroup>

				
				{this.state.createMemberModalShow ? (
					<Modal
						show={this.state.createMemberModalShow}
						modalClosed={this.cancelModal}
					>
						<AddMember addMember={this.addMember} />
					</Modal>
				) : null}
			</React.Fragment>
		);
	}
}

export default withRouter(MemberList);
