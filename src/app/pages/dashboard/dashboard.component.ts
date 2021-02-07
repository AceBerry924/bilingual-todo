import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
