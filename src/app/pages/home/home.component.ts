import { Component } from '@angular/core';
import { LoadDatasService } from '../../services/load-datas.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VstParameters } from '../../interfaces/vst-parameters';
import { files } from '../../consts/files';
import { FormsModule } from '@angular/forms';
import { paramCats } from '../../consts/param-cat';
import { ParametersComponent } from '../../components/parameters/parameters.component';
import { VstHandlerService } from '../../services/vst-handler.service';
import { ParametersByPartsComponent } from '../../components/parameters-by-parts/parameters-by-parts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ParametersComponent,
    ParametersByPartsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** Services */
  dataLoader: LoadDatasService;
  vstHandlerService: VstHandlerService;
  /** Observables */
  loaded$!: Observable<VstParameters>;
  /** ext const */
  paramCats = paramCats;
  files: any = files;

  /** strings */
  url!: string;
  type!: string;
  typeParam: string[] = ['knob', 'button', 'indent', ''];
  typeParamOf: string[] = [];
  globalExport!: string;
  category: string[] = [];
  parts: string[] = [];
  paramPart: string[] = [];

  /** boolean */
  paramsByPartModify: boolean[][] = [];
  partModify: boolean[] = [];

  /** any */
  paramsByPart: any[][] = [];
  globalObject: VstParameters[] = [];

  constructor(
    dataLoader: LoadDatasService,
    vstHandlerService: VstHandlerService
  ) {
    this.dataLoader = dataLoader;
    this.vstHandlerService = vstHandlerService;
  }

  /** TODO Remove when vstHandler is OK */
  loadFile(url: string) {
    this.vstHandlerService.loadFile(url);
    /*this.typeParamOf = [];
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
    );*/
  }
  /** TODO Remove when vstHandler is OK */
  stringify(obj: any) {
    return JSON.stringify(obj);
  }
  /** TODO Remove when vstHandler is OK */
  addPart() {
    this.parts.push('');
    this.partModify.push(true);
  }
  /** TODO Remove when vstHandler is OK */
  removePart(index: number) {
    this.parts.splice(index, 1);
    this.changePart();
  }
  /** TODO Remove when vstHandler is OK */
  changePart() {
    this.loaded$ = this.loaded$.pipe(
      map((data) => {
        data.parts = this.parts;
        return data;
      })
    );
  }
  /** TODO Remove when vstHandler is OK */
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
  /** TODO Remove when vstHandler is OK */
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
