import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatApplicationComponent } from '../chat-application/chat-application.component';
import { CreateIndentRequestComponent } from './create-request/create-request.component';
import { IndentRequestListComponent } from './indent-request-list.component';
import { IndentRequestRoutingModule } from './indent-request-list.routing.module';
import { RequestDetailsComponent } from './request-details';
import { RequestDetailsService } from './request-details.service';
import { ForApprovalComponent } from './for-approval/for-approval.component';
import { ApprovedIndentComponent } from './approved-indent/approved-indent.component';
import { RejectedIndentComponent } from './rejected-indent/rejected-indent.component';
import { ModalModule } from 'ngb-modal';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [IndentRequestListComponent, 
        RequestDetailsComponent, 
        CreateIndentRequestComponent, 
        ChatApplicationComponent,
        ForApprovalComponent,
        ApprovedIndentComponent,
        RejectedIndentComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        IndentRequestRoutingModule,
        CommonModule,
        ModalModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ],
    providers: [RequestDetailsService],
})
export class IndentRequestModule { }
