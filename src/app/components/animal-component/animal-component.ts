import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { RouterOutlet, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-component',
  standalone: true,              // 👈 si usas Angular 17+ standalone
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './animal-component.html',
  styleUrls: ['./animal-component.css'] // 👈 debe ser styleUrls (plural)
})
export class AnimalComponent {
  animalList: any[] = [];
  animalForm!: FormGroup | any;

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre : '',
      edad: 0,
      tipo: ''
    })
    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: any[]) => {
      this.animalList = data;
    });
  }

  newAnimalEntry() {
    if (this.animalForm.invalid) return;

    this.animalService.newAnimal(this.animalForm.value).subscribe(() => {
      this.toastr.success('Clic aquí para actualizar la lista', 'Registro exitoso')
        .onTap.pipe(take(1))
        .subscribe(() => this.getAllAnimals());
    });
  }
}