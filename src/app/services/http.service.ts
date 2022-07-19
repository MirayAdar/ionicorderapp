import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { GidService } from './gid.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //token=localStorage.getItem("token");

  getHeaderWithToken() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "appId": "17e5359c-37b1-485d-a66d-8043b5cec093",
      "Access-Control-Allow-Origin": "*",
      "Authorization" : this.gid.token
    });
  }

  getHeader(){
    return new HttpHeaders({
      "Content-Type": "application/json",
      "appId": "17e5359c-37b1-485d-a66d-8043b5cec093",
      "Access-Control-Allow-Origin": "*",
    });
  }
  constructor(private http: HttpClient, private gid: GidService, private localStorage:LocalStorageService) { }

   //baseurl = "http://localhost:61096/api/";
   baseurl = "https://localhost:44318/api/";
    // baseurl="http://10.35.1.184:8070/api/";
   // baseurl="http://192.168.2.40:8070/api/";

  // private headers = new HttpHeaders({});

  GetWithoutToken(url: string, callback: (value: ResponseModel) => void){
    this.Register(this.http.get<ResponseModel>(this.baseurl+url, {headers: this.getHeader()}), callback);
  }
  Get(url: string, callback: (value: ResponseModel) => void) {
    this.Register(this.http.get<ResponseModel>(this.baseurl+url, { headers: this.getHeaderWithToken() }), callback);
  }

  PostWithoutToken(url:string, data:any, callback: (value: ResponseModel) => void) {
    this.Register(this.http.post<ResponseModel>(this.baseurl+url, data, { headers: this.getHeader() }), callback);
  }

  Post(url:string, data:any, callback: (value: ResponseModel) => void) {
    console.log(data);
    this.Register(this.http.post<ResponseModel>(this.baseurl+url, data, { headers: this.getHeaderWithToken() }), callback);
  }
  Put(url:string, data:any, callback: (value: ResponseModel) => void) {
    this.Register(this.http.put<ResponseModel>(this.baseurl+url, data, { headers: this.getHeaderWithToken() }), callback);
  }
  Delete(url:string, callback: (value: ResponseModel) => void) {
    this.Register(this.http.delete(this.baseurl+url, { headers: this.getHeaderWithToken() }), callback);
  }

  private Register(request: Observable<object>, callback: (value: ResponseModel) => void):Subscription {
    return request.pipe(
    ).subscribe(
        (response:ResponseModel) => {//success
          callback(response);
        },
        (error) => {//error
          console.log(error);
          if (error.status==0)
          {
            callback({success:false, message:"Sunucuya erişilemiyor."});
          }
          else if (error.status==401 && this.gid.token!="")
          {
            if (this.localStorage.FileExists("phone")) {
              this.GetWithoutToken("Auth/Auth/"+ this.localStorage.ReadFile("phone", "notfound") , response => {
                console.log(response);
                if (response.success){
                  this.gid.token=response.data.token;
                  this.gid.ShowToast("Güvenlik anahtarı yenilendi.",2000);
                  this.Register(request, callback);
                }
                else{
                  this.gid.ShowToast(response.message ,2000);
                }
              });
            }
          }
          else if (error.status==500)//Server Internal Error
          {
            callback({success:false, message:"Hay aksi, şu anda işleminizi gerçekleştiremiyoruz."});
          }
          else if (error.error)
          {
            if (error.error.message){
              callback(error.error);
            }
            else{
              callback({success:false, message:"Hay aksi, şu anda işleminizi gerçekleştiremiyoruz."});
            }
          }
          else
          {
            callback(error);
          }
        }
      );
  }
}
