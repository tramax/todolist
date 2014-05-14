var App = {
	_todos: [], // the todos data store
	_todoSelector: "#new-todo", // CSS selector pointing to the todo input
	_todoListSelector: ".todolist-items ul", // CSS selector to the todo list (ul)
	_$todoInput: undefined, // cache the jQuery reference to the todo input
	_$todoList: undefined, // cache the jQuery reference to the todo list
	_id: 1,
	ENTER_KEY: 13,

	init: function() {
		this._$todoInput = $(this._todoSelector);
		this._$todoList = $(this._todoListSelector)
		this._bindEvents();
	},

	_nextId: function() {
		return this._id++;
	},

	_bindEvents: function() {
		// when the enter key is pressed, addTodo
		var that = this;
		this._$todoInput.on("keyup", function(evt) {
			if (evt.which === that.ENTER_KEY) {
				that._addTodo();
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
		this._$todoInput.val("");

		return false;
	},

	// add a todo item to the todo list (UI)
	_addTodoUi: function(todo) {
		var todoDom = $("<li>", {
			class: "todo-item",
			text: todo.name
		});
		this._$todoList.append(todoDom);
	}
};

$(function() {
	App.init();	
});
