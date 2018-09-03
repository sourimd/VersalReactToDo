var TodoApp = window.TodoApp = React.createClass({
  getInitialState: function() {
    return { todos: [] , completedItems: []};
  },

  addTodo: function() {
    var currentTodos = this.state.todos;
    var isAlreadyPresent = false;
    for( var i=0; i<currentTodos.length; i++){
      if( currentTodos[i] === this.refs.addTodoInput.value){
        isAlreadyPresent = true;
      }
      // console.log( currentTodos[i] );
    }
    if( !isAlreadyPresent ){
      currentTodos.push(this.refs.addTodoInput.value);
      this.setState({ todos: currentTodos , completedItems: this.state.completedItems });
    }
    else{
      alert( this.refs.addTodoInput.value + ' is already present in the list' );
    }
    this.refs.addTodoInput.value = "";
    
  },

  markComplete: function(task){
    // console.log( task);
    alert(task + ' completed');
    var currentTodos = this.state.todos;
    var newToDos = [];
    for( var i=0; i<currentTodos.length; i++){
      if( currentTodos[i] != task ){
        newToDos.push( currentTodos[i]);
      }
    }
    var newCompletedToDo = [];
    var checkerIfAlreadyCompleted = {};
    for( var i=0; i<this.state.completedItems.length; i++){
      newCompletedToDo.push(this.state.completedItems[i]);
      checkerIfAlreadyCompleted[this.state.completedItems[i]] = true;
    }
    if( !checkerIfAlreadyCompleted[task] ){
      newCompletedToDo.push( task);
    }
    
    this.setState({ todos: newToDos , completedItems: newCompletedToDo });
  },

  editTask: function(task){
    var newTask = prompt("Please enter your to do item that you want to replace with " + task, "");
    var currentTodos = this.state.todos;
    var isAlreadyPresent = false;
    for( var i=0; i<currentTodos.length; i++){
      if( currentTodos[i] == newTask ){
        isAlreadyPresent = true;
      }
    }
    if( isAlreadyPresent ){
      alert('This task is already present in the list. Hence not adding it.You may delete the current task if you do not want it anymore');
      return;
    }
    if( newTask ){
      for( var i=0; i<currentTodos.length; i++){
        if( currentTodos[i] == task ){
          currentTodos[i] = newTask;
        }
      }
    }
    this.setState({ todos: currentTodos, completedItems: this.state.completedItems });
  },
  clickCount : 0,
  singleClickTimer: {},
  checkIfSingleOrDouble: function( task, index ){
    this.clickCount++;
    var that = this;
    if (this.clickCount === 1) {
        this.singleClickTimer = setTimeout(function() {
            that.clickCount = 0;
            that.editTask( task);
        }, 400);
    } 
    else if (this.clickCount === 2) {
        clearTimeout(this.singleClickTimer);
        this.clickCount = 0;
        this.markComplete(task);
    }
  },

  render: function() {
    var that = this;
    return (
      <div>
      <div className="todo-container">
        <h2>You have {this.state.todos.length} items on the agenda.</h2>

        <div className="todos">
          {this.state.todos.map(function(todo, index) {
            
            return (
              <li onClick={ function(){ that.checkIfSingleOrDouble(todo, index)} } >{todo}</li>
            )
          })}

        </div>

        <div className="add">
          <input type="text" ref="addTodoInput" />
          <button onClick={this.addTodo}>Add</button>
        </div>
      </div>

      <div>
        <h2>List of completed items</h2>
        <div>
          {this.state.completedItems.map(function(item, index) {
            
            return (
              <li>{item}</li>
            )
          })}
        </div>
      </div>
      </div>
    );
  }
});

