import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; 
import { ToastrService } from 'ngx-toastr';
import { ServerRequestService } from 'src/app/shared/services/server-request.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  newProfile: any = {};
  newDependent: any = {};
  addPrincipal: boolean = false;
  processingProfile: boolean = false;
  addDependents: boolean =false;
  statuses: any = ['single', 'married'];

  pic_file_data: any;
  id_file_data: any;

  form = new FormData()

  c_user: any;
  principal_user: any;

  number_of_dependents: number = 0;
  dependents: any = [];

  idReady = false;
  picReady = false;

  providers = [
    {
      id: '',
      name:'',
      state: '',
      city: '',
      address: '',
      plan_type: ''
    },
  ];

  picUrl: SafeUrl = '';
  idUrl: SafeUrl = '';

  environment = environment;

  addFacility: any = {};
  // showAdditonalFacility = false

  constructor(private storage: StorageService, private toastr: ToastrService, private request: ServerRequestService, private sanitizer:DomSanitizer) { 
    this.setPreqData();
  }

  ngOnInit(): void {
    
  }

  setPreqData(): void {
    this.storage.getItem(environment.userCookieIdentifier).subscribe(e => {
      this.c_user = JSON.parse(e);
    })

    this.request.post('?getPrincipal', {'policy_no': this.c_user.policy_no}).subscribe(e => {
      if(e && !e.error){
        this.principal_user = e.data;
        // console.log(this.principal_user)
        this.addPrincipal = false;
      }
      // console.log(e)
    })

    this.request.post('?getDependents', {'policy_no': this.c_user.policy_no}).subscribe(e => {
      // if(e){
      this.dependents = e
      console.log(e)
        // return;
      // }
    })
  }

  saveNewProfile(): void {
    this.setPreqData();
    if(this.newProfile){
      this.newProfile.policy_no = this.c_user.policy_no
      this.newProfile.insurance_package = this.c_user.insurance_package
      this.newProfile.insurance_no = `${this.newProfile.policy_no.substring(0, this.newProfile.policy_no.length -2)}10` 
      this.form.append("data", JSON.stringify(this.newProfile))
      this.request.post('?save-new-profile', this.form).subscribe(e => {
        if(!e.error){
          this.principal_user = e
          this.toastr.success(e.message)
          this.form = new FormData()
          this.newProfile = {};
          this.addPrincipal = false;
          this.picReady = false;
          this.idReady = false
          this.picUrl = ''
          this.idUrl = ''
        }else{
          this.toastr.error(e.message)
        }
      });
    }else{
      this.toastr.error("Please fill out the form")
    }
  }

  saveNewDependent(): void {
    this.setPreqData();
    if(this.newDependent){
      this.newDependent.policy_no = this.c_user.policy_no;
      // console.log(this.principal_user.insurance_no.length)
      // console.log(this.dependents)
      if (this.principal_user){
        this.newDependent.insurance_no = `${this.principal_user.insurance_no.substring(0, this.principal_user.insurance_no.length-2)}2${this.dependents.length}`
        this.form.append('data', JSON.stringify(this.newDependent))
        // console.log(this.newDependent)
        this.request.post('?save-dependent-profile', this.form).subscribe(e => {
          if(e && !e.error){
            this.number_of_dependents += 1;
            this.toastr.success(e.message);
            this.addDependents = false;
            this.form = new FormData();
            this.newDependent = {};
            this.request.post('?getDependents', this.form).subscribe(e => {
              // console.log(e.data)
              this.dependents = e.data
            })
            this.picReady = false;
            this.idReady = false
          }else{
            this.toastr.error(e.message)
          }
        })
      }else{
        this.toastr.error('This account has no principal user', 'User Error!')
      }  
    }else{
      this.toastr.error("Please fill out the form")
    }
    this.setPreqData();
  }

  loadImage(event: any, what: string): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      //get file information such as name, size and type
      console.log('finfo',file.name,file.size,file.type);
      //max file size is 4 mb
      if((file.size/1048576)<=10 && !(file.type.indexOf('image') < 0))
      {
        this.form.append(`${what}_file`, file, file.name);
        if(what == 'pic'){
          this.picUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
          this.picReady = true
        }else if(what == 'id'){
          this.idUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
          this.idReady = true
        }
        
      }else{
        this.toastr.error('File size exceeds 4 MB. Please choose less than 4 MB','Image Error');
      }
    }
  }

  loadProviders(flag = 1): void {
    const data = (flag)? this.newDependent.state : this.newProfile.state;
    const plan_type = this.c_user.insurance_package
    console.log({'state': data, 'plan_type': plan_type});
    this.request.post('?getProviders', {'state': data, 'plan_type': plan_type}).subscribe(e => {
      this.providers = e;
      console.log(e)
    })
  }

  saveFacility(): void {
    // console.log(this.addFacility);
    if(this.newDependent){
      this.newDependent.primary_health_facility = this.newDependent.secondary_health_facility = this.addFacility['name'];
    }else if(this.newProfile){
      this.newProfile.primary_health_facility = this.newProfile.secondary_health_facility = this.addFacility['name'];
    }
    this.request.post('?saveProvider', this.addFacility).subscribe(e => {
      if(e.data){
        // this.showAdditonalFacility = false;
        document.getElementById('close')?.click();
        if(!this.providers[0].name){
          this.providers.pop();
        }
        this.providers.push(this.addFacility);
      }else{
        this.toastr.error('An Error Occured while trying to add')
      }
    })
  }
}
