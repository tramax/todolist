var App = (function() {
	var todos = [], // the todos data store
		todoSelector = "#new-todo", // CSS selector pointing to the todo input
		todoListSelector = ".todolist-items ul", // CSS selector to the todo list (ul)
		todoDoneToggleSelector = ".todo-item", // CSS selector to the element to toggle the done flag
		$todoInput = undefined, // cache the jQuery reference to the todo input
		$todoList = undefined, // cache the jQuery reference to the todo list
		id = 1,
		ENTER_KEY = 13;

	function nextId() {
		return id++;
	}

	return {

		init: function() {
			$todoInput = $(todoSelector);
			$todoList = $(todoListSelector);
			this.bindEvents();
		},

		bindEvents: function() {
			var that = this;

			// when the enter key is pressed, addTodo
			$todoInput.on("keyup", function(evt) {
				if (evt.which === ENTER_KEY) {
					that.addTodo();
				}
			});

			// when the toggleDone is clicked, toggleDone
			$todoList.on("click", todoDoneToggleSelector, function(evt) {
				var $todoElem = $(evt.target);
				that.toggleDone($todoElem);
			});
		},

		// add a todo model into todos, and add it to the UI
		addTodo: function() {
			var todo = {
				id: nextId(),
				name: $todoInput.val(),
				done: false
			};
			todos.push(todo);
			this.addTodoUi(todo);
			$todoInput.val(""); // clear text box

			return false;
		},

		// add a todo item to the todo list (UI)
		addTodoUi: function(todo) {
			var todoDom = $("<li>", {
				class: "todo-item",
				text: todo.name,
				attr: {
					"data-todoId": todo.id
				}
			});
			$todoList.append(todoDom);
		},

		// add a todo item to the todo list (UI)
		addTodoUi: function(todo) {
			var todoDom = $("<li>", {
				class: "todo-item",
				text: todo.name,
				attr: {
					"data-todoId": todo.id
				}
			});
			$todoList.append(todoDom);
		},

		// toggle the done flag for a todo item
		toggleDone: function($todoElem) {
			$todoElem.toggleClass("todo-done");
			
			todos.forEach(function(todo) {
				if (todo.id === parseInt($todoElem.attr("data-todoId")), 10) {
					
				}
			});
		}
	};
})();

$(function() {
	App.init();	
});
