import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
