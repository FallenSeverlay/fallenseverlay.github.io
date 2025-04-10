import { AbstractComponent } from "./abstract-component.js";


function createTaskListItemComponentTemplate() {
    return (
        `<ul class="columns"></ul>`
      );
}


export default class TaskListItemComponent extends AbstractComponent {
  get template() {
    return createTaskListItemComponentTemplate();
  }
}