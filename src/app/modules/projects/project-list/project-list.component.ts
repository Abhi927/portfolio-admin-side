import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

    projects = [
    { client: 'LogSync', name: 'Portfolio Management Platform', stack: 'React, Spring Boot, Chart.js' },
    { client: 'WebMetrics', name: 'E-commerce Website', stack: 'React, Node.js, MongoDB' },
    { client: 'StartupTech', name: 'Blogging Platform', stack: 'TypeScript, Node.js, Express' }
  ];

      currentPage = 1;
  itemsPerPage = 5;

  get paginatedSkills() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.projects.slice(startIndex, endIndex);
  }

  totalPages() {
    return Math.ceil(this.projects.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  edit(item: any) {
    console.log('Edit:', item);
  }

  delete(item: any) {
    console.log('Delete:', item);
  }
}
