import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VstParameters } from '../interfaces/vst-parameters';
import { LoadDatasService } from './load-datas.service';
import { files } from '../consts/files';
import { paramCats } from '../consts/param-cat';

@Injectable({
  providedIn: 'root',
})
export class VstHandlerService {
  dataLoader: LoadDatasService;
  loaded$!: Observable<VstParameters>;
  files: any = files;
  type!: string;
  typeParam: string[] = ['knob', 'button', 'indent', ''];
  typeParamOf: string[] = [];
  globalObject: VstParameters[] = [];
  globalExport!: string;
  category: string[] = [];
  paramCats = paramCats;
  parts: string[] = [];
  partModify: boolean[] = [];
  paramPart: string[] = [];
  paramsByPart: any[][] = [];
  paramsByPartModify: boolean[][] = [];

  constructor(dataLoader: LoadDatasService) {
    this.dataLoader = dataLoader;
  }

  loadFile(url: string) {
    this.typeParamOf = [];
    this.category = [];
    this.type = '';
    this.parts = [];
    this.partModify = [];
    this.paramPart = [];
    this.loaded$ = this.dataLoader.getVSTData(url + '.json').pipe(
      map((data) => {
        data.parameters.map((value: any, id: number) => {
          data.parameters[id] = { ...value, id };
        });
        let linkPartParam: any[][] = [];
        if (data.parts) {
          data.parts.sort((a: any, b: any) => {
            return a < b ? -1 : 1;
          });
          data.parts.map((value: string, key: number) => {
            linkPartParam.push([]);
            data.parameters.map((val: any) => {
              if (value === val.part) {
                linkPartParam[key].push(val.id);
              }
            });
          });
        }
        data = { ...data, linkPartParam };
        return data;
      })
    );
    this.loaded$.subscribe((value) => {
      if (value.type !== undefined) this.type = value.type;
      value.parts?.map((val) => {
        this.parts.push(val);
        this.partModify.push(false);
        this.paramsByPart.push([]);
        this.paramsByPartModify.push([]);
      });
      value.parameters.map((val, key) => {
        this.typeParamOf.push(val.type);
        this.category.push(val.category !== undefined ? val.category : '');
        this.paramPart.push(val.part !== undefined ? val.part : '');
        this.parts.map((res, index) => {
          if (res == val.part) {
            this.paramsByPart[index].push(key);
            this.paramsByPartModify[index].push(false);
          }
        });
      });
    });
  }

  changeParam(index: number, attr: string) {
    this.loaded$ = this.loaded$.pipe(
      map((data) => {
        if (attr === 'type')
          data.parameters[index].type = this.typeParamOf[index];
        if (attr === 'cat')
          data.parameters[index].category = this.category[index];
        if (attr === 'part')
          data.parameters[index].part = this.paramPart[index];
        return data;
      })
    );
  }
}
