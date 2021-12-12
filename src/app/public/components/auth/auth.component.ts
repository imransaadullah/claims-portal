import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from "../../../shared/services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  user: any = {
    policy_no: '',
    password: '',
  }

  processing: boolean = false;

  constructor(public auth: AuthService, private toastr: ToastrService, private router: Router, private storage: StorageService) {
  }

  ngOnInit(): void {
    this.storage.getItem('userType').subscribe(data => {
      if(data){
        this.user['userType'] = data;
      }else{
        this.router.navigateByUrl('/')
      }
    });
  }

  performLogin(): void {
    this.processing = true;
    if (this.user.policy_no && this.user.password){
      // console.log(this.user);
      this.auth.login(this.user, (res: any) => {
        if(res){
          if (!res.error){
            this.storage.setItem(environment.userCookieIdentifier, JSON.stringify(res))
            this.toastr.success(res.message)
            setTimeout(() => {
              this.router.navigateByUrl('userboard')
            }, 3000)
          }else{
            this.toastr.error(res.message)
            this.processing = false;
          }
        }else{
          this.toastr.error('Please check your internet connection and try again', 'Service Error')
          this.processing = false;
        }
      })
    }else{
      this.toastr.error('Enter you account details properly!', 'Error')
      this.processing = false;
    }
  }
}
