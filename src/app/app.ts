import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalComponent } from './components/animal-component/animal-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webzoologico_nombre');
}
