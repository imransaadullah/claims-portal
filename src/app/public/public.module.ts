import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { IndexComponent } from './components/index/index.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserBoardComponent } from './components/user-board/user-board.component';
import { HeaderComponent } from './components/include/header/header.component';
import { MenuComponent } from './components/include/menu/menu.component';
import { FooterComponent } from './components/include/footer/footer.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    IndexComponent,
    AuthComponent,
    SignUpComponent,
    UserBoardComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule
  ]
})
export class PublicModule { }
