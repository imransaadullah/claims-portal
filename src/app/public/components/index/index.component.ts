import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
  }


  setUserType(userType: any): void {
    localStorage.setItem('userType', userType);
    // console.log(userType);
  }

}
