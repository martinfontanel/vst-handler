import { Component } from '@angular/core';
import { LoadDatasService } from '../../services/load-datas.service';
import { Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VstParameters } from '../../interfaces/vst-parameters';
import { files } from '../../consts/files';
import { FormsModule } from '@angular/forms';
import { paramCats } from '../../consts/param-cat';
import { Parameter } from '../../interfaces/parameter';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dataLoader: LoadDatasService;
  loaded$!: Observable<VstParameters>;
  files: any = files;
  url!: string;
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

  loadFile() {
    this.typeParamOf = [];
    this.category = [];
    this.type = '';
    this.parts = [];
    this.partModify = [];
    this.paramPart = [];
    this.loaded$ = this.dataLoader.getVSTData(this.url + '.json').pipe(
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

  stringify(obj: any) {
    return JSON.stringify(obj);
  }

  addPart() {
    this.parts.push('');
    this.partModify.push(true);
  }

  removePart(index: number) {
    this.parts.splice(index, 1);
    this.changePart();
  }

  changePart() {
    this.loaded$ = this.loaded$.pipe(
      map((data) => {
        data.parts = this.parts;
        return data;
      })
    );
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

  submit() {
    let alreadyPushed: boolean = false;
    let keyPushed: number;
    this.loaded$.subscribe((value) => {
      value.type = this.type;

      this.globalObject.map((val, key) => {
        if (val.vstName == value.vstName) {
          alreadyPushed = true;
          keyPushed = key;
        }
      });

      if (!alreadyPushed) this.globalObject.push(value);
      else this.globalObject[keyPushed] = value;

      this.globalExport = this.stringify(this.globalObject);
    });
  }
}
