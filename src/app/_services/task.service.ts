import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';

import { Task } from '../_models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  dbPath = '/Tasks';
  tasksRef: AngularFirestoreCollection<Task>;

  constructor(
    private fireStore: AngularFirestore,
    private notification: NotificationService
  ) {
    this.tasksRef = fireStore.collection(this.dbPath);
  }

  getAll(uid: string): AngularFirestoreCollection<Task> {

    return this.fireStore.collection(this.dbPath, (ref) =>
      ref.where('userId', '==', uid).orderBy('order'));
  }

  add(task: Task): any {
    return this.tasksRef.add(task)
      .catch((err) => this.notification.open(err.message));
  }

  update(id: string, task: Task): Promise<void> {
    // return this.fireStore.doc(`/Tasks/${task.id}`)
    return this.tasksRef.doc(id)
      .update(task)
      .catch((err) => this.notification.open(err.message));
  }

  delete(id: string): Promise<void> {
    return this.tasksRef.doc(id)
      .delete()
      .catch((err) => this.notification.open(err.message));
  }
}
