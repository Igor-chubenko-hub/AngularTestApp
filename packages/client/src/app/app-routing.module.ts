import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'quiz',
    loadChildren: () => import('./modules/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: '**',
    redirectTo: 'quiz/first-part',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
