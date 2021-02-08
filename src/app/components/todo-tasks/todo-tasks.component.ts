import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { User } from 'src/app/_models/user.model';
import { Task } from 'src/app/_models/task.model';
import { AuthService } from 'src/app/_services/auth.service';
import { TaskService } from 'src/app/_services/task.service';


@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit {
  user: User;
  tasks: Task[] = [];

  constructor(
    private auth: AuthService,
    private taskService: TaskService,
    private angularFireStore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;

        this.taskService.getAll(this.user.uid).valueChanges().pipe(
          map(res => {
            return Object.keys(res).map(x => {
              const output = res[x];
              output._key = x;
              return output;
            })
          })
        ).subscribe(data => {
          this.tasks = data;
          console.log(this.tasks);
        });
      }
    });
  }

  addTask(title: string): void {
    if (title === "") return;

    const data: Task = {
      id: this.angularFireStore.createId(),
      title: title,
      done: false,
      userId: this.user.uid,
      order: this.tasks.length,
    };

    this.taskService.add(data);
  }

  toggleTask(task: Task): void {
    const data = {
      id: task.id,
      userId: task.userId,
      order: task.order,
      title: task.title,
      done: !task.done,
    };

    this.taskService.update(task.id, data);
  }

  removeTask(task): void {
    this.taskService.delete(task.id);
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
