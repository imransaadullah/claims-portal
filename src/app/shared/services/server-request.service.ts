import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServerRequestService {
  private token: any = "";
  private serverUrlEndpoint = environment.serverUrlEndpoint;

  constructor(private http: HttpClient, private storage: StorageService) { 
    this.storage.getItem(environment.userCookieIdentifier).subscribe(data => {
      const userInfo: any = JSON.parse(data);
      if (userInfo != null && userInfo.jwt != null){
        this.token = userInfo.jwt;
      }
    });
  }

  get(url: any): Observable<any> {
    return this.http.get<any>(this.serverUrlEndpoint+url, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
  }

  post(url: any, data: any): Observable<any> {
    return this.http.post<any>(this.serverUrlEndpoint+url, data, {
      headers: new HttpHeaders().set('Authorization', this.token),
    });
  }
}
