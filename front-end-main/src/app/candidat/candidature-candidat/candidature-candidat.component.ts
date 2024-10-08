import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatureService } from 'src/app/service/candidature/candidature.service';

@Component({
  selector: 'app-candidature-candidat',
  templateUrl: './candidature-candidat.component.html',
  styleUrls: ['./candidature-candidat.component.css']
})
export class CandidatureCandidatComponent implements OnInit{


  candidatures: any[] = [];


  constructor(private candidatureService: CandidatureService,private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getAllCandidatures(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }

  }

  getAllCandidatures(token: string): void {
    this.candidatureService.getAllCandidatures(token)
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

  experience(id_candidature: number){
    this.router.navigate(['experience', id_candidature]);
  }
  diplome(id_candidature: number){
    this.router.navigate(['diplome', id_candidature]);
  }

}
