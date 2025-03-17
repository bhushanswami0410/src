import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
 
  private apiUrl = 'http://localhost:3000/animals';
  private animalsSubject = new BehaviorSubject<any[]>([]);
  animals$ = this.animalsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch animals
  fetchAnimals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Apply filters and search
  filterAnimals(
    search: string,
    gender: string,
    type: string
  ): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((animals) => {
        return animals.filter((animal) => {
          return (
            (search ? animal.name.includes(search) || animal.breed.includes(search) : true) &&
            (gender !== 'All' ? animal.gender === gender : true) &&
            (type !== 'All' ? animal.type === type : true)
          );
        });
      })
    );
  }

  // Adopt an animal
  adoptAnimal(animalId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${animalId}`, { adopted: true });
  }
  getAnimalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
}
