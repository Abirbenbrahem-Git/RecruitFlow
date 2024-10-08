import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatureService } from 'src/app/service/candidature/candidature.service';

@Component({
  selector: 'app-consulter-candidature',
  templateUrl: './consulter-candidature.component.html',
  styleUrls: ['./consulter-candidature.component.css']
})
export class ConsulterCandidatureComponent implements OnInit{


  candidatures: any[] = [];

  constructor(private candidatureService: CandidatureService, private router: Router) { }


  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getAllCandidaturess(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }

  }


  getAllCandidaturess(token: string): void {
    this.candidatureService.getAllCandidaturess(token)
      .subscribe(
        data => {
          this.candidatures = data;
          console.log("Candidatures récupérées avec succès :", this.candidatures);
        },
        error => {
          console.log(error);
        })
  }

  downloadFile(id: number, fileName: string): void {
    this.candidatureService.downloadFile(id)
      .subscribe(blob => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  consulterexperience(id_candidature: number){
    this.router.navigate(['consulterexperiences', id_candidature]);
  }
  consulterdiplome(id_candidature: number){
    this.router.navigate(['consulterdiplome', id_candidature]);
  }


  accepter(id_candidature:number){
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    console.log(id_candidature)
    this.candidatureService.accpeter(id_candidature,token).subscribe(
      (response)=>{
        this.getAllCandidaturess(token);
        console.log(response);
      },
      (erreur)=>{
        console.log(erreur);
      }
    );
  }

  refuser(id_candidature:number){
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    console.log(id_candidature)
    this.candidatureService.refuser(id_candidature,token).subscribe(
      (response)=>{
        this.getAllCandidaturess(token);
        console.log(response);
      },
      (erreur)=>{
        console.log(erreur);
      }
    );
  }

}
