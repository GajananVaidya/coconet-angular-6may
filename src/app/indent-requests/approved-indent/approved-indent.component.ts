import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestDetailsService } from '../request-details.service';
import { IndentRequest } from '../types';

@Component({
  selector: 'approved-indent',
  templateUrl: './approved-indent.component.html',
  styleUrls: ['../indent-request-list.component.scss']
})
export class ApprovedIndentComponent {
  isCollapsed = false;
  showApproval = false;
  showBid = true;
  reqList: any;
  selectedReq: IndentRequest;
  reqId: any;
  constructor(private router: Router, private cdr: ChangeDetectorRef, private requestDetailsService: RequestDetailsService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.reqList = this.requestDetailsService.getAllRequests();
    // this.reqList = this.requestDetailsService.getMyIndentRequestDetails();
    this.getApprovedRequests();

    this.route.params.subscribe(params => {
      console.log(params['id']);
      if(params['id']) {
        this.reqId = params['id'];
      }
      
    });
  }

  getApprovedRequests() {
    let obj = { status: 'Approved' };
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