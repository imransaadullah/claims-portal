import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approval-requests',
  templateUrl: './approval-requests.component.html',
  styleUrls: ['./approval-requests.component.css']
})
export class ApprovalRequestsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() selectedClaimOutput = new EventEmitter<any>();

  selectedClaim: any;
  modal: any;

  claims: any = [
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'},
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'},
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'},
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'},
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'}
  ]

  data: any = [
    {'Dose': 1, 'Service': 'Specialist Initial Consultation	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Antenatal Care	','Cost': '5,000'},
    {'Dose': 1, 'Service': 'Aspirations/Paracentesis	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Aspirations/Paracentesis	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Echocardiography	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Echocardiography	','Cost': '3,000'},
    {'Dose': 1, 'Service': 'Gastric Lavage	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Gastric Lavage	','Cost': '1,000'},
    {'Dose': 1, 'Service': 'Lumbar Puncture	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Lumbar Puncture	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Comprehensive Psychiatric Assessment	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Psychometric Assessment, Scoring & Interpretation	','Cost': '2,000'},
    {'Dose': 1, 'Service': 'Behaviour Modifications	','Cost': '2,000'}
  ]

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  

  setSelectedClaim() {
    this.selectedClaimOutput.emit(this.selectedClaim);
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  approveClaim():  any {
    return;
  }

  rejectClaim(): any {
    return
  }

  getClaimDetail(claim: any): void {
    return this.data;
  }
}
