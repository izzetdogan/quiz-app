import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ShowCategoryComponent } from './pages/admin/show-category/show-category.component';
import { ShowQuestionsComponent } from './pages/admin/show-questions/show-questions.component';
import { ShowQuizComponent } from './pages/admin/show-quiz/show-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GetQuizComponent } from './pages/user/get-quiz/get-quiz.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'category', component: ShowCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quiz', component: ShowQuizComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'quiz/:id', component: UpdateQuizComponent },
      { path: 'show-questions/:id/:title', component: ShowQuestionsComponent },
      { path: 'add-question/:id/:title', component: AddQuestionComponent },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      { path: ':catId', component: GetQuizComponent },
      { path: 'instruction/:id', component: InstructionComponent },
    ],
  },
  { path: 'start/:id', component: StartComponent, canActivate: [NormalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
