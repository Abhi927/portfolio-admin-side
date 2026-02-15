import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


skills = [
    { name: 'JavaScript', level: 90, proficiency: 90 },
    { name: 'React', level: 85, proficiency: 95 },
    { name: 'Node.js', level: 80, proficiency: 60 },
    { name: 'TypeScript', level: 73, proficiency: 75 },
    { name: 'Python', level: 79, proficiency: 75 },
    { name: 'SQL', level: 70, proficiency: 70 },
    { name: 'AWS', level: 65, proficiency: 60 },
    { name: 'Docker', level: 60, proficiency: 60 }
  ];

  employment = [
    { company: 'TechCorp', title: 'Senior Software Engineer', duration: '2019 - Present' },
    { company: 'WebSolutions', title: 'Frontend Developer', duration: '2017 - 2019' },
    { company: 'InnovateTech', title: 'Software Intern', duration: '2016' }
  ];

  projects = [
    { client: 'LogSync', name: 'Portfolio Management Platform', stack: 'React, Spring Boot, Chart.js' },
    { client: 'WebMetrics', name: 'E-commerce Website', stack: 'React, Node.js, MongoDB' },
    { client: 'StartupTech', name: 'Blogging Platform', stack: 'TypeScript, Node.js, Express' }
  ];

  edit(item: any) {
    console.log('Edit:', item);
  }

  delete(item: any) {
    console.log('Delete:', item);
  }

}
