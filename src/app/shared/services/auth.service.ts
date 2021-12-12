import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from './storage.service';
import { ServerRequestService } from './server-request.service';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService, private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService) { }

  public isAuthenticated(): boolean {
    let resp: boolean = false;
    this.storage.getItem(environment.userCookieIdentifier).subscribe(data => {
      const userInfo: any = JSON.parse(data);
      if (userInfo != null && userInfo.token != null){ // @todo also maybe check if is valid token?
        resp = true;
      }
    })

    return resp;
  }

  public authenticate(loginData: any, successCallback: any = false, errorCallback: any = false): Subscription {
    const loginPromise = this.serverRequest.post("login", {
      username: loginData.username,
      password: loginData.password
    });
    
    const subscription = loginPromise.subscribe((e)=>{
      const resp = e.contentData;
      if (resp.status){
        const responseObject: any = {
          uuid: resp.uuid,
          accountActivated: resp.accountActivated,
          staffid: resp.id,
          username: loginData.username,
          token: resp.token,
          businessInfo: resp.business
        };

        if (typeof resp.business == "undefined"){
          this.serverRequest.get("read-resource?url=business-info").subscribe((resource)=>{
            responseObject.businessInfo = JSON.parse(JSON.stringify(resource.contentData));
            this.storage.setItem(environment.userCookieIdentifier, JSON.stringify(responseObject));
          }, (error)=>{
            this.errorHandler.process(error);
          })
        }
        else {
          this.storage.setItem(environment.userCookieIdentifier, JSON.stringify(responseObject));
        }
      }

      if (successCallback){
        successCallback(resp);
      }
    }, (error)=>{
      this.errorHandler.process(error);
      if (errorCallback){
        errorCallback();
      }
    });

    return subscription;
  }

  public login(loginData: any, successCallback: any = false, errorCallback: any = false): Subscription {
    const loginPromise = this.serverRequest.post("?login", loginData);
    const subscription = loginPromise.subscribe((e)=>{
      if (successCallback){
        // console.log(e)
        successCallback(e);
      }
      // console.log(e)
    });

    return subscription;
  }

  public registerUser(userData: any, successCallback: any = false, errorCallback: any = false): Subscription {
    const registerPromise = this.serverRequest.post("?regUser", userData)
    const subscription = registerPromise.subscribe((e) => {
      if (successCallback){
        successCallback(e);
      }
      
    });

    return subscription;
  }
}
