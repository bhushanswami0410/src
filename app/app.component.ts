import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AnimalListComponent } from "./animal-list/animal-list.component";
import { AnimalDetailComponent } from "./animal-detail/animal-detail.component";

@Component({
    selector: 'app-root',
    imports: [RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment';
}
