import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent {
  isLoading: boolean;
  constructor(private authSvc: AuthService, public router: Router) { }
  form: FormGroup = new FormGroup({
    email: new FormControl('ganesh.avhad@gmail.com', [Validators.required]),
    password: new FormControl('abc123', [Validators.required]),
  });

  @ViewChild('loginform') loginform;
  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authSvc.login(this.form.value)
      .pipe(
				tap(user => {
          this.isLoading = false;
					if (user) {
						const outputData = user['flags'];
						if(outputData.flag == 2) {
              alert('Please enter valid credentials');
              this.loginform.resetForm();
							return;
						}
						localStorage.setItem('user', JSON.stringify(user['data']));
            this.authSvc.loggedIn.next(true);
						// this.loggedIn.next(true);
						this.router.navigate(['/']);
					} else {
						alert('Please enter valid credentials');
					}
				}),
			)
			.subscribe();
      // this.router.navigateByUrl('indent-requests');
    }
  }
}
