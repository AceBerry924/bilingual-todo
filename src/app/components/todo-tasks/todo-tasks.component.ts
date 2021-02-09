import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
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
  tasks: Task[];

  constructor(
    private auth: AuthService,
    private taskService: TaskService,
    public translate: TranslateService,
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
            });
          })
        ).subscribe(data => {
          this.tasks = data;
        });
      }
    });
  }

  addTask(title: string): void {
    if (title === '') {
      return;
    }

    const { length: l, [l - 1]: last } = this.tasks;


    const data: Task = {
      id: this.angularFireStore.createId(),
      title,
      done: false,
      userId: this.user.uid,
      order: Math.max(last?.order + 1 || 0, this.tasks.length),
    };

    this.taskService.add(data);
  }

  toggleTask(task: Task): void {
    const data = {
      done: task.done,
    };

    this.taskService.update(task.id, data);
  }

  removeTask(task): void {
    this.taskService.delete(task.id);
  }


  drop(event: CdkDragDrop<string[]>): any {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    const closeToEnd = event.currentIndex >= this.tasks.length / 2;
    if (closeToEnd) {
      this.updateOrder(0, event.currentIndex + 1);
    } else {
      this.updateOrder(event.currentIndex, this.tasks.length);
    }
  }

  updateOrder(startIndex: number, endIndex: number): void {
    for (let i = startIndex; i < endIndex; i++) {
      const data = {
        order: i
      };
      this.taskService.update(this.tasks[i]?.id, data);
    }
  }
}
