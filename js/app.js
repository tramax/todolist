var App = (function() {
	var todos = [], // the todos data store
		todoSelector = "#new-todo", // CSS selector pointing to the todo input
		todoListSelector = ".todolist-items ul", // CSS selector to the todo list (ul)
		todoDoneToggleSelector = ".toggle", // CSS selector to the element to toggle the done flag
		todoDestroySelector = ".destroy";
		todoListFilterSelector = ".todolist-filters";
		$todoInput = undefined, // cache the jQuery reference to the todo input
		$todoList = undefined, // cache the jQuery reference to the todo list
		footer = undefined,
		id = 1,
		ENTER_KEY = 13;

	function nextId() {
		return id++;
	}

	return {

		init: function() {
			$todoInput = $(todoSelector);
			$todoList = $(todoListSelector);
			footer = $("footer");
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

			$todoList.on("click", todoDestroySelector, function(evt) {
				var $todoElem = $(evt.target).parents("[data-todoId]");
				that.destroyItem($todoElem);
			});

			footer.on("click", todoListFilterSelector, function(evt) {
				if( $(evt.target).hasClass("strong") ) {
					return;
				}
				that.toggleFilter(evt.target);
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
			var containerDom = $("<div>");
			containerDom.append(toggleDom)
				.append(labelDom)
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

		destroyItem: function($todoElem) {
			console.log("in destroyItem : ", $todoElem);
			var index = 0;
			var targetId = parseInt($todoElem.attr("data-todoId"), 10);
			todos.forEach(function(todo) {
				if (todo.id === targetId) {
					todos.splice( index, 1 );
					$todoElem.remove();
				}
				index++;
			});
		},

		toggleFilter: function(target) {
			var filter = $(target).html();
			$(".todolist-filters").removeClass("strong");
			$(target).addClass("strong");
			if( filter == "All" ) {
				$(todoListSelector).find("li").removeClass("hide");
				return;
			}
			if( filter == "Active" ) {
				todos.forEach(function(todo) {
					if( todo.done ) {
						$(todoListSelector).find("[data-todoId="+todo.id+"]").addClass("hide");
					}
					else {
						$(todoListSelector).find("[data-todoId="+todo.id+"]").removeClass("hide");
					}
				});
				return;
			}
			if( filter == "Completed" ) {
				todos.forEach(function(todo) {
					if( todo.done ) {
						$(todoListSelector).find("[data-todoId="+todo.id+"]").removeClass("hide");
					}
					else {
						$(todoListSelector).find("[data-todoId="+todo.id+"]").addClass("hide");
					}
				});
				return;
			}
		},
	};
})();

$(function() {
	App.init();	
});
