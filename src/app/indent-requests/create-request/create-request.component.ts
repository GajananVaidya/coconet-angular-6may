import { Component } from '@angular/core';
import { RequestDetailsService } from '../request-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-request',
  styleUrls: ['./create-request.component.scss'],
  templateUrl: './create-request.component.html'
})
export class CreateIndentRequestComponent {
  productNameToggle = false;
  productsData: any;
  productName: any;
  uomVal: any;
  UOMData: any;
  allProductData = [];
  indentQty: any;
  budgetAmt: any;
  deliverBy: any;
  description: any;
  uomName: any;
  productObj: any;
  reason: any;
  userData: any;
  deptId: any;
  addressData: any;
  deliveryAddress: any;
  deliverAtToggle: boolean;
  requiredInToggle: boolean;
  
  requiredInData = [
		{value: '1'},
		{value: '2'},
		{value: '3'},
		{value: '4'},
		{value: '5'},
		{value: '6'},
		{value: '7'},
		{value: '8'},
		{value: '9'},
		{value: '10'},
  ];
  requiredIn: any;
  departmentData: any;
  department: any;
  
  constructor(private requestDetailsService: RequestDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getProductData();
    this.getUOMData();
    this.getCompanyAddress();
    this.getDepartmentData();
  }

  getProductData() {
		this.requestDetailsService.getProductDetails().subscribe(cdata => {
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
				this.productsData = cdata['data'];
				console.log(this.productsData);
			}
		})
  }

  getUOMData() {
		this.requestDetailsService.getUOMDetails().subscribe(cdata => {
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
				this.UOMData = cdata['data'];
        console.log(this.UOMData);
        
        this.getUOMname(this.UOMData[0]._id);
			}
		})
  }
  
  onKey(event: any) {
    if(this.productName.length > 0) {
      this.productNameToggle = true;
    }
    else {
      this.productNameToggle = false;
    }
  }

  onKeyDelivery(event: any) {
    if(this.deliveryAddress.length > 0) {
      this.deliverAtToggle = true;
    }
    else {
      this.deliverAtToggle = false;
    }
  }

  onKeyRequiredIn(event: any) {
    if(this.requiredIn.length > 0) {
      this.requiredInToggle = true;
    }
    else {
      this.requiredInToggle = false;
    }
  }

  getDepartmentData() {
		this.requestDetailsService.getDepartmentDetails().subscribe(cdata => {
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
				this.departmentData = cdata['data'];
				console.log(this.departmentData);
			}
		})
	}

  getCompanyAddress() {
		const user = localStorage.getItem('user');

		if(user) {
			this.userData = JSON.parse(user);
			const companyId = this.userData.user.companyId._id;

			this.deptId = this.userData.user.department._id;

			// this.form.patchValue({
			// 	department: this.deptId
			// })
			// console.log(companyId);

			this.requestDetailsService.getCompanyByToken(companyId).subscribe(cdata => {
				const outputData = cdata['flags'];
				if (outputData.flag == 1) {
					// console.log(cdata['data']);
					this.addressData = cdata['data'].address;
					console.log(this.addressData);
					// this.formCompanyAddress();
				}
			});
		}
  }

  addProduct() {
    if(!this.productObj || !this.uomVal || !this.indentQty) {
      alert('Please enter mandatory fields');
      return;
    }
    this.allProductData.push({
      product : this.productObj,
      uom: this.uomVal,
      reqQty: this.indentQty,
      budgetAmt: this.budgetAmt,
      deliverBy: this.deliverBy,
      description: this.description
    })
    console.log(this.allProductData);
    this.resetFormFields();
  }

  resetFormFields() {
    this.productObj = null;
    this.uomVal = null;
    this.indentQty = null;
    this.productName = null;
    this.budgetAmt = null;
    this.deliverBy = null;
    this.description = null;

    this.getUOMname(this.UOMData[0]._id);
  }

  resetOtherFormFields() {
    this.reason = null;
    this.deliveryAddress = null;
    this.requiredIn = null;
    this.department = null;
  }
  
  selectProduct(item) {
    console.log(item);
    this.productNameToggle = false;
    this.productObj = item;
    this.productName = item.itemName;
  }

  selectDelivery(item) {
    console.log(item);
    this.deliverAtToggle = false;
    this.deliveryAddress = item.type+", "+item.address1+", "+item.address2+", "+item.city+", "+item.pincode;
  }

  selectRequired(item) {
    console.log(item);
    this.requiredInToggle = false;
    this.requiredIn = item.value;
  }

  getUOMname(item) {
    console.log(item);
    const result = this.UOMData.filter(word => word._id == item);
    console.log(result);
    this.uomVal = result[0];
  }

  raiseRequest() {
    let obj = {
      products: this.allProductData,
      reason: this.reason,
      deliveryAddress: this.deliveryAddress,
      requiredIn: this.requiredIn,
      department: this.department
    }

    console.log(obj);

    this.requestDetailsService.createNewIndent(obj).subscribe(cdata => {
			console.log(cdata);
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
        alert(outputData.smsg);
        this.resetFormFields();
        this.resetOtherFormFields();
				this.router.navigateByUrl('/indent-requests/my-requests');
      }
      else {
        alert(outputData.ermsg);
      }
    })
    
  }

}