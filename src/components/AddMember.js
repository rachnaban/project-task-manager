import React from 'react';

class AddMember extends React.Component {
  
  state = {error:''};

  createMember(event) {
  	 event.preventDefault();
     if (!this.name.value) {
      this.setState(() => ({ error: 'Please provide member name.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
    const member = {
      name: this.name.value,
     }
    this.props.addMember(member);
    this.memberForm.reset();
  }
}

  render() {
    return (
      <React.Fragment>
      {this.state.error && <p>{this.state.error}</p>}
      <form ref={(input) => this.memberForm = input}  onSubmit={(e) => this.createMember(e)}>
        <input autoFocus ref={(input) => this.name = input} type="text" placeholder="Member Name" /> 
        <button type="submit">+ Add Item</button>      
      </form>
      </React.Fragment>
    )
  }
}
export default AddMember;