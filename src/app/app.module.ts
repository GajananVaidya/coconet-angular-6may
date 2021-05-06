import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService, AuthService } from './service';
import { LeftMenuComponent } from './left-menu';
import { HeaderComponent } from './header';
import { SharedModule } from './shared';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login';
import { HttpClientModule } from '@angular/common/http';

const CommonModules = [
  MatButtonModule,
  MatIconModule,
  MatTreeModule,
  RouterModule,
  MatMenuModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  BrowserAnimationsModule
]
@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    LoginFormComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
