import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animal } from './animal.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-animal-list',
  imports: [CommonModule,FormsModule, MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];  // The animals array to hold the list of animals
  search: string = '';
  gender: string = 'All';
  type: string = 'All';
  currentPage = 1;
  animalsPerPage = 10;

  constructor(private router: Router, private animalService: AnimalService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Load animals on initialization
    this.loadAnimals();
  }

  // Load animals based on the current search, gender, and type filters
  loadAnimals(): void {
    // Calling the filterAnimals service method and subscribing to it
    this.animalService
      .filterAnimals(this.search, this.gender, this.type)
      .subscribe((animals) => {
        // Update the animals array with the filtered list
        this.animals = animals;
      });
  }

  onAdoptAnimal(animalId: number): void {
    this.animalService.adoptAnimal(animalId).subscribe(() => {
      // Show a snackbar message after adoption
      this.snackBar.open('You have adopted this animal!', 'Close', {
        duration: 3000,
      });
      // Reload the animals after adoption
      this.loadAnimals();
    });
  }

  // Method to handle page changes
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAnimals();
  }

  // Navigate to the animal details page
  viewAnimalDetails(id: number): void {
    this.router.navigate([`/animal/${id}`]);
  }
}
