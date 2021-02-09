import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { DirectionService } from './direction.service';
import { NotificationService } from './notification.service';
import { TaskService } from './task.service';
import { ThemeService } from './theme.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    AuthService,
    DirectionService,
    NotificationService,
    TaskService,
    ThemeService
  ]
})
export class ServicesModule { }
