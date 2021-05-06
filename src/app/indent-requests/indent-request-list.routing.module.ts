import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { CreateIndentRequestComponent } from './create-request';
import { IndentRequestListComponent } from './indent-request-list.component';
import { RequestDetailsService } from './request-details.service';
import { ForApprovalComponent } from './for-approval';
import { ApprovedIndentComponent } from './approved-indent/approved-indent.component';
import { RejectedIndentComponent } from './rejected-indent/rejected-indent.component';
const routes: Routes = [ 
  { path: '', redirectTo: 'my-requests', pathMatch: 'full' },
  {
    path: 'my-requests',
    pathMatch: 'full',
    component: IndentRequestListComponent
  },
  {
    path: 'my-requests/:id',
    component: IndentRequestListComponent
  },
  {
    path: 'create',
    component: CreateIndentRequestComponent
  },
  {
    path: 'for-approval',
    component: ForApprovalComponent
  },
  {
    path: 'for-approval/:id',
    component: ForApprovalComponent
  },
  {
    path: 'approved-requests',
    component: ApprovedIndentComponent
  },
  {
    path: 'approved-requests/:id',
    component: ApprovedIndentComponent
  },
  {
    path: 'rejected-requests',
    component: RejectedIndentComponent
  },
  {
    path: 'rejected-requests/:id',
    component: RejectedIndentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  providers: [RequestDetailsService],
  exports: [RouterModule]
})
export class IndentRequestRoutingModule { }
