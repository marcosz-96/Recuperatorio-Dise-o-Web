import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Photo } from '../models/photo.model'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url = 'https://jsonplaceholder.typicode.com/photos'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url)
  }

  getById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.url}/${id}`)
  }

  save(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.url, photo)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  update(photo: Photo): Observable<Photo> {
    // Usar PATCH en lugar de PUT para mejor compatibilidad con JSONPlaceholder
    return this.http.patch<Photo>(`${this.url}/${photo.id}`, photo)
  }

}
