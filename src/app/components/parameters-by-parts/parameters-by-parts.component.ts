import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VstHandlerService } from '../../services/vst-handler.service';

@Component({
  selector: 'app-parameters-by-parts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parameters-by-parts.component.html',
  styleUrl: './parameters-by-parts.component.scss',
})
export class ParametersByPartsComponent {
  vstHandlerService: VstHandlerService;

  constructor(vstHandlerService: VstHandlerService) {
    this.vstHandlerService = vstHandlerService;
  }
}
