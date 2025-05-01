import TaskListComponent from '../view/task-list-component.js';
import TaskListColumnComponent from '../view/task-list-column-component.js';
import TaskListItemComponent from '../view/task-list-item-component.js';
import TaskListDeleteButtonComponent from '../view/task-list-delete-button-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import {Status, StatusLabel, UserAction} from '../const.js';
import {render} from '../framework/render.js';
import TaskListItemBlankComponent from '../view/task-list-item-blank.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #deleteButtonComponent = null;
    #taskListComponent = new TaskListComponent();
    #loadingComponent = null;

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObservable(this.#handleModelChange.bind(this));
    }

    async init() {
        this.#loadingComponent = new LoadingViewComponent();
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#loadingComponent.element.remove();
        this.#clearBoard();
        this.#renderTasks();
        
    }

    async createTask() {
        const taskTitle = document.querySelector('input').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('input').value = '';
        } catch (err) {
            console.error("Ошибка при создании задачи: ", err);
        }
    }

    #handleModelChange(event) {
        switch(event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderTasks();
                if (this.#deleteButtonComponent) {
                    this.#deleteButtonComponent.toggleDisabled(!this.#tasksModel.hasBasketTasks());
                }
                break;
        }
    }

    async #handleClearBasket() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error("Ошибка при очистке корзины: ", err);
        }
    }

    #clearBoard() {
        this.#loadingComponent.removeElement();
        this.#taskListComponent.element.innerHTML = '';
        
    }

    #renderTasks() {
        render(this.#taskListComponent, this.#boardContainer);
        for (const [status, label] of Object.entries(StatusLabel)) {

            const columnComponent = new TaskListColumnComponent(status, label, this.#handleTaskDrop.bind(this));
            render(columnComponent, this.#taskListComponent.element);

            const columnContainer = columnComponent.element.querySelector(`.${status}__inner`);

            const filteredTasks = this.#tasksModel.tasks.filter(task => task.status === status);

            if (filteredTasks.length === 0) {
                this.#renderBlankTask(columnContainer);
            } else {
                filteredTasks.forEach(task => {
                    this.#renderTask(task, columnContainer);
                });
                if (status == Status.BASKET) {
                    const deleteButtonComponent = new TaskListDeleteButtonComponent();
                    render(deleteButtonComponent, columnContainer);

                    deleteButtonComponent.element.addEventListener('click', () => {
                        this.#handleClearBasket();
                    });
                }
            }
        }
    }

    async #handleTaskDrop(taskId, newStatus, newIndex) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
            this.#handleModelChange(newStatus);
        } catch (err) {
            console.error("Ошибка при обновления статуса задачи: ", err);
        }
    }

    #renderBlankTask(container) {
        render(new TaskListItemBlankComponent(), container);
    }

    #renderTask(task, container) {
        const taskComponent = new TaskListItemComponent({task});

        render(taskComponent, container);
    }
}