import {newId} from './modules/generateId';
var taskArray = [];

window.addEventListener('load', () => {
    if(localStorage.getItem('myTodoList')!==null){
        taskArray = JSON.parse(localStorage.getItem('myTodoList'));
        taskArray.forEach(element => {
            createElement(element);
        });
    }
});

document.getElementById('send-button').addEventListener('click', (event) => {   
    event.preventDefault();
    var taskObject = {}; 
    var title = document.getElementById("title").value;    
    var description =document.getElementById('description').value;
    var priority = document.querySelector('input[name="priority"]:checked').value;
    taskObject.titleObject = title;
    taskObject.descObject = description;
    taskObject.priorityObject = priority;
    taskObject.id = generateToDoId(taskArray);
    taskObject.id = newId(taskArray);   
    taskArray.push(taskObject);
    localStorage.setItem('myTodoList', JSON.stringify(taskArray));    
    createElement(taskObject);    
});

document.addEventListener('click', (event) => {
    if(event.target.classList=="delete-button"){
        removeFunction(event.target.closest('.todo-item'));
    }
})

function removeFunction (deleteItem) {
    deleteItem.remove();
    taskArray.splice(deleteItem.id-1,1);
    localStorage.setItem('myTodoList', JSON.stringify(taskArray));
}

function createElement (taskObject) {
    var toDoItem = document.createElement('div');
    toDoItem.className = 'todo-item';
    toDoItem.dataset.id = taskObject.id;
    switch(taskObject.priorityObject){
        case 'Low':
            toDoItem.classList.add('low-color');
            break;
        case 'Medium':
            toDoItem.classList.add('medium-color');
            break;
        case 'High':
            toDoItem.classList.add('high-color');
            break;  
    }
    console.log(toDoItem.classList)
    const toDoContent = `
        <div class="date">Created: ${new Date().toISOString().slice(0, 10)}</div>
        <div class="title">${taskObject.titleObject}</div>
        <div class="description">${taskObject.descObject}</div>        
        <button class="delete-button">X</button>
        <input class="checkbox-done" type="checkbox" id="checkbox-done" value="task-done">
    `
    toDoItem.innerHTML = toDoContent;
    document.querySelector('.todo-wrapper').appendChild(toDoItem);
}

function generateToDoId(taskArray) {
    const idArray = taskArray.map(todoObject => todoObject.id);
    let newId;
    if(idArray.lenght===0){
        newId=1;
    }else{
        newId=Math.max(...idArray)+1;
    }
    return newId;
}

/*taskArray.forEach(toDoObject => {
    const toDoItem = document.createElement('div');
    toDoItem.className = 'toDo-item';
    const toDoContent = `
        <div class="title">${toDoObject.titleObject}</div>
        <div class="description">${toDoObject.descObject}</div>
        <div class="date">Created: ${new Date().toISOString().slice(0, 10)}</div>
        <button class="delete">Kantica</button>
        <input type="checkbox" id="checkbox-done" value="task-done">
    `
    toDoItem.innerHTML = toDoContent;
    document.querySelector('.todo-wrapper').appendChild(toDoItem);
});

console.log(taskObject);*/

