import React, { Component } from 'react';

let counter = 0;
let itemsMap;

class App extends Component {

  state = {
    inputVal : '',
    items: []
  }

  onChangeHandler = (e) => {
    const name = e.target.name;
    const data = e.target.value;
    this.setState(() => {
      return {
        [name] : data
      }
    });
  } // on input typing

  addTodoHandler = () => {
    const itemData = {
      id: counter ++,
      name : this.state.inputVal,
      completed: false
    }
    this.setState(() => {
      return {
        items: [...this.state.items, itemData]
      }
    });
  } // add

  removeHandler = (id) => {
    // console.log('removehandler: ' + id);
    const index = this.state.items.findIndex(item => item.id === id);
    const newState = [
      ...this.state.items.slice(0, index),
      ...this.state.items.slice(index + 1)
    ];
    this.setState(() => {
      return {
        items: newState
      }
    });
  } // remove item

  itemOnClickHandler = (id) => {
    let selectedItem = this.state.items.filter(i => i.id === id)[0];
    selectedItem.completed = !selectedItem.completed;
    this.setState(() => {
      return {
        items: [...this.state.items, ...selectedItem]
      }
    });
    
  } // toggle completed

  whatToRender = (filter) => {
    switch(filter){
      case 'showCompleted':
        // console.log(this.state.items.filter(i => i.completed === true));
        return this.state.items.filter(i => i.completed === true);        
      case 'showTodos':
        // console.log(this.state.items.filter(i => i.completed === false));
        return this.state.items.filter(i => i.completed === false);        
      case 'showAll':
        // console.log(this.state.items);
        return this.state.items;
      default: return this.state.items;
    }
  }
 
  

  render() {

    itemsMap = this.whatToRender(this.state.filter).map((i, index) => {
      // const itemsMap = this.state.items.map((i, index) => {
        return(
          <li 
            className='list-group-item d-flex justify-content-between align-items-center' 
            key={i.id}
            onClick={() => this.itemOnClickHandler(i.id)}
            style={i.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'} }
            >
              {i.name}
            <span className="badge badge-pill">
              <i onClick={() => this.removeHandler(i.id)} className="far fa-window-close"></i>
            </span>          
          </li>
        );
      });
      console.log(this.state.items);
    

    return (
      <div className='container mx-auto w-50'>
        <input 
          type='text'
          name='inputVal'
          onChange={this.onChangeHandler}
          value={this.state.inputVal}
        />
        <button onClick={this.addTodoHandler}>Add Todo</button>

        <ul className='list-group'>
          {this.state.items.length > 0 ? 
            itemsMap 
            : <li>Empty</li>}
        </ul>

        <div>
          <button onClick={() => this.setState({filter: 'showAll'})}>Show All</button>
          <button onClick={() => this.setState({filter: 'showCompleted'})}>Show Completed</button> 
          <button onClick={() => this.setState({filter: 'showTodos'})}>Show Todos</button>
        </div>
        

      </div>
    );
  }
}

export default App;
