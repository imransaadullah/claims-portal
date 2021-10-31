import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { EventsService } from '../../../../shared/services/events.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  @Input() subscription: any;
  patients: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService, private events: EventsService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    }

    this.serverRequest.get("patients/patient/view-by-patient-type/"+this.subscription.PatientTypeID).subscribe((e)=>{
      if (this.patients.length < 1){
          this.patients = e.contentData;
          this.dtTrigger.next();
      }
      else {
        this.patients = e.contentData;
      }
    }, (error)=>{
      this.errorHandler.process(error);
    })

    this.events.getEvent('reload-profiles').subscribe((e)=>{
      if (e != null){
        this.loadPatients();
      }
    })
  }

  loadPatients(): void {
    this.serverRequest.get("patients/patient/view-by-patient-type/"+this.subscription.PatientTypeID).subscribe((e)=>{
      if (this.patients.length < 1){
          this.patients = e.contentData;
          // this.dtTrigger.next();
      }
      else {
        this.patients = e.contentData;
      }
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  ngOnChanges(e: any) {
    this.loadPatients(); 
  }

}
