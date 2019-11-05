import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatboxComponent } from 'src/app/chatbox/chatbox.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/chatbox', pathMatch: 'full' },
  { path: 'chatbox', component: ChatboxComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ChatboxComponent } // If no matching route found, go back to chatbox route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
