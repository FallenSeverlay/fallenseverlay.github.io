import {tasks} from '../mock/task.js';
import {generateID} from '../utils.js'

export default class TaskModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID()
        };

        this.#boardtasks.push(newTask);

        this._notifyObservers();
        return newTask;
    }

    updateTaskStatus(taskId, newStatus, newIndex = null) {
        const oldIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        if (oldIndex === -1) {
          return;
        }

        const [task] = this.#boardtasks.splice(oldIndex, 1);
        task.status = newStatus;
    
        if (typeof newIndex === 'number') {
          const statusIndices = this.#boardtasks
            .map((t, idx) => t.status === newStatus ? idx : -1)
            .filter(idx => idx !== -1);
    
          let insertAt;
          if (statusIndices.length === 0) {
            insertAt = this.#boardtasks.length;
          } else if (newIndex >= statusIndices.length) {
            insertAt = statusIndices[statusIndices.length - 1] + 1;
          } else {
            insertAt = statusIndices[newIndex];
          }
    
          this.#boardtasks.splice(insertAt, 0, task);
        } else {
          this.#boardtasks.push(task);
        }
    
        this._notifyObservers();
    }

    clearTasksByStatus(status) {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== status);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver() {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}