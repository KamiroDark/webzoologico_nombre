import { Routes } from '@angular/router';
import { Prueba } from './components/prueba/prueba';
import { AnimalComponent } from './components/animal-component/animal-component';

export const routes: Routes = [
    {path: 'inicio', component: Prueba},
    {path: 'lista', component: AnimalComponent},
];
