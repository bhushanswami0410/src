import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../animal.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // If you use icons
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatInputModule } from '@angular/material/input'; // If using input fields
import { NotificationServiceService } from '../notification-service.service';

@Component({
  selector: 'app-animal-detail',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule],
  templateUrl: './animal-detail.component.html',
  styleUrl: './animal-detail.component.css'
})
export class AnimalDetailComponent implements OnInit {
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router,
    private notificationservice: NotificationServiceService 
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.animalService
      .getAnimalById(id)
      .subscribe((animal) => (this.animal = animal));
  }

  adoptAnimal(): void {
    this.animalService.adoptAnimal(this.animal.id).subscribe(() => {
      this.notificationservice.show('You have successfully adopted this animal!'); 
    });
    this.router.navigate(['/'])
  }

}
