import React from 'react';
import SelectBox from './SelectBox';

class AddTask extends React.Component {
   state = {error:''};
  createTask(event) {
    event.preventDefault();
    if (!this.name.value || !this.desc.value) {
      this.setState(() => ({ error: 'Please provide task name and description.' }));
    }
    else {
      this.setState(() => ({ error: '' }));
    const task = {
      name: this.name.value,
      status: this.status.value || 'Open',
      description: this.desc.value      
    }
    this.props.addTask(task);
    this.taskForm.reset();
  }
}

  render() {
    return (
      <React.Fragment>
      {this.state.error && <p>{this.state.error}</p>}
      <form ref={(input) => this.taskForm = input}  onSubmit={(e) => this.createTask(e)}>
        <input autoFocus  ref={(input) => this.name = input} type="text" placeholder="Task Name" />         
        <SelectBox 
          ref={(input) => this.status = input}
          value={'Open'}
          onChange= {(e)=>{this.status.value= e.target.value}}
          />
        <textarea ref={(input) => this.desc = input} placeholder="Task Description" ></textarea>        
        <button type="submit">+ Add Item</button>
      </form>
      </React.Fragment>
    )
  }
}
export default AddTask;