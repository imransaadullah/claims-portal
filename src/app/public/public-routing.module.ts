import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from "./components/index/index.component";
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserBoardComponent } from './components/user-board/user-board.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'welcome'
  },
  {
      path: 'welcome',
      component: IndexComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'onboarding',
    component: SignUpComponent
  },
  {
    path: 'userboard',
    component: UserBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
