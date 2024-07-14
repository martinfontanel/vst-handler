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
  paramCats = paramCats;
  parts:string[] = [];
  partModify:boolean[] = [];
  paramPart:string[] = [];
  paramsByPart: any[][] = [];
  paramsByPartModify: boolean[][] = [];


  constructor(dataLoader:LoadDatasService){
    this.dataLoader = dataLoader;
  }

  loadFile(){
    this.typeParamOf = [];
    this.category = [];
    this.type = "";
    this.parts = [];
    this.partModify = [];
    this.paramPart = [];
    this.loaded$ = this.dataLoader.getVSTData(this.url + ".json").pipe(
      map(data=>{
        data.parameters.map((value:any, id:number)=>{
          data.parameters[id] = {...value, id}
        })
        data.parts.sort((a:any, b:any)=>{
          return a < b ? -1 : 1;
        })
        let linkPartParam:any[][] = [];
        data.parts.map((value:string, key:number)=>{
          linkPartParam.push([])
          data.parameters.map((val:any)=>{
            if (value === val.part){
              linkPartParam[key].push(val.id);
            }
          })
        })
        data = {...data, linkPartParam}
        return data;
      })
    );
    this.loaded$.subscribe(value=>{
      if (value.type !== undefined) this.type = value.type;
      value.parts?.map(val=>{
        this.parts.push(val);
        this.partModify.push(false);
        this.paramsByPart.push([]);
        this.paramsByPartModify.push([])
      });
      value.parameters.map((val, key)=>{
        this.typeParamOf.push(val.type);
        this.category.push(val.category!==undefined?val.category:"");
        this.paramPart.push(val.part!==undefined?val.part:"");
        this.parts.map((res, index)=>{
          if (res == val.part){
            this.paramsByPart[index].push(key);
            this.paramsByPartModify[index].push(false);
          }
        })
      })
    })
  }

  stringify(obj:any){
    return JSON.stringify(obj)
  }
  addPart(){
    this.parts.push("");
    this.partModify.push(true)
  }

  submit(){
    let alreadyPushed:boolean = false;
    let keyPushed:number;
    this.loaded$.subscribe(value=>{
      this.parts.map((val, key)=>{
        if (value.parts == undefined) value.parts = [];
        if (val != "") value.parts[key] = val;
        if (val == "" || val == null) console.log("ya des champs vides")
      })
      value.type = this.type;
      value.parameters.map((val, key)=>{
        val.type = this.typeParamOf[key]
        val.category = this.category[key]
        val.part = this.paramPart[key]
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
