import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestDetailsService } from '../request-details.service';
import { IndentRequest } from '../types';

@Component({
  selector: 'rejected-indent',
  templateUrl: './rejected-indent.component.html',
  styleUrls: ['../indent-request-list.component.scss']
})
export class RejectedIndentComponent {
  isCollapsed = false;
  showApproval = false;
  reqList: any;
  selectedReq: IndentRequest;
  reqId: any;
  constructor(private router: Router, private cdr: ChangeDetectorRef, private requestDetailsService: RequestDetailsService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.reqList = this.requestDetailsService.getAllRequests();
    // this.reqList = this.requestDetailsService.getMyIndentRequestDetails();
    this.getRejectedRequests();

    this.route.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']) {
        this.reqId = params['id'];
      }
    });
  }

  getRejectedRequests() {
    let obj = { status: 'Reject' };
    this.requestDetailsService.getApprovedRequests(obj).subscribe(cdata => {
			console.log(cdata['data']);
			const outputData = cdata['flags'];
			if (outputData.flag == 1) {
        this.reqList = cdata['data'];
        // console.log(this.reqList);
        this.selectedReq = this.reqList[0];
        console.log(this.selectedReq);

        const result = this.reqList.filter(item => item.requestId == this.reqId);
        console.log(result);
        result[0].selected = true;
			}
			// this.ref.detectChanges();
		})
  }

  selectReq(req: any) {
    console.log(req);
    this.selectedReq.selected = false;

    let windowURL = window.location.href;
    if(windowURL.length > 55) {
      let newURL = windowURL.substr(0, 55);
      window.location.href = newURL + '/' +req.requestId;
    }
    else {
      window.location.href = window.location.href + '/' +req.requestId;
    }

    req.selected = true;
    this.selectedReq = req;
    // this.cdr.detectChanges();
  }
}