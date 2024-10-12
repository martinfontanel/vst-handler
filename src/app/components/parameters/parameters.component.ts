import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VstHandlerService } from '../../services/vst-handler.service';
import { Parameter } from '../../interfaces/parameter';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent {
  vstHandlerService: VstHandlerService;
  paramsToShow: Parameter[] = [];

  constructor(vstHandlerService: VstHandlerService) {
    this.vstHandlerService = vstHandlerService;
  }

  ngOnInit(): void {
    this.paramsToShow = this.vstHandlerService.noPartParams;
    console.log(this.paramsToShow);
  }
}
