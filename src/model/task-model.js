import { generateID } from '../utils.js'
import { UpdateType, UserAction } from '../const.js'
import Observable from '../framework/observable.js'

export default class TaskModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({taskApiService}) {
      super();
      this.#tasksApiService = taskApiService;
    }

    async init() {
      try {
        const tasks = await this.#tasksApiService.tasks;
        this.#boardtasks = tasks;
      } catch(err) {
        this.#boardtasks = [];
      }
      this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID()
        };
        try {
          const createdTask = await this.#tasksApiService.addTask(newTask);
          this.#boardtasks.push(createdTask);
          this._notify(UserAction.ADD_TASK, createdTask);
          return createdTask;
        } catch (err) {
          console.error('Ошибка при добавлении задачи на сервер:', err);
          throw err;
        }
    }

    hasBasketTasks() {
      return this.#boardtasks.some(task => task.status === "basket");
    }

    async updateTaskStatus(taskId, newStatus, newIndex = null) {
      const task = this.#boardtasks.find(t => t.id === taskId);
      if (!task) {
        return;
      }
  
      const previousStatus = task.status;
      const previousIndex = this.#boardtasks.indexOf(task);
  
      this.#boardtasks.splice(previousIndex, 1);
  
      task.status = newStatus;
  
      let insertIndex;
      if (newIndex !== null) {
        const statusIndices = this.#boardtasks
          .map((t, i) => t.status === newStatus ? i : -1)
          .filter(i => i !== -1);
  
        if (statusIndices.length === 0) {
          insertIndex = this.#boardtasks.length;
        } else if (newIndex >= statusIndices.length) {
          insertIndex = statusIndices[statusIndices.length - 1] + 1;
        } else {
          insertIndex = statusIndices[newIndex];
        }
      } else {
        insertIndex = this.#boardtasks.length;
      }

      this.#boardtasks.splice(insertIndex, 0, task);
  
      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        task.status = previousStatus;
        const currentIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        this.#boardtasks.splice(currentIndex, 1);
        this.#boardtasks.splice(previousIndex, 0, task);
        console.error("Ошибка при обновлении статуса задачи: ", err);
        throw err;
      }
    }

    deleteTask(taskId) {
      this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
      this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async clearBasketTasks() {
      const basketTasks = this.#boardtasks.filter(task => task.status === "basket");

      try {
        await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

        this.#boardtasks = this.#boardtasks.filter(task => task.status !== "basket");
        this._notify(UserAction.DELETE_TASK, { status: "basket" });
      } catch (err) {
        console.error("Ошибка при удалении задачи из корзины на сервере: ", err);
        throw err;
      }
    }
}