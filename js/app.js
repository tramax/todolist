var App = {
	_todos: [], // the todos data store
	_todoSelector: "#new-todo", // CSS selector pointing to the todo input
	_todoListSelector: ".todolist-items ul", // CSS selector to the todo list (ul)
	_$todoInput: undefined, // cache the jQuery reference to the todo input
	_$todoList: undefined, // cache the jQuery reference to the todo list
	_todoItemTmpl: "<li class='todo-item'></li>", // HTML fragment string for a single todo item
	_id: 1,
	ENTER_KEY: 13,

	init: function() {
		this._$todoInput = $(this._todoSelector);
		this._$todoList = $(this._todoList)
		this._bindEvents();
	},

	_nextId: function() {
		return this._id++;
	},

	_bindEvents: function() {
		// when the enter key is pressed, addTodo
		this._$todoInput.on("keyup", function(evt) {
			if (evt.which() === this.ENTER_KEY) {
				this._addTodo();
			}
		});
	},

	// add a todo model into todos, and add it to the UI
	_addTodo: function() {
		var todo = {
			id: this._nextId(),
			name: this._$todoInput.val(),
			done: false
		};
		this._todos.push(todo);
		this._addTodoUi(todo);

		return false;
	},

	// add a todo item to the todo list (UI)
	_addTodoUi: function(todo) {
		var todoDom = $(this._todoItemTmpl, {
			html: todo.name,
			attr: {
				"data-todoId", todo.id
			}
		});
		this._$todoList.append(todoDom);
	}
};

App.init();