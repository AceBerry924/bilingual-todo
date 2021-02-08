import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit {
  public tasks: any[];

  constructor() { }

  ngOnInit(): void {
    this.tasks = [];
  }

  addTask(task: string) {
    if (task === "") return;
    this.tasks.push({
      text: task,
      done: false
    });
  }
  removeTask(task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  toggleTask(task) {
    task.done = !task.done;
  }
}
