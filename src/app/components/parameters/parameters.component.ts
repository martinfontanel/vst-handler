import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VstParameters } from '../../interfaces/vst-parameters';
import { map, Observable } from 'rxjs';
import { paramCats } from '../../consts/param-cat';
import { VstHandlerService } from '../../services/vst-handler.service';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent {
  vstHandlerService: VstHandlerService;

  constructor(vstHandlerService: VstHandlerService) {
    this.vstHandlerService = vstHandlerService;
  }
}
