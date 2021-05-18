import { Injectable } from '@angular/core';
import { IndentRequestList } from './mock-data';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const getMyIndentRequestURL = environment.apiurl + "/indent-request/my-request";
const indentRequestForApprovalURL = environment.apiurl + "/indent-request/for-approval";
const approvedIndentRequestURL = environment.apiurl + "/indent-request/search";
const approveIndentRequestURL = environment.apiurl + "/indent-request/approve-indent";
const getProductsURL = environment.apiurl + "/product/search";
const getUOMURL = environment.apiurl + "/uom/search/";
const getCompanyURL = environment.apiurl + "/company/read/";
const getDepartmentURL = environment.apiurl + "/department/search/";
const createIndentURL = environment.apiurl + "/indent-request/create";
const rejectIndentRequestURL = environment.apiurl + "/indent-request/reject-indent";
const searchVendorByProductURL = environment.apiurl + "/empanelment/get-product-seller";
const searchSellerURL = environment.apiurl + "/empanelment/get-seller";
const sendToVendorsURL = environment.apiurl + "/request-seller/create";
const getPastPOURL = environment.apiurl + "/po/search";
@Injectable() 
export class RequestDetailsService {
    constructor(private http: HttpClient) {}

    user: any;
    accessToken: any;
    httpHeaders: any;

    getAllRequests() {
        return IndentRequestList; 
    }

    setAccessToken() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.accessToken = this.user['accessToken'];
        
        this.httpHeaders = new HttpHeaders();
        this.httpHeaders = this.httpHeaders.set('x-auth-token', this.accessToken);
    }

    getMyIndentRequestDetails() {
        this.setAccessToken();
        return this.http.get(getMyIndentRequestURL, {headers: this.httpHeaders});
    }

    getIndentRequestForApproval() {
        this.setAccessToken();
        return this.http.get(indentRequestForApprovalURL, {headers: this.httpHeaders});
    }

    getApprovedRequests(obj) {
        this.setAccessToken();
        return this.http.post(approvedIndentRequestURL, obj,  {headers: this.httpHeaders});
    }

    approveIndentRequest(indObj) {
        this.setAccessToken();
        return this.http.put(approveIndentRequestURL, indObj, {headers: this.httpHeaders});
    }

    rejectIndentRequest(indObj) {
        this.setAccessToken();
        return this.http.put(rejectIndentRequestURL, indObj, {headers: this.httpHeaders});
    }

    getProductDetails() {
        this.setAccessToken();
        return this.http.post(getProductsURL, null, {headers: this.httpHeaders});
    }

    getUOMDetails() {
        this.setAccessToken();
        return this.http.post(getUOMURL, null, {headers: this.httpHeaders});
    }

    getCompanyByToken(companyId) {
        this.setAccessToken();
        return this.http.get(getCompanyURL + companyId, {headers: this.httpHeaders});
    }

    getDepartmentDetails() {
        this.setAccessToken();
        return this.http.post(getDepartmentURL, null, {headers: this.httpHeaders});
    }

    createNewIndent(indObj) {
        this.setAccessToken();
        return this.http.post(createIndentURL, indObj, {headers: this.httpHeaders});
    }

    getVendorByProductDetails(obj) {
        this.setAccessToken();
        return this.http.post(searchVendorByProductURL, obj, {headers: this.httpHeaders});
    }

    getMyVendorList(empObj) {
        this.setAccessToken();
        return this.http.post(searchSellerURL, empObj, {headers: this.httpHeaders});
    }

    sendToVendors(indObj) {
        this.setAccessToken();
        return this.http.post(sendToVendorsURL, indObj, {headers: this.httpHeaders});
    }

    getPastPO(indObj) {
        this.setAccessToken();
        return this.http.post(getPastPOURL, indObj, {headers: this.httpHeaders});
    }
}