import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const API_LOGIN_URL = environment.apiurl + '/user/login';

interface User {
    userName: string;
    password: string;
}

@Injectable()
export class AuthService {
    public loggedIn = new BehaviorSubject<boolean>(false);
    constructor(private router: Router, private http: HttpClient) { }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(user: User) {
        if (user.userName !== '' && user.password !== '') {
            console.log(user);
            return this.http.post(API_LOGIN_URL, user);
            // this.router.navigate(['/']);
        }
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}