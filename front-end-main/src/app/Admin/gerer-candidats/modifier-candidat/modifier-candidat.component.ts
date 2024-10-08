import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CandidatService } from 'src/app/service/Candidat/candidat.service';
import { gouvernorat } from "../../../service/gouvernorat/gouvernorat";
import { civilite } from "../../../service/Civilite/civilite";
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { CiviliteService } from 'src/app/service/Civilite/civilite.service';

@Component({
  selector: 'app-modifier-candidat',
  templateUrl: './modifier-candidat.component.html',
  styleUrls: ['./modifier-candidat.component.css']
})
export class ModifierCandidatComponent implements OnInit, OnChanges {
  gouvernorats: gouvernorat[] = [];
  civilites: civilite[] = [];
  @Input() displayEditModal: boolean = true;
  @Input() selectedCandidat: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter<any>();

  candidatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private messageService: MessageService,
    private gouvernoratService: GouvernoratService,
    private civiliteService: CiviliteService
  ) {
    this.candidatForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
     role: ["CANDIDATE"],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      civilite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gouvernoratService.getGouvernorats().subscribe(
      (data: gouvernorat[]) => {
        this.gouvernorats = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des gouvernorats :', error);
      }
    );
    this.civiliteService.getcivilites().subscribe(
      (data: civilite[]) => {
        this.civilites = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des civilités :', error);
      }
    );
  }

  ngOnChanges(): void {
    if (this.selectedCandidat) {
      this.candidatForm.patchValue(this.selectedCandidat);
    } else {
      this.candidatForm.reset();
    }
  }

  closeModal() {
    this.candidatForm.reset();
    this.clickClose.emit(true);
  }

  editCandidat() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    if (!this.selectedCandidat) {
      console.error('Erreur: selectedCandidat est indéfini');
      return;
    }

    const updatedData = this.candidatForm.value;
    const id = this.selectedCandidat.id;

    this.candidatService.updateCandidat(updatedData, id, token).subscribe(
      response => {
        this.clickEdit.emit(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidat modifié avec succès.' });
        this.closeModal();
      },
      error => {
        console.error('Erreur lors de la modification du candidat :', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur est survenue lors de la modification du candidat.' });
      }
    );
  }
}
