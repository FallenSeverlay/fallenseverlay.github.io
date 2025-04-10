import TaskListComponent from '../view/task-list-component.js';
import TaskListColumnComponent from '../view/task-list-column-component.js';
import TaskListItemComponent from '../view/task-list-item-component.js';
import TaskListDeleteButtonComponent from '../view/task-list-delete-button-component.js';
import {Status, StatusLabel} from '../const.js';
import {render} from '../render.js';
import TaskListItemBlankComponent from '../view/task-list-item-blank.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #taskListComponent = new TaskListComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.boardTasks = [...this.#tasksModel.tasks];

        render(this.#taskListComponent, this.#boardContainer);
        for (const [status, label] of Object.entries(StatusLabel)) {
            if (status == Status.BASKET) this.#renderBasketList(status, label);
            else this.#renderTasksList(status, label);
        }
    }

    #renderBlankTask(container) {
        render(new TaskListItemBlankComponent(), container);
    }

    #renderTask(task, container) {
        const taskComponent = new TaskListItemComponent({task});

        render(taskComponent, container);
    }

    #renderTasksList(status, label) {
        const columnComponent = new TaskListColumnComponent(status, label);
        render(columnComponent, this.#taskListComponent.element);
    
        const columnContainer = columnComponent.element.querySelector(`.${status}__inner`);
    
        const filteredTasks = this.boardTasks.filter(task => task.status === status);
    
        if (filteredTasks.length === 0) {
            this.#renderBlankTask(columnContainer);
        } else {
            filteredTasks.forEach(task => {
                this.#renderTask(task, columnContainer);
            });
        }
    }
    

    #renderBasketList(status, label) {
        const columnComponent = new TaskListColumnComponent(status, label);
        render(columnComponent, this.#taskListComponent.element);
    
        const columnContainer = columnComponent.element.querySelector(`.${status}__inner`);
    
        const filteredTasks = this.boardTasks.filter(task => task.status === status);
    
        if (filteredTasks.length === 0) {
            this.#renderBlankTask(columnContainer);
        } else {
            filteredTasks.forEach(task => {
                this.#renderTask(task, columnContainer);
            });
            render(new TaskListDeleteButtonComponent(), columnContainer);
        }
    }
    
}