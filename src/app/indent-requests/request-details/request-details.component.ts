import { Component, Input, ViewChild } from '@angular/core';
import { RequestDetailsService } from '../request-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class User {
	constructor(public _id: number, public name: string) {}
}

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
  currentIndentId: any;
  vendorList: any;
  selectedItem: any;
  showAttachementModal: boolean;
  addressDetails: any;
  headOfficeLocation: any;
  vendorName: any;
  isLoading: boolean;
  filteredOptions: any;
  chooseVendorforDirectPOForm: FormGroup;
  deliveryAddress: any;
  messageToSeller: any;
  selectedTabName: string = 'sellerDetails';
  data: any;
  companyId: any;
  pastPOData: any;
  
  constructor(private requestDetailsService: RequestDetailsService, private route: ActivatedRoute, private router: Router,
    private modalService: ModalManager, private fb: FormBuilder) { }
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
            this.currentIndentId = this.selectedIndentRequest._id;
          }
        })
      }
    });

    this.chooseVendorforDirectPOForm = this.fb.group({
			name: ['']
    });
    
    this.chooseVendorforDirectPOForm.controls['name'].valueChanges
		.pipe(
			debounceTime(300),
			tap(() => this.isLoading = true),
			switchMap(value => this.requestDetailsService.getMyVendorList({searchName: value, status: 'Active'})
			.pipe(
			  finalize(() => this.isLoading = false),
			  )
			)
		)
    .subscribe(users => this.filteredOptions = users['data']);
    
    this.data = JSON.parse(localStorage.getItem('user'));
		this.companyId = this.data.user.companyId._id;
  }

  displayFn(user: User) {
		if (user) { return user.name; }
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
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    });

    this.getVendorDetails();
  }

  selectItem(item) {
    console.log(item);
    this.selectedItem = item;
    this.setAddress();
  }

  setAddress() {
    this.addressDetails = this.selectedItem.address;
    let headOfficeObj = this.addressDetails.filter(item => item.type == 'Head Office');
    this.headOfficeLocation = headOfficeObj[0];
  }

  getVendorDetails() {
		let obj = { 'request' : this.currentIndentId };
		this.requestDetailsService.getVendorByProductDetails(obj).subscribe(cdata => {
			console.log(cdata['data']);
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
        this.vendorList = cdata['data'];
        for (const element of this.vendorList) {
          element['checked'] = false;
        }
        this.selectedItem = this.vendorList[0];
        this.setAddress();
			}
		},
		error => {
      alert(error);
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

  // openTab(id){
  //   if(id==1){
  //     this.showValue1= 'show active';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'hide';
  //     this.showActive1='active';
  //     this.showActive2='';
  //     this.showActive3='';
  //     this.showActive4='';
  //     this.showActive5='';
  //     this.showActive6='';
  //     this.showActive7='';
  //   }else if(id==2){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'show active';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'hide';
  //     this.showActive1='';
  //     this.showActive2='active';
  //     this.showActive3='';
  //     this.showActive4='';
  //     this.showActive5='';
  //     this.showActive6='';
  //     this.showActive7='';
  //   }else if(id==3){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'show active';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'hide';
  //     this.showActive1='';
  //     this.showActive2='';
  //     this.showActive3='active';
  //     this.showActive4='';
  //     this.showActive5='';
  //     this.showActive6='';
  //     this.showActive7='';
  //   }else if(id==4){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'show active';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'hide';
  //     this.showActive1='';
  //     this.showActive2='';
  //     this.showActive3='';
  //     this.showActive4='active';
  //     this.showActive5='';
  //     this.showActive6='';
  //     this.showActive7='';
  //   }else if(id==5){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'show active';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'hide';
  //     this.showActive1='';
  //     this.showActive2='';
  //     this.showActive3='';
  //     this.showActive4='';
  //     this.showActive5='active';
  //     this.showActive6='';
  //     this.showActive7='';
  //   }else if(id==6){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'show active';
  //     this.showValue7= 'hide';
  //     this.showActive1='';
  //     this.showActive2='';
  //     this.showActive3='';
  //     this.showActive4='';
  //     this.showActive5='';
  //     this.showActive6='active';
  //     this.showActive7='';
  //   }else if(id==7){
  //     this.showValue1= 'hide';
  //     this.showValue2= 'hide';
  //     this.showValue3= 'hide';
  //     this.showValue4= 'hide';
  //     this.showValue5= 'hide';
  //     this.showValue6= 'hide';
  //     this.showValue7= 'show active';
  //     this.showActive1='';
  //     this.showActive2='';
  //     this.showActive3='';
  //     this.showActive4='';
  //     this.showActive5='';
  //     this.showActive6='';
  //     this.showActive7='active';
  //   }
    
  // }
  openTab(tabName) {
    this.selectedTabName = tabName;
    
    switch (tabName) {
      case 'sellerDetails':
          console.log("Seller details");
          break;
      case 'pastPO':
          this.getPastPO();
          break;
    }
  }

  getPastPO() {
    let obj  = {
      seller: this.selectedItem._id,
      buyer: this.companyId
    }

    console.log(obj);

    this.requestDetailsService.getPastPO(obj).subscribe(cdata => {
			console.log(cdata['data']);
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
        this.pastPOData = cdata['data'];
			}
    })
  }

  sendToVendors() {
    let vendorIds = [];
		for (let index = 0; index < this.vendorList.length; index++) {
      const element = this.vendorList[index];
			if(element.checked) {
        vendorIds.push(element._id);
      }
    }
    
    console.log(vendorIds);
    let finalObj = {};
		finalObj['sellers'] = vendorIds;
		finalObj['indentRequest'] = this.currentIndentId;
		finalObj['deliveryAddress'] = this.deliveryAddress;
    finalObj['message'] = this.messageToSeller;
    
    console.log(finalObj);

    this.requestDetailsService.sendToVendors(finalObj).subscribe(cdata => {
			console.log(cdata['data']);
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
        alert('sent to vendor');
        this.messageToSeller = '';
        this.modalRef.close();
			}
    })
    
  }

  chooseVendorforDirectPOFormData() {
		if (this.chooseVendorforDirectPOForm.invalid) {
			return;
		}
    const obj = this.chooseVendorforDirectPOForm.controls['name'].value;
    obj['checked'] = false;
    this.vendorList.push(obj);	
    
    this.chooseVendorforDirectPOForm.setValue({
      name : ''
    })
	}


}