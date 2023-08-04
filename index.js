/**
 * 항 일
 * - label
 * - completed
 */

let toDoList = [
    { id: 1, label: '일어나기', completed: false},
    { id: 2, label: '아침먹기', completed: false},
    { id: 3, label: '학교가기', completed: false}
]; // list는 const 이어도 list 내의 참조 아이템을 추가, 삭제하는데 문제가 없다

const addTodo = (label) => {
    const todo = {id: new Date().getMilliseconds(), label: label, completed: false};

    toDoList = [...toDoList, todo];
};

const deleteTodo = (id) => {
    const newTodoList = toDoList.filter((todo) => todo.id !== id);
    // object destructing 이 가능하다.

    toDoList = newTodoList;
};

const completeTodo = (targetId) => {
    // first: 찾고, 기존 오브젝트 빼고, 새로 만들어서 넣고 
    
    const newTodoList = toDoList.map((todo) => {
        if(todo.id == targetId){
            return {...todo, completed: true};
            //todo object의 completed 가 overriding
        }

        return todo;
    });

    toDoList = newTodoList;
};

const editTodo = (id, newLabel) => {
    toDoList = toDoList.map((todo) => {
        if (todo.id === id) {
            return { ...todo, label: newLabel };
        }
        return todo;
    });
    renderTodoList();
}

const renderTodo = (todo) => {
    const todoLabel = document.createElement("p");
    if(todo.completed == true){
        todoLabel.className = "todo-done";
    }
    else{
        todoLabel.className = "todo-label";
    };
    todoLabel.innerText = todo.label;

    const completeButton = document.createElement("button");
    completeButton.classList.add("todo-action");
    completeButton.classList.add("clear");
    completeButton.innerText = "완료";
    completeButton.onclick = () => {completeTodo(todo.id)
        renderTodoList();
    };

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-action");
    deleteButton.classList.add("delete");    
    deleteButton.innerText = "삭제";
    deleteButton.onclick = () => { deleteTodo(todo.id)
        renderTodoList();
    };

    const editButton = document.createElement("button");
    editButton.classList.add("todo-action");
    editButton.classList.add("edit");
    editButton.innerText = "수정";
    editButton.onclick = () => {
        const newLabel = prompt("수정할 내용을 입력해주세요:", todo.label);
        if (newLabel !== null && newLabel !== "") {
            editTodo(todo.id, newLabel);
        }
    };

    const todoWrapperAction = document.createElement("div");
    todoWrapperAction.className = "todo-action-wrapper";

    if (!todo.completed){
        todoWrapperAction.appendChild(completeButton);
    }
    todoWrapperAction.appendChild(deleteButton);
    todoWrapperAction.appendChild(editButton);

    const todoWrapper = document.createElement("div");
    todoWrapper.className = "todo-wrapper";
    todoWrapper.appendChild(todoLabel);
    todoWrapper.appendChild(todoWrapperAction);

    
    const content = document.getElementById("content");

    content.appendChild(todoWrapper);

};

const addContentRender = () => {
    const addButton = document.createElement("button");
    addButton.classList.add("add-action");
    addButton.innerText = "+";
    addButton.onclick = () => {
        const newLabel = prompt("새로운 할 일을 입력해주세요:");
        if (newLabel) {
            addTodo(newLabel);
            renderTodoList();
        }
    };

    const addWrapper = document.createElement("div");
    addWrapper.className = "action-wrapper"
    addWrapper.appendChild(addButton);

    const addContent = document.getElementById("action-wrapper");
    addContent.appendChild(addWrapper);

}

const renderTodoList = () => {
    const content = document.getElementById("content");
    content.innerHTML = "";

    toDoList.forEach((todo) => {
        renderTodo(todo);
    }
    );
};

renderTodoList();
addContentRender();