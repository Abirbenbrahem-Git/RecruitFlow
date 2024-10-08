import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidat } from 'src/app/service/Candidat/Candidat';
import { CandidatService } from 'src/app/service/Candidat/candidat.service';
import { MessageService } from 'primeng/api';
import {gouvernorat} from "../../../service/gouvernorat/gouvernorat";
import {civilite} from "../../../service/Civilite/civilite";
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { CiviliteService } from 'src/app/service/Civilite/civilite.service';

@Component({
  selector: 'app-ajouter-candidat',
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
})
export class AjouterCandidatComponent implements OnInit {
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<Candidat> = new EventEmitter<Candidat>();

  gouvernorats: gouvernorat[] = [];
  civilites: civilite[] = [];


  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private messageService: MessageService,
    private GouvernoratService: GouvernoratService,
    private CiviliteService: CiviliteService
  ) { }
  candidatForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    role: ["CANDIDATE"],
    telephone: ["", Validators.required],
    dateNaissance: ["", Validators.required],
    gouvernorat: [null, Validators.required],
    civilite: [null, Validators.required]
  });


  ngOnInit(): void {
    this.GouvernoratService.getGouvernorats().subscribe(
      (data: gouvernorat[]) => {
        this.gouvernorats = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des gouvernorats :', error);
      }
    );
    this.CiviliteService.getcivilites().subscribe(
      (data: civilite[]) => {
        this.civilites = data;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des gouvernorats :', error);
      }
    );
  }


  closeModal() {
    this.candidatForm.reset();
    this.clickClose.emit(true);
  }

  addCandidat() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    if (this.candidatForm.valid) {
      this.candidatService.saveCandidat(this.candidatForm.value,token).subscribe(
        response => {
          console.log(response);
          this.clickAdd.emit(response);

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidat ajouté avec succès.' });
          this.closeModal();
        }
      );
    }
    console.log(this.candidatForm.value);
  }

}
