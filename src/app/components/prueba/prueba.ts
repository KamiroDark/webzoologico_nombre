import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  imports: [FormsModule],
  templateUrl: './prueba.html',
  styleUrl: './prueba.css'
})
export class Prueba {
titulo = 'mi titulo de prueba';
}
