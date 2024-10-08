import { Component, OnInit } from '@angular/core';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { offre } from 'src/app/service/offre/offre';
import { OffreService } from 'src/app/service/offre/offre.service';
import { Router } from '@angular/router';
import { NiveauService } from 'src/app/service/niveau/niveau.service';
import { MatchingService } from 'src/app/service/matching/MatchingService';
@Component({
  selector: 'app-rechercher-offre',
  templateUrl: './rechercher-offre.component.html',
  styleUrls: ['./rechercher-offre.component.css']
})
export class RechercherOffreComponent implements OnInit{

  offres: offre[] = [];
/*hh*/

  constructor(private offreService:OffreService,private gouvernoratService:GouvernoratService,private niveauService:NiveauService,private router: Router,private matchingService: MatchingService){ }
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getoffress(token);
    } else {
      console.error('Le token d\'authentification est null.');

    }
  }

  getoffress(token: string) {
    this.offreService.getoffress(token).subscribe(
      response => {
        console.log(response);
        this.offres = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des offres : ', error);

      }
    );
  }

  getOffreByGovernoratList(nom?:string) {
    this.gouvernoratService.getOffreByGovernoratList(nom ||"").subscribe(
      response => {
        console.log(response);
        this.offres = response;
      }
    )
  }

  getOffreByGovernorat(nom:string){
    this.getOffreByGovernoratList(nom);
  }

  getOffreByNivveauList(nom?:string) {
    this.niveauService.getOffreByNivveauList(nom ||"").subscribe(
      response => {
        console.log(response);
        this.offres = response;
      }
    )
  }
  getOffreByGouvernoratNiveauList(gouvernorat?: string, niveau?: string) {
    this.offreService.getOffreByGouvernoratNiveauList(gouvernorat || "", niveau || "").subscribe(
      response => {
        console.log(response);
        this.offres = response;
      }
    );  }

  getOffreByNiveau(nom:string){
    this.getOffreByNivveauList(nom);
  }
  postuler(id_offre?: number){
    this.router.navigate(['postuler', id_offre]);
  }
  /*  // Fonction pour récupérer le profil du candidat connecté
  getCandidateProfile() {
    const userId = this.authService.getCurrentUserId(); // Supposons que vous ayez une fonction dans le service d'authentification pour récupérer l'ID de l'utilisateur connecté
    if (userId) {
      this.matchingService.getCandidateProfile(userId).subscribe(
        (response) => {
          // Utilisez le profil du candidat récupéré pour le calcul du score de correspondance
          this.calculateMatchingScore(response);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération du profil du candidat : ', error);
        }
      );
    }
  }*/
  calculateMatchingScore() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.matchingService.calculateMatchingScore(token).subscribe(
      (response) => {
        this.offres = response;
        console.log('Offres correspondantes:', this.offres);
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
}
