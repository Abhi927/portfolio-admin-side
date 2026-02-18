import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveEntityClient } from './client-saveEntity';
import{ environment } from '../../../environments/environment';
import { responseClient } from './client-responseEntity';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { deleteResponse } from './client-deleteresponse';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
 private Api= environment.api.client;

  constructor(private http: HttpClient) { }


  //save client
  saveClient(client: saveEntityClient ) {
    console.log('Saving client', client);
    // Here you would typically make an HTTP POST request to your backend API
    return this.http.post<responseClient>(this.Api, client).pipe(
      tap(response => {
        console.log('Client saved successfully', response);
        this.loadClients().subscribe();
      }),
      catchError(error => {
        console.error('Error saving client', error);
        return throwError(error);
      })
    );
  }

//load clients
private clientList$ = new BehaviorSubject<responseClient[]>([]);

  loadClients() {
    return this.http.get<responseClient[]>(this.Api).pipe(
      tap(clients => {
        console.log('Clients loaded successfully', clients);
        this.clientList$.next(clients);
      }),
      catchError(error => {
        console.error('Error loading clients', error);
        return throwError(error);
      })
    );
  }

  getClients() {
    return this.clientList$.asObservable();
  }

  //update client
  updateClient(id: number, client: saveEntityClient) {
    return this.http.put<responseClient>(`${this.Api}/${id}`, client).pipe(
      tap(response => {
        console.log('Client updated successfully', response);
        this.loadClients().subscribe();
      }),
      catchError(error => {
        console.error('Error updating client', error);
        return throwError(error);
      })
    );
  }
  //delete client
  deleteClient(id: number) {
    return this.http.delete<deleteResponse>(`${this.Api}/${id}`).pipe(
      tap(() => {
        console.log('Client deleted successfully');
        this.loadClients().subscribe();
      }),
      catchError(error => {
        console.error('Error deleting client', error);
        return throwError(error);
      })
    );
  }
}
