import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeurService } from 'src/app/service/employeur/employeur.service';
@Component({
  selector: 'app-modifier-employeur',
  templateUrl: './modifier-employeur.component.html',
  styleUrls: ['./modifier-employeur.component.css']
})
export class ModifierEmployeurComponent implements OnInit, OnChanges {
  secteurActivites: string[] = [
    'Technologie',
    'Finance',
    'Santé',
    'Éducation',
    'Commerce'
  ];
  @Input() displayEditModal: boolean = true;
  @Input() selectedEmployeur: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter<any>();

  employeurForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    email: [''],
    password: [''],
    role: ["EMPLOYER"],
    telephone: [''],
    nomEntreprise: [''],
    emailEntreprise: [''],
    adresseEntreprise: [''],
    secteurActivite: ['']
  });

  constructor(
    private fb: FormBuilder,
    private employeurService: EmployeurService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedEmployeur) {
      this.employeurForm.patchValue({
        ...this.selectedEmployeur,
        role: this.selectedEmployeur.role || 'EMPLOYER'
      });
    } else {
      this.employeurForm.reset();
    }
  }


  closeModal() {
    this.employeurForm.reset();
    this.clickClose.emit(true);
  }

  editEmployeur() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }


    const updatedData = this.employeurForm.value;
    const id = this.selectedEmployeur.id;

    this.employeurService.updateEmployeur(updatedData, id, token).subscribe(
      response => {
        this.clickEdit.emit(updatedData);
        console.log("hhhhhhhhhhhhhh");
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Employeur modifié'});
        this.closeModal();
      },
    );
  }


}
