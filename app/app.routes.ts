import { Routes } from '@angular/router';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';

export const routes: Routes = [
    { path: '', component: AnimalListComponent },
  { path: 'animal/:id', component: AnimalDetailComponent },
];

