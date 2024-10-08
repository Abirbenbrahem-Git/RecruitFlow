import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { NiveauService } from 'src/app/service/niveau/niveau.service';
import { CandidateProfileService } from 'src/app/service/profilCandidat/CandidateProfileService';
import { gouvernorat } from 'src/app/service/gouvernorat/gouvernorat';
import { niveau } from 'src/app/service/niveau/niveau';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {
  gouvernorats: gouvernorat[] = [];
  niveaux: niveau[] = [];
  profileForm: FormGroup;

  @Output() clickAdd = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private niveauService: NiveauService,
    private candidateProfileService: CandidateProfileService,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      gouvernorat: [null, Validators.required],
      competences: ['', Validators.required],
      niveau: [null, Validators.required],
      experiencesProfessionnelles: ['', Validators.required],
      diplome: ['', Validators.required],
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

    this.niveauService.getniveaus().subscribe(
      (data: niveau[]) => {
        this.niveaux = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des niveaux :', error);
      }
    );
  }

  addCandidatprofil() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }

    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      profileData.gouvernorat = profileData.gouvernorat;
      profileData.niveau = profileData.niveau;

      this.candidateProfileService.createCandidateProfile(profileData, token).subscribe(
        response => {
          console.log(response);
          this.clickAdd.emit(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile ajouté avec succès.' });
        },
        error => {
          console.error('Erreur lors de l\'ajout du candidat :', error);
          if (error.error && error.error.message) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Erreur: ${error.error.message}` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout du candidat profil.' });
          }
        }
      );
    } else {
      console.error('Le formulaire est invalide');
      this.profileForm.markAllAsTouched();
    }
  }
}
