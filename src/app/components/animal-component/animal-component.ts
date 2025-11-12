import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimalService } from '../../services/animal-service';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './animal-component.html',
  styleUrls: ['./animal-component.css']
})
export class AnimalComponent implements OnInit {
  animalList: any[] = [];
  animalForm!: FormGroup;
  idAnimal: any;
  editableAnimal: boolean = false;

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre: '',
      edad: 0,
      tipo: ''
    });
    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: any[]) => {
      this.animalList = data;
      console.log('Animales cargados:', this.animalList);
    });
  }

  newAnimalEntry() {
    if (this.animalForm.invalid) return;

    this.animalService.newAnimal(this.animalForm.value).subscribe(() => {
      this.toastr.success('Animal registrado exitosamente');
      this.animalForm.reset();
      this.getAllAnimals();
    });
  }

  updateAnimalEntry() {
    // Removiendo valores vacíos del formulario de actualización
    const formValue = { ...this.animalForm.value };
    for (let key in formValue) {
      if (!formValue[key]) {
        delete formValue[key];
      }
    }

    this.animalService.updateAnimal(this.idAnimal, formValue).subscribe(() => {
      this.toastr.success('Animal actualizado exitosamente');
      this.editableAnimal = false;
      this.animalForm.reset();
      this.getAllAnimals();
    });
  }

  toggleEditAnimal(id: any) {
    this.idAnimal = id;
    console.log(this.idAnimal);

    this.animalService.getOneAnimal(id).subscribe((data: any) => {
      this.animalForm.patchValue(data);
    });

    this.editableAnimal = !this.editableAnimal;
  }

  trackById(index: number, item: any): any {
    return item?._id ?? index;
  }

  deleteAnimalEntry(id: any) {
    console.log(id)
    this.animalService.deleteAnimal(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.toastr.success('Animal actualizado exitosamente');
      }
    );
  }
}