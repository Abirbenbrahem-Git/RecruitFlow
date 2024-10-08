import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { NiveauService } from 'src/app/service/niveau/niveau.service';

@Component({
  selector: 'app-filtrer-offre',
  templateUrl: './filtrer-offre.component.html',
  styleUrls: ['./filtrer-offre.component.css']
})
export class FiltrerOffreComponent implements OnInit {

  selectedNom:string='';
  selectedNiv:string='';
  noms:string[] =[];
  nomv:string[] =[];
  @Output() selectNom: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectNiv: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectGouNiv: EventEmitter<string> = new EventEmitter<string>();
  constructor(private gouvernoratService:GouvernoratService,private niveauService:NiveauService){}

  ngOnInit(): void {
    this.getnoms();
    this.getnomss();
  }

  getnoms(){
    this.gouvernoratService.getnoms().subscribe(
      response => {
        console.log(response);
        this.noms = response;
      }
    )
  }

  getnomss(){
    this.niveauService.getnomss().subscribe(
      response => {
        console.log(response);
        this.nomv = response;
      }
    )
  }
  onChangedNom($event: any) {
    this.selectNom.emit($event.value);
    this.selectNiv.emit(this.selectedNiv);
    this.selectGouNiv.emit(this.selectedNom);
    console.log($event.value);
  }
}
