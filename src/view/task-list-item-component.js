import { AbstractComponent } from "./abstract-component.js";


function createTaskListItemComponentTemplate(task) {
  const {title} = task;
    return (
        `<li class="item">
          <span class="task-title">${title}</span>
          <button aria-label="Изменить" class="task-edit-button" type="button" title="Изменить">✏️</button>
        </li>`
      );
}


export default class TaskListItemComponent extends AbstractComponent {
  constructor({task}) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskListItemComponentTemplate(this.task);
  }
}