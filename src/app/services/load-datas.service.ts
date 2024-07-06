import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadDatasService {

  constructor(private http:HttpClient) { }

  getVSTData(url:string){
    return this.http.get<any>(url);
  }
}
