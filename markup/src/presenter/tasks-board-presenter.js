import TaskListComponent from '../view/task-list-component.js';
import TaskListColumnComponent from '../view/task-list-column-component.js';
import TaskListItemComponent from '../view/task-list-item-component.js';
import TaskListDeleteButtonComponent from '../view/task-list-delete-button-component.js';
import {Status, StatusLabel} from '../const.js';
import {render} from '../render.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #taskListComponent = new TaskListComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#taskListComponent, this.#boardContainer);
        for (const [status, label] of Object.entries(StatusLabel)) {
            const columnComponent = new TaskListColumnComponent(status, label);
            render(columnComponent, this.#taskListComponent.getElement());

            const columnContainer = columnComponent.getElement().querySelector('.' + columnComponent.className + '__inner');
            for (let j = 0; j < this.boardTasks.length; j++) {
                if (this.boardTasks[j].status == status)
                {
                    const taskComponent = new TaskListItemComponent({task: this.boardTasks[j]});
                    render(taskComponent, columnContainer);
                }
            }

            if (status == Status.BASKET) 
            {
                render(new TaskListDeleteButtonComponent(), columnContainer);
            }
        }
    }
}