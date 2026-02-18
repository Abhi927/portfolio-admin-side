import { Component } from '@angular/core';
import { ClientSharedService } from '../client-shareService';
import { ClientService } from '../client.service';
import { OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { responseClient } from '../client-responseEntity';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  client$!: Observable<any[]>;
  itemsPerPage = 5;
  totalPagesCount = 0;
  paginatedClients$!: Observable<responseClient[]>;
  currentPage$ = new BehaviorSubject<number>(1);
  endItem$!: Observable<number>;
 constructor(private clientShareService: ClientSharedService,private clientService:ClientService) { }
  ngOnInit(): void {
  //  Trigger loading clients
    this.client$ = this.clientService.getClients();
    this.client$.subscribe(clients => { 
      this.totalPagesCount = Math.ceil(
        clients.length / this.itemsPerPage
      );
    });
    this.paginatedClients$=combineLatest([this.client$, this.currentPage$]).pipe(
      map(([clients, page]) => {
        const start = (page - 1) * this.itemsPerPage;
        return clients.slice(start, start + this.itemsPerPage);
      })
    );
     this.endItem$ = combineLatest([
    this.currentPage$,
    this.paginatedClients$
  ]).pipe(
    map(([page, clients]) => {
      const end = page * this.itemsPerPage;
      return Math.min(end, clients.length);
    })
  );
  }
  
  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  nextPage() {
    if (this.currentPage$.value < this.totalPagesCount) {
      this.currentPage$.next(this.currentPage$.value + 1);
    }
  }
  edit(client: any) {
    this.clientShareService.setFlag(true);
    this.clientShareService.setClient(client);
  }

  delete(client: any) {
    this.clientService.deleteClient(client.id).subscribe({
      next: (response) => {
        alert('Client deleted successfully!');  
      },
      error: (error) => {
        alert('Error deleting client. Please try again.');  
      }
    });
  }


// open client form
isVisible$ = this.clientShareService.flag$;
openClientForm() {
  this.clientShareService.setFlag(true);
}
}
