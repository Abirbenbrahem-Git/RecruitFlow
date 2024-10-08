import { Component, OnInit } from '@angular/core';
import {CandidatService} from 'src/app/service/Candidat/candidat.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userDetails: any;
  constructor(private  CandidatService :  CandidatService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.CandidatService.getUserDetails(token).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur : ', error);
      }
    );
  }
}
