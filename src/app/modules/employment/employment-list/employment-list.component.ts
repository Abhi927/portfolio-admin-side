import { Component } from '@angular/core';

@Component({
  selector: 'app-employment-list',
  templateUrl: './employment-list.component.html',
  styleUrl: './employment-list.component.css'
})
export class EmploymentListComponent {

   employment = [
    { company: 'TechCorp', title: 'Senior Software Engineer', duration: '2019 - Present' },
    { company: 'WebSolutions', title: 'Frontend Developer', duration: '2017 - 2019' },
    { company: 'InnovateTech', title: 'Software Intern', duration: '2016' }
  ];


    currentPage = 1;
  itemsPerPage = 5;

  get paginatedSkills() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.employment.slice(startIndex, endIndex);
  }

  totalPages() {
    return Math.ceil(this.employment.length / this.itemsPerPage);
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
