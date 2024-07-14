import { dirname } from 'node:path';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { files } from '../consts/files';

@Injectable({
  providedIn: 'root'
})
export class LoadDatasService {

  constructor(private http:HttpClient) { }

  getVSTData(url:string){
    return this.http.get<any>(url);
  }

  getAllData(): Observable<any[]>[]{
    let toReturn: Observable<any[]>[] = []
    files.map(value=>{
      value.files.map((val: string)=>{
        toReturn.push(this.getVSTData(value.dirName + '/' + val + '.json'));
      })
    })
    return toReturn;
  }
}
