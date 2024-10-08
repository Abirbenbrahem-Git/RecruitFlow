import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employeur } from 'src/app/service/employeur/employeur';
import { EmployeurService } from 'src/app/service/employeur/employeur.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-ajouter-employeur',
  templateUrl: './ajouter-employeur.component.html',
  styleUrls: ['./ajouter-employeur.component.css']
})
export class AjouterEmployeurComponent implements OnInit {
  secteurActivites: string[] = [
    'Technologie',
    'Finance',
    'Santé',
    'Éducation',
    'Commerce'];
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<Employeur> = new EventEmitter<Employeur>();
  employeurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeurService: EmployeurService,
    private messageService: MessageService,
  ) {
    this.employeurForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: ["EMPLOYER"],
      telephone: ["", Validators.required],
      nomEntreprise: ["", Validators.required],
      emailEntreprise: ["", [Validators.required, Validators.email]],
      adresseEntreprise: ["", Validators.required],
      secteurActivite: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.employeurForm.reset();
    this.clickClose.emit(true);
  }

  addEmployeur() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    if (this.employeurForm.valid) {
      this.employeurService.saveEmployeur(this.employeurForm.value,token).subscribe(
        (response: Employeur) => {
          this.clickAdd.emit(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employeur ajouté avec succès.' });
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'employeur :', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur est survenue lors de l\'ajout de l\'employeur.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
  }
}
