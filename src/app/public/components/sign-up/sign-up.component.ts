import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css',
    './css/fonts/material-icon/css/material-design-iconic-font.css',
    "./css/style.css",
    "./css/new_style.css"
  ]
})
export class SignUpComponent implements OnInit {
  user: any = {
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    social_no: "",
    insurance_package: "",
    enrolee_size: "",
    disclaimer: 0
  } 

  processing = false;
  confirm_password: String = "";
  confirmPhone:  String = "";
  confirmEmail: String = "";
  organisational = false;
  selectedPlan = '';
  validateOk = false;
  // hasAgreed = false;


  constructor(private http: HttpClient, private auth: AuthService, private toastr: ToastrService, private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
  }

  generate_policy_no(): void {
    const phone: String = this.user.phone;
    const policy_no: String = phone.substr(1) + "01";
    this.user.policy_no = policy_no;

  }

  registerUser(): any {
    this.processing =true;
    this.generate_policy_no()
    // console.log(this.user)
    this.auth.registerUser(this.user, (res: any) => {
      if(res){
        if (!res.error){
          this.toastr.success(res.message)
          this.storage.setItem(environment.userCookieIdentifier, JSON.stringify(res))
            this.toastr.info('Account Registration Succeeded!')
            this.toastr.success(res.message)
            setTimeout(() => {
              this.router.navigateByUrl('userboard')
            }, 3000)
        }else{
          this.toastr.error(res.message)
        }
      }else{
        this.toastr.error('Please check your internet connection and try again', 'Service Error')
      }
    })
  }
    
  changeMode(event:any):void {
    this.organisational = event.path[0].options.selectedIndex
  }

  onsubmit(evt: any):void {
    evt.preventDefault();
  }

  validate(): any {
    if(this.user.category){
      if(this.user.category == 'corporate'){
        if(!this.user.social_no){
          this.toastr.error('Please enter your organisational code', 'organisational code error')
          return false
        }
      }
    }else{
      this.toastr.error('Select an account category.', 'Category Error')
      return false
    }
    
    if(!this.user.enrolee_size){
      this.toastr.error('Please select your Family size', 'Family Size error')
      return false
    }
    
    if(!this.user.name){
      this.toastr.error('Please Enter your name', 'Name Error')
      return false
    }
    
    if(!this.user.phone){
      this.toastr.error('Phone Cannnot be empty!', 'Confirm Phone Error')
      return false
    }
    
    if(!this.confirmPhone){
      this.toastr.error('Phone Confirmation Cannnot be empty!', 'Confirm Phone Error')
      return false
    }

    if (this.user.phone != this.confirmPhone){
      this.toastr.error('Phone must match!', 'Phone Match Error')
      return false
    }

    const phone_re = new RegExp('0[(?=9|8|7)]{1}[(?=0|1)]{1}[0-9]{8}')
    if(!phone_re.test(this.user.phone)){
      this.toastr.error('Invalid Phone Number Supplied!', 'Phone Error')
      return false
    }

    if(!this.user.email){
      this.toastr.error('Email Cannot be empty', 'Email Error')
       return false
    }

    if(this.user.email != this.confirmEmail){
      this.toastr.error('Confirm Email is the same as the mail entered above it.', 'Email Error')
       return false
    }

    const email_re = new RegExp('[aA0-zZ9]+[.]*[aA0-zZ9]*@(yahoo|outlook|live|hotmail|gmail|icloud|jaizbankplc)[.]{1}com')
    if(!email_re.test(this.user.email)){
      this.toastr.error('The email supplied is not valid', 'Email Error')
      return false
    }

    if(!this.user.password){
      this.toastr.error('Password Cannnot be empty!', 'Password Error')
      return false
    }

    if(!this.confirm_password){
      this.toastr.error('Password Confirmation Cannnot be empty!', 'Confirm Password Error')
      return false
    }

    if (this.user.password != this.confirm_password){
      this.toastr.error('Password must match!', 'Password Match Error')
      return false
    }

    return true
  }
}
