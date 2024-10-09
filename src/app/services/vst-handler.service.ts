import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VstParameters } from '../interfaces/vst-parameters';

@Injectable({
  providedIn: 'root',
})
export class VstHandlerService {
  vstInfos$!: Observable<VstParameters>;
  vstInfos!: BehaviorSubject<VstParameters>;

  constructor() {}

  initVstInfos(initVal: Observable<VstParameters>) {
    this.vstInfos$ = initVal;
  }

  setVstInfos(vstParameters: VstParameters) {}
}
