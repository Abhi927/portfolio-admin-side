import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SkillSharedService {

  private skillSource = new BehaviorSubject<any>(null);
  skill$ = this.skillSource.asObservable();

  setSkill(skill: any) {
    this.skillSource.next(skill);
  }

  clearSkill() {
    this.skillSource.next(null);
  }
}
