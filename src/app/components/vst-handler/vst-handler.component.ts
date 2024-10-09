import { VstHandlerService } from './../../services/vst-handler.service';
import { Component } from '@angular/core';
import { LoadDatasService } from '../../services/load-datas.service';
import { Observable } from 'rxjs';
import { VstParameters } from '../../interfaces/vst-parameters';

@Component({
  selector: 'app-vst-handler',
  standalone: true,
  imports: [],
  templateUrl: './vst-handler.component.html',
  styleUrl: './vst-handler.component.scss',
})
export class VstHandlerComponent {
  loaded$!: Observable<VstParameters>;
  urlToLoad!: string;

  constructor(
    private dataLoader: LoadDatasService,
    private vstHandler: VstHandlerService
  ) {}

  loadFile() {
    this.loaded$ = this.dataLoader.getVSTData(this.urlToLoad);
  }
}
