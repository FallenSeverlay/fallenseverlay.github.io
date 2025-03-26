import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskListColumnComponent from './view/task-list-column-component.js';
import TaskListItemComponent from './view/task-list-item-component.js';
import {render, RenderPosition} from './render.js';


const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-container');
const todoListContainer = document.querySelector('.todo-list');


const taskList = new TaskListComponent();

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(taskList, todoListContainer);


const columns = [
    {
        "Name": "Название блока", 
        "Class": "test", 
        "Items": ["Название первой задачи", "Название второй задачи", "Название третьей задачи"]
    },
    {
        "Name": "Бэклог", 
        "Class": "backlog", 
        "Items": ["Выучить JS", "Выучить React", "Сделать домашку"]
    },
    {
        "Name": "В процессе", 
        "Class": "progress", 
        "Items": ["Выпить смузи", "Попить воды"]
    },
    {
        "Name": "Готово", 
        "Class": "ready", 
        "Items": ["Позвонить маме", "Погладить кота"]
    },
    {
        "Name": "Корзина", 
        "Class": "trash", 
        "Items": ["Сходить погулять", "Прочитать Войну и Мир"]
    }
];


columns.forEach(element => {
    const column = new TaskListColumnComponent(element.Class, element.Name);
    render(column, taskList.getElement());

    const columnContainer = column.getElement().querySelector('.' + column.className + '__inner');
    element.Items.forEach(item => {
        render(new TaskListItemComponent(item), columnContainer);
    });
});