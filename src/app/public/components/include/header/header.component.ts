import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged_in_user: any = {}; 
  imageUrl = environment.serverUrlEndpoint
  constructor(private storage: StorageService, private router: Router) { 
    this.storage.getItem(environment.userCookieIdentifier).subscribe((e) => {
      this.logged_in_user = JSON.parse(e);
    })
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.storage.removeItem(environment.userCookieIdentifier)
    // this.router.navigateByUrl('/')
  }

}
