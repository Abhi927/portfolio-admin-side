import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientSharedService } from '../client-shareService';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent  implements OnInit {
idEditmode=false;
selectedClientId!: number;
  constructor(private fb:FormBuilder, private clientShareService: ClientSharedService,private service:ClientService) { }
  ngOnInit(): void {
    this.clientShareService.client$.subscribe(client => {
      if (client) {
        this.idEditmode = true;
        this.selectedClientId = client.id;
        this.clientForm.patchValue({
          name: client.name,
          logoUrl: client.logoUrl || '',
          websiteUrl: client.websiteUrl || '',
          description: client.description || ''
        });
      }
      else{
        this.idEditmode = false;
        this.clientForm.reset();
      }
    });
  }
  clientForm = this.fb.group({
    name: ['',[Validators.pattern('^[a-zA-Z ]+$'), Validators.required]],
    logoUrl: [''],
    websiteUrl: [''],
    description: ['',[Validators.required,Validators.maxLength(100)]]
  });
  closeModal(){
    this.clientShareService.setFlag(false);
    this.clientForm.reset();
  }
  submit(){
    if(this.clientForm.valid && !this.idEditmode){
      const clientData = this.clientForm.value as any;
      this.service.saveClient(clientData).subscribe({
        next: (response) => {
          alert('Client saved successfully!');
           this.closeModal();
    },
        error: (error) => {
          alert('Error saving client. Please try again.');
          
        }
      });
    }
    else if(this.clientForm.valid && this.idEditmode){
      const clientData = this.clientForm.value as any;
      this.service.updateClient(this.selectedClientId, clientData).subscribe({
      next: (response) => {
      alert('Client updated successfully!');
      this.closeModal();
    },
        error: (error) => {
          alert('Error updating client. Please try again.');
        }
      });
    }
    else{
      alert('Please fill all required fields correctly.');
      this.clientForm.markAllAsTouched();
    }
  }
}
