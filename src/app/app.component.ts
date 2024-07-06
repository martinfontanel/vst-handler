import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonReaderComponent } from './components/json-reader/json-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonReaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vst-handler';
}
