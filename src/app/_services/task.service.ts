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
  ) { }

  getAll(uid: string): AngularFirestoreCollection<Task> {

    this.tasksRef = this.fireStore.collection(this.dbPath, (ref) =>
      ref.where('userId', '==', uid).orderBy('order'));
    return this.tasksRef;
  }

  add(task: Task): any {
    return this.tasksRef.add({ ...task })
      .catch((err) => this.notification.open(err.message));;
  }

  update(id: string, data: any): Promise<void> {
    return this.tasksRef.doc(id)
      .update(data)
      .catch((err) => this.notification.open(err.message));
  }

  delete(id: string): Promise<void> {
    return this.tasksRef.doc(id)
      .delete()
      .catch((err) => this.notification.open(err.message));;
  }
}
