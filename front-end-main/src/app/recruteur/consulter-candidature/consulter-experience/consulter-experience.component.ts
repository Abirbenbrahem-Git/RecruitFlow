import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/service/experience/experience.service';

@Component({
  selector: 'app-consulter-experience',
  templateUrl: './consulter-experience.component.html',
  styleUrls: ['./consulter-experience.component.css']
})
export class ConsulterExperienceComponent implements OnInit {

  id_candidature: number | undefined;
  experience: any[] = [];
  constructor(private route: ActivatedRoute, private experienceService: ExperienceService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.id_candidature = Number(this.route.snapshot.params['id_candidature']);

    if (this.id_candidature) {
      this.experienceService.getExperiences(this.id_candidature,token).subscribe(
        data => {
          this.experience = data;
          console.log(this.experience);
        },
        error => {
          console.error(error);
        }
      );
    }


  }
}

