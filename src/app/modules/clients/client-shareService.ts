import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ClientSharedService {

  private clientSource = new BehaviorSubject<any>(null);
  client$ = this.clientSource.asObservable();
  
  setClient(client: any) {
    this.clientSource.next(client);
  }

  clearClient() {
    this.clientSource.next(null);
  }
  private flagSource = new BehaviorSubject<boolean>(false);
  flag$ = this.flagSource.asObservable();

  setFlag(value: boolean) {
    this.flagSource.next(value);
  }

  getCurrentFlag() {
    return this.flagSource.value;
  }
}