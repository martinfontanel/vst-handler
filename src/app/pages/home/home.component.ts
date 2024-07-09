import { Component } from '@angular/core';
import { LoadDatasService } from '../../services/load-datas.service';
import { Observable, first, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VstParameters } from '../../interfaces/vst-parameters';
import { files } from '../../consts/files';
import { FormsModule } from '@angular/forms';
import { paramCats } from '../../consts/param-cat'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dataLoader:LoadDatasService;
  loaded$!:Observable<VstParameters>;
  files:any = files;
  url!:string;
  type!:string;
  typeParam:string[] = ["knob", "button","indent" , ""];
  typeParamOf:string[] = [];
  globalObject:VstParameters[] = [];
  globalExport!:string;
  category:string[] = [];
  paramCats = paramCats
  
  constructor(dataLoader:LoadDatasService){
    this.dataLoader = dataLoader;
  }

  loadFile(){
    let doILoad:boolean = false;
    this.typeParamOf = [];
    this.category = [];
    this.type = "";
    this.loaded$ = this.dataLoader.getVSTData(this.url + ".json");
    this.loaded$.subscribe(value=>{
      if (value.type !== undefined) this.type = value.type;
      value.parameters.map(val=>{
        this.typeParamOf.push(val.type);
        this.category.push(val.category!==undefined?val.category:"");
      })
    })
  }

  stringify(obj:any){
    return JSON.stringify(obj)
  }

  submit(){
    let alreadyPushed:boolean = false;
    let keyPushed:number;
    this.loaded$.subscribe(value=>{
      value.type = this.type;
      value.parameters.map((val, key)=>{
        val.type = this.typeParamOf[key]
        val.category = this.category[key]
      })

      this.globalObject.map((val, key)=>{
        if (val.vstName == value.vstName){
          alreadyPushed = true;
          keyPushed = key;
        }
      })

      if (!alreadyPushed) this.globalObject.push(value);
      else this.globalObject[keyPushed] = value;

      this.globalExport = this.stringify(this.globalObject)
    })
  }
}
