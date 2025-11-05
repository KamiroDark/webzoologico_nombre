import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  apiUri = '/api/animalitos';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  getAllAnimalsData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }


  newAnimal(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions });
  }



}
