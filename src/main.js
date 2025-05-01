import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TaskApiService from "./tasks-api-service.js";

const END_POINT = "https://680b1f96d5075a76d989e76e.mockapi.io";
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-container');
const todoListContainer = document.querySelector('.todo-list');


const tasksModel = new TasksModel({
    taskApiService: new TaskApiService(END_POINT)
});
const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: todoListContainer,
    tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

render(formAddTaskComponent, formContainer);

tasksBoardPresenter.init();