import React from 'react';

class AddProject extends React.Component {
  state = {error:''};

  createProject(event) {
    event.preventDefault();
    if (!this.name.value || !this.desc.value) {
      this.setState(() => ({ error: 'Please provide project name and description.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
    const project = {
      name: this.name.value,
      description: this.desc.value      
    }
    this.props.addProject(project);
    this.projectForm.reset();
  }
}

  render() {
    return (
      <React.Fragment>
      {this.state.error && <p>{this.state.error}</p>}
      <form ref={(input) => this.projectForm = input}  className='addProjectForm' onSubmit={(e) => this.createProject(e)}>
        <input autoFocus  ref={(input) => this.name = input} type="text" placeholder="Project Name" />
        <textarea ref={(input) => this.desc = input} placeholder="Project Description" ></textarea>        
        <button type="submit">+ Add Item</button>
      </form>
      </React.Fragment>
    )
  }
}
export default AddProject;