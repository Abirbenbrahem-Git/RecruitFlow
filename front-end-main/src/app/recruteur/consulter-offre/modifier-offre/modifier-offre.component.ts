import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { gouvernorat } from 'src/app/service/gouvernorat/gouvernorat';
import { offre } from 'src/app/service/offre/offre';
import { OffreService } from 'src/app/service/offre/offre.service';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { niveau } from 'src/app/service/niveau/niveau';
import { NiveauService } from 'src/app/service/niveau/niveau.service';
@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit,OnChanges {
  @Input() displayEditModal: boolean = true;
  @Input() selectedOffre: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter<any>();

  gouvernorats: gouvernorat[] = [];
  niveaus: niveau[] = [];
  offreForm = this.fb.group({
    titre: [""],
    description: [""],
    detail: [""],
    salaire: [""],
    gouvernorat: [null],
    niveau: [null]
  });

  constructor(private fb: FormBuilder, private offreService: OffreService,private messageService: MessageService,private gouvernoratService: GouvernoratService,private niveauService: NiveauService) { }
  ngOnInit(): void {
    this.gouvernoratService.getgouvernorats().subscribe(response =>this.gouvernorats=response);
    this.niveauService.getniveaus().subscribe(response =>this.niveaus=response);
  }


  ngOnChanges():void {
    if(this.selectedOffre){
      this.offreForm.patchValue(this.selectedOffre);
    }
    else{
      this.offreForm.reset();
    }
  }

  closeModal(){
    this.offreForm.reset();
    this.clickClose.emit(true);
  }

  editOffre() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    const updatedData = this.offreForm.value;
    const id_offre = this.selectedOffre.id_offre;
    this.offreService.updateOffre(updatedData, id_offre,token ).subscribe(
      response => {
        this.clickEdit.emit(updatedData);
        this.messageService.add({severity:'success', summary:'Success', detail:'Offre modifiée'});
        this.closeModal();
      },
    );
  }

}
