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

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.boardTasks = [...this.#tasksModel.tasks];

        this.#renderTasks();
    }

    createTask() {
        const taskTitle = document.querySelector('input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('input').value = '';
    }

    #handleModelChange() {
        this.boardTasks = [...this.#tasksModel.tasks];
        this.#clearBoard();
        this.#renderTasks();
    }

    #handleClearBasket() {
        this.#tasksModel.clearTasksByStatus('basket');
    }

    #clearBoard() {
        this.#taskListComponent.element.innerHTML = '';
    }

    #renderTasks() {
        render(this.#taskListComponent, this.#boardContainer);
        for (const [status, label] of Object.entries(StatusLabel)) {

            const columnComponent = new TaskListColumnComponent(status, label, this.#handleTaskDrop.bind(this));
            render(columnComponent, this.#taskListComponent.element);

            const columnContainer = columnComponent.element.querySelector(`.${status}__inner`);

            const filteredTasks = this.boardTasks.filter(task => task.status === status);

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

    #handleTaskDrop(taskId, newStatus, newIndex) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
    }

    #renderBlankTask(container) {
        render(new TaskListItemBlankComponent(), container);
    }

    #renderTask(task, container) {
        const taskComponent = new TaskListItemComponent({task});

        render(taskComponent, container);
    }
}