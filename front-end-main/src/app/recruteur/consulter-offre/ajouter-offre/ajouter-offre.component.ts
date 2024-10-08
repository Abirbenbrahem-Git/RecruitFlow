import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { gouvernorat } from 'src/app/service/gouvernorat/gouvernorat';
import { OffreService } from 'src/app/service/offre/offre.service';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { niveau } from 'src/app/service/niveau/niveau';
import { NiveauService } from 'src/app/service/niveau/niveau.service';
@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent implements OnInit {
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  gouvernorats: gouvernorat[] = [];
  niveaus: niveau[] = [];
  offreForm = this.fb.group({
    titre: ["", Validators.required],
    description: ["", Validators.required],
    detail: [""],
    salaire: ["", Validators.required],
    gouvernorat: [null, Validators.required],
    niveau: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private offreService: OffreService,private messageService: MessageService, private gouvernoratService: GouvernoratService, private niveauService: NiveauService) { }
  ngOnInit(): void {
    this.gouvernoratService.getgouvernorats().subscribe(response =>this.gouvernorats=response);
    this.niveauService.getniveaus().subscribe(response =>this.niveaus=response);
  }

  closeModal(){
    this.offreForm.reset();
    this.clickClose.emit(true);
  }

  addOffre(){
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    if (this.offreForm.valid) {
      this.offreService.saveOffre(this.offreForm.value,token).subscribe(
        response => {
          this.clickAdd.emit(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offre ajoutée avec succès.' });
          this.closeModal();
        },);}
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir tous les champs obligatoires.' });
    }
    console.log(this.offreForm.value);
  }


}
