import { Component, Input } from '@angular/core';
import { IndentRequest } from '../types';
import { RequestDetailsService } from '../request-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'request-details',
  styleUrls: ['./request-details.component.scss'],
  templateUrl: './request-details.component.html'
})
export class RequestDetailsComponent {
  // @Input() selectedIndentRequest: IndentRequest;
  @Input() showApproval;
  reqStatus = "approve";
  loading = true;
  isInfo = false;
  comments: any;
  selectedIndentRequest : any;
  reqId: any;
  constructor(private requestDetailsService: RequestDetailsService, private route: ActivatedRoute, private router: Router) { }
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
}