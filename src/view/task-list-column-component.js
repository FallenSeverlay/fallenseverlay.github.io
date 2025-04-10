import { AbstractComponent } from "./abstract-component.js";


function createTaskListColumnComponentTemplate(className, title) {
    return (
        `<li class="${className} column">
					<span class="title">${title}</span>
					<ul class="${className}__inner">
					</ul>
				</li>`
      );
}


export default class TaskListColumnComponent extends AbstractComponent {
  constructor(className, title) {
    super();
    this.className = className;
    this.title = title;
  }

  get template() {
    return createTaskListColumnComponentTemplate(this.className, this.title);
  }
}