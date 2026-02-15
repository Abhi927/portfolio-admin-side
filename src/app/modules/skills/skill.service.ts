import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveSkill } from './skill-formsave';
import { environment } from '../../../environments/environment';
import { responseSkill } from './skil-response';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { deleteResponse } from './skil-deleteResponse';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
private skillList$ = new BehaviorSubject<responseSkill[] >([]);
  constructor(private http: HttpClient) { }
  private API = environment.api.skill;
  addSkill(skill: any) {
    return this.http.post<responseSkill>(`${this.API}`, skill).pipe(
      tap(responseSkill => {
        console.log('Skill added successfully:', responseSkill);
          this.loadSkill().subscribe();
      }),
      catchError(error => {
        console.error('Error adding skill:', error);
        return throwError(error);
      })
    ) ;
  }
  loadSkill()
  {
   return this.http.get<responseSkill[]>(`${this.API}`).pipe(
      tap(skillList => {
        this.skillList$.next(skillList);
      }),
      catchError(error => {
        console.error('Error loading skills:', error);
        return throwError(error);
      }) 
    ) ;
  }
   getSkills() {
    return this.skillList$.asObservable();
  }
  deleteSkill(id: number) {
    return this.http.delete<deleteResponse>(`${this.API}/${id}`).pipe(
      tap((data) => {
        this.loadSkill().subscribe();
      }),
      catchError(error => {
        console.error('Error deleting skill:', error);
        return throwError(error);
      })
    );
}
updateSkill(id: number, skill: any) {
    return this.http.put<responseSkill>(`${this.API}/${id}`, skill).pipe(
      tap(responseSkill => {
        console.log('Skill updated successfully:', responseSkill);
          this.loadSkill().subscribe();
      }),
      catchError(error => {
        console.error('Error updating skill:', error);
        return throwError(error);
      })
    ) ;
  }
}


