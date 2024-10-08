import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiplomeService } from 'src/app/service/diplome/diplome.service';

@Component({
  selector: 'app-diplome-candidat',
  templateUrl: './diplome-candidat.component.html',
  styleUrls: ['./diplome-candidat.component.css']
})
export class DiplomeCandidatComponent implements OnInit {
  id_candidature: number | undefined;
  diplome: any[] = [];
  constructor(private route: ActivatedRoute, private diplomeService: DiplomeService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.id_candidature = Number(this.route.snapshot.params['id_candidature']);

    if (this.id_candidature) {
      this.diplomeService.getDiplomes(this.id_candidature,token).subscribe(
        data => {
          this.diplome = data;
          console.log(this.diplome);
        },
        error => {
          console.error(error);
        }
      );
    }


  }
}
