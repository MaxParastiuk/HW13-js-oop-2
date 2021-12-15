class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
        let idList = document.querySelector(`[data-id="${id}"]`);
        idList.remove();
    }

    setTodos(todos) {
        this.todos = todos;
    }

    getTodos() {
        return this.todos;
    }


    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }
            let doneOrNot = el.status ? "done" : "not-done";
            lis += `<li class="${doneOrNot}" data-id="${el.id}">${el.value}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }


    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        let idList = document.querySelector(`[data-id="${id}"]`);
        this.changeBacklight(index, idList);
    }

    changeBacklight(index, id) {
        if (this.todos[index].status) {
            id.classList.toggle("not-done")
            id.classList.toggle("done")
        } else {
            id.classList.toggle("done")
            id.classList.toggle("not-done")
        }
    }

    findTasks(str) {
        let todos = this.getTodos();
        this.todos = this.todos.filter(todo => todo.value && todo.value.includes(str));
        this.render();
        this.setTodos(todos);
    }

}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

const ul = document.getElementById('list');
const input = document.getElementById('task');
const create = document.getElementById('add');
const find = document.getElementById('find')
let todo1 = new TodoList(ul);
todo1.addTodo(new Task('Hello', true))
todo1.render();

create.addEventListener('click', function (event) {
    event.preventDefault();
    todo1.addTodo(new Task(input.value, true));
    todo1.render();

    let refresh = document.getElementById('task');
    refresh.value = '';
});

find.addEventListener('click', function (event) {
    event.preventDefault();
    todo1.findTasks(input.value)
})


ul.addEventListener('click', (event) => {
    let dataId = event.target.closest('[data-id]').dataset.id;
    if (event.target.className === 'set-status') {
        todo1.changeStatus(dataId);
    }
    if (event.target.className === 'delete-task') {
        todo1.removeTodo(dataId)
    }
})

