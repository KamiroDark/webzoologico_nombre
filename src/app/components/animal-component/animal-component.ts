import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-animal-component',
  imports: [RouterOutlet],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css'
})
export class AnimalComponent {
  animalList: any = [];

  constructor(private animalService: AnimalService) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
    });
  }
  ngOnInit() {
    this.getAllAnimals();
  }

}
