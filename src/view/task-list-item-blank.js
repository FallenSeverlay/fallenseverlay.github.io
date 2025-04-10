import { AbstractComponent } from "./abstract-component.js";


function createTaskListItemBlankComponentTemplate() {
    return (
        `<li class="item-blank">
          <span class="task-title">Перетащите карточку</span>
        </li>`
      );
}


export default class TaskListItemBlankComponent extends AbstractComponent {
  get template() {
    return createTaskListItemBlankComponentTemplate();
  }
}