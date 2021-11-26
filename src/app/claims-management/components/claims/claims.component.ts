import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  viewApprovalRequests: any;
  selectedClaim: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  log(x: any): void {
    console.log(x);
  }

  // toggleClaimList(): void {
  //   const claimsList: any = document.getElementById('claimsList');
  //   const claimDetail: any = document.getElementById('claimDetail');
  //   if(claimsList.style.display != 'none'){
  //     this.claimDisplayType = claimsList?.style.display;
  //     claimsList.style.display = 'none';
      
  //     claimDetail.classList.remove('col-7')
  //     claimDetail.classList.add('col-12')
  //   }else{
  //     claimsList.style.display = this.claimDisplayType;
  //     this.claimDisplayType = '';

  //     claimDetail.classList.add('col-7')
  //     claimDetail.classList.remove('col-12')
  //   }
  //   this.togglerChange();
  // }

  // togglerChange(): void {
  //   const toggler: any = document.getElementById('toggler');
  //   if(toggler.classList.contains('text-danger')){
  //     toggler.classList.add('text-info');
  //     toggler.classList.remove('text-danger');
  //   }else{
  //     toggler.classList.remove('text-info');
  //     toggler.classList.add('text-danger');
  //   }

  //   // if(claimDetail.classList.contains('col-7')){
  //   //   console.log(claimDetail.classList)
  //   // }else{
  //   //   console.log('Blah')
  //   // }

  // }

  clearSelections(): void {
    this.viewApprovalRequests = false
    this.selectedClaim = null;
    const toggler: any = document.getElementById('toggler');
    toggler.style.display = 'none';
  }

  getSelectedClaim(data: any){
    this.selectedClaim = data;

    // const toggler: any = document.getElementById('toggler');
    // toggler.style.display = 'block'
    
    // this.toggleClaimList()
  }
}
