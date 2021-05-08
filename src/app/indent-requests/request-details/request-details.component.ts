import { Component, Input, ViewChild } from '@angular/core';
import { RequestDetailsService } from '../request-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'request-details',
  styleUrls: ['./request-details.component.scss'],
  templateUrl: './request-details.component.html'
})
export class RequestDetailsComponent {
  // @Input() selectedIndentRequest: IndentRequest;
  @Input() showApproval;
  @Input() showBid;
  reqStatus = "approve";
  loading = true;
  isInfo = false;
  comments: any;
  selectedIndentRequest : any;
  reqId: any;
  @ViewChild('myModal') myModal;
  @ViewChild('fileModal') fileModal;
  private modalRef;
  showValue1='show active';showValue2='hide';showValue3='hide';showValue4='hide';showValue5='hide';showValue6='hide';showValue7='hide';
  showActive1='active'; showActive2='';showActive3='';showActive4='';showActive5='';showActive6='';showActive7='';
  isLocationInfo=false;
  modalRef1: any;
  constructor(private requestDetailsService: RequestDetailsService, private route: ActivatedRoute, private router: Router,
    private modalService: ModalManager) { }
  showInfo(event: MouseEvent) {
    this.isInfo = true;
    let left = event.pageX + 15;
    let top = event.pageY - 34;
    document.getElementById("desc-tooltip1").style.top = top + "px";
    document.getElementById("desc-tooltip1").style.left = left + "px";
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']) {
        this.reqId = params['id'];
        let obj = { requestId: this.reqId };

        this.requestDetailsService.getApprovedRequests(obj).subscribe(cdata => {
          console.log(cdata['data']);
          const outputData = cdata['flags'];
          if (outputData.flag == 1) {
            this.selectedIndentRequest = cdata['data'][0];
          }
        })
      }
    });
  }

  resetFormFields() {
    this.comments = '';
  }

  submitComment() {
    let finalObj = {};
    finalObj['_id'] = this.selectedIndentRequest._id;
		finalObj['comment'] = this.comments;
		finalObj['products'] = this.selectedIndentRequest.products;

		console.log(finalObj);
    if(this.reqStatus == 'approve') {
      this.requestDetailsService.approveIndentRequest(finalObj).subscribe(cdata => {
        console.log(cdata['data']);
        const outputData = cdata['flags'];
        if (outputData.flag == 1) {
          alert(outputData.smsg);
          this.resetFormFields();
          this.router.navigateByUrl('/indent-requests/approved-requests/' + this.reqId);
        }
        else {
          alert(outputData.ermsg);
        }
      })
    }
    else {
      this.requestDetailsService.rejectIndentRequest(finalObj).subscribe(cdata => {
        console.log(cdata['data']);
        const outputData = cdata['flags'];
        if (outputData.flag == 1) {
          alert(outputData.smsg);
          this.resetFormFields();
          this.router.navigateByUrl('/indent-requests/rejected-requests/' + this.reqId);
        }
        else {
          alert(outputData.ermsg);
        }
      })
    }
  }

  openBidModal(){
    this.modalRef = this.modalService.open(this.myModal, {
      size: "xl",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    });
  }

  openFileModal(){
    this.modalRef1 = this.modalService.open(this.fileModal, {
      size: "md",
      modalClass: 'fileModal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    });
  }

  closeModal(){
    this.modalService.close(this.modalRef);
  }

  showLocation(){
    this.isLocationInfo=true;
  }

  openTab(id){
    if(id==1){
      this.showValue1= 'show active';
      this.showValue2= 'hide';
      this.showValue3= 'hide';
      this.showValue4= 'hide';
      this.showValue5= 'hide';
      this.showValue6= 'hide';
      this.showValue7= 'hide';
      this.showActive1='active';
      this.showActive2='';
      this.showActive3='';
      this.showActive4='';
      this.showActive5='';
      this.showActive6='';
      this.showActive7='';
    }else if(id==2){
      this.showValue1= 'hide';
      this.showValue2= 'show active';
      this.showValue3= 'hide';
      this.showValue4= 'hide';
      this.showValue5= 'hide';
      this.showValue6= 'hide';
      this.showValue7= 'hide';
      this.showActive1='';
      this.showActive2='active';
      this.showActive3='';
      this.showActive4='';
      this.showActive5='';
      this.showActive6='';
      this.showActive7='';
    }else if(id==3){
      this.showValue1= 'hide';
      this.showValue2= 'hide';
      this.showValue3= 'show active';
      this.showValue4= 'hide';
      this.showValue5= 'hide';
      this.showValue6= 'hide';
      this.showValue7= 'hide';
      this.showActive1='';
      this.showActive2='';
      this.showActive3='active';
      this.showActive4='';
      this.showActive5='';
      this.showActive6='';
      this.showActive7='';
    }else if(id==4){
      this.showValue1= 'hide';
      this.showValue2= 'hide';
      this.showValue3= 'hide';
      this.showValue4= 'show active';
      this.showValue5= 'hide';
      this.showValue6= 'hide';
      this.showValue7= 'hide';
      this.showActive1='';
      this.showActive2='';
      this.showActive3='';
      this.showActive4='active';
      this.showActive5='';
      this.showActive6='';
      this.showActive7='';
    }else if(id==5){
      this.showValue1= 'hide';
      this.showValue2= 'hide';
      this.showValue3= 'hide';
      this.showValue4= 'hide';
      this.showValue5= 'show active';
      this.showValue6= 'hide';
      this.showValue7= 'hide';
      this.showActive1='';
      this.showActive2='';
      this.showActive3='';
      this.showActive4='';
      this.showActive5='active';
      this.showActive6='';
      this.showActive7='';
    }else if(id==6){
      this.showValue1= 'hide';
      this.showValue2= 'hide';
      this.showValue3= 'hide';
      this.showValue4= 'hide';
      this.showValue5= 'hide';
      this.showValue6= 'show active';
      this.showValue7= 'hide';
      this.showActive1='';
      this.showActive2='';
      this.showActive3='';
      this.showActive4='';
      this.showActive5='';
      this.showActive6='active';
      this.showActive7='';
    }else if(id==7){
      this.showValue1= 'hide';
      this.showValue2= 'hide';
      this.showValue3= 'hide';
      this.showValue4= 'hide';
      this.showValue5= 'hide';
      this.showValue6= 'hide';
      this.showValue7= 'show active';
      this.showActive1='';
      this.showActive2='';
      this.showActive3='';
      this.showActive4='';
      this.showActive5='';
      this.showActive6='';
      this.showActive7='active';
    }
    
  }



}