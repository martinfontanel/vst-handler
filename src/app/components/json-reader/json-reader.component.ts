import { Component } from '@angular/core';
import { LoadDatasService } from '../../services/load-datas.service';
import { Observable, first, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VstParameters } from '../../interfaces/vst-parameters';
import { files } from '../../consts/files';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-reader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-reader.component.html',
  styleUrl: './json-reader.component.scss'
})
export class JsonReaderComponent {

  dataLoader:LoadDatasService;
  loaded$!:Observable<VstParameters>;
  files:any = files;
  url!:string;
  type!:string;
  typeParam:string[] = ["knob", "button","indent" , ""];
  typeParamOf:string[] = [];
  globalObject:VstParameters[] = [];
  globalExport!:string;
  
  constructor(dataLoader:LoadDatasService){
    this.dataLoader = dataLoader;
  }

  loadFile(){
    this.typeParamOf = [];
    this.loaded$ = this.dataLoader.getVSTData(this.url + ".json");
    this.loaded$.subscribe(value=>{
      value.parameters.map(val=>{
        this.typeParamOf.push(val.type);
      })
    })
  }

  stringify(obj:any){
    return JSON.stringify(obj)
  }

  submit(){
    this.loaded$.subscribe(value=>{
      value.type = this.type;
      value.parameters.map((val, key)=>{
        val.type = this.typeParamOf[key]
      })
      this.globalObject.push(value)
      this.globalExport = this.stringify(this.globalObject)
    })
  }
}
