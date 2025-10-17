import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ProjectTasksComponent } from './pages/project-tasks/project-tasks.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'projects/:projectId/tasks', component: ProjectTasksComponent },
  { path: 'tasks/create/:projectId', component: TaskFormComponent },
  { path: 'tasks/edit/:taskId', component: TaskFormComponent },
  { path: 'notifications', component: HomeComponent },
];
