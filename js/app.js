var App = (function() {
	var todos = [], // the todos data store
		todoSelector = "#new-todo", // CSS selector pointing to the todo input
		todoListSelector = ".todolist-items ul", // CSS selector to the todo list (ul)
		todoDoneToggleSelector = ".toggle", // CSS selector to the element to toggle the done flag
		$todoInput = undefined, // cache the jQuery reference to the todo input
		$todoList = undefined, // cache the jQuery reference to the todo list
		id = 1,
		ENTER_KEY = 13
		ESC_KEY = 27;

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
				var $todoElem = $(evt.target).parents("[data-todoId]");
				that.toggleDone($todoElem);
			});

			$todoList.on("dblclick", "label", function(evt) {
				var $todoElem = $(evt.target).parents("[data-todoId]");
				that.toggleEditing($todoElem);
			});

			$todoList.on("keyup", ".todo-edit-box", function(evt) {
				if (evt.which === ENTER_KEY || evt.which === ESC_KEY) {
					$(evt.target).blur();
				}
			});

			$todoList.on("blur", ".todo-edit-box", function(evt) { 
				var $todoElem = $(evt.target).parents("[data-todoId]");
				that.saveEdits($todoElem);
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
				attr: {
					"data-todoId": todo.id
				}
			});
			var toggleDom = $("<input>", {
				class: "toggle",
				attr: {
					type: "checkbox"
				}
			});
			var labelDom = $("<label>", {
				text: todo.name
			});
			var destroyDom = $("<button>", {
				class: "destroy"
			});
			var editDom = $("<input>", {
				class: "todo-edit-box",
				attr: {
					type: "text",
					value: todo.name
				}
			})
			var containerDom = $("<div>");
			containerDom.append(toggleDom)
				.append(labelDom)
				.append(editDom)
				.append(destroyDom);
			todoDom.append(containerDom);
			$todoList.append(todoDom);
		},

		// toggle the done flag for a todo item
		toggleDone: function($todoElem) {
			var targetId = parseInt($todoElem.attr("data-todoId"), 10);
			todos.forEach(function(todo) {
				if (todo.id === targetId) {
					todo.done = !todo.done;
				}
			});
			$todoElem.toggleClass("todo-done");
		},

		toggleEditing: function($todoElem) {
			$todoElem.toggleClass("todo-editing");
			if ($todoElem.hasClass("todo-editing"))
				$todoElem.find(".todo-edit-box").focus();
		},

		saveEdits: function($todoElem) {
			var id = parseInt($todoElem.attr("data-todoId"), 10);

			// save to collection
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					todos[i].name = $todoElem.find(".todo-edit-box").val();
					$todoElem.find("label").text(todos[i].name);
				}
			}

			$todoElem.toggleClass("todo-editing");
		}
	};
})();

$(function() {
	App.init();	
});
