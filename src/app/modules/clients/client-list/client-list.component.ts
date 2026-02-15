import { Component } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
clients = [
    { name: 'LogiSync', industry: 'Software', projects: 6 },
    { name: 'WebMetrics', industry: 'E-commerce', projects: 3 },
    { name: 'StartupTech', industry: 'SaaS', projects: 3 }
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  get paginatedClients() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.clients.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.clients.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  edit(client: any) {
    console.log('Edit', client);
  }

  delete(client: any) {
    console.log('Delete', client);
  }
  get startItem(): number {
  return (this.currentPage - 1) * this.itemsPerPage + 1;
}

get endItem(): number {
  const end = this.currentPage * this.itemsPerPage;
  return end > this.clients.length ? this.clients.length : end;
}
}
