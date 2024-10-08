import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gouvernorat } from 'src/app/service/gouvernorat/gouvernorat';
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { ActivatedRoute } from '@angular/router';
import { CandidatureService } from 'src/app/service/candidature/candidature.service';
import { MessageService } from 'primeng/api';
import { ExperienceService } from 'src/app/service/experience/experience.service';
import { DiplomeService } from 'src/app/service/diplome/diplome.service';
import { HttpClient } from '@angular/common/http';
import { ResumeData } from 'src/app/service/resume/resume';

@Component({
  selector: 'app-postuler-offre',
  templateUrl: './postuler-offre.component.html',
  styleUrls: ['./postuler-offre.component.css']
})
export class PostulerOffreComponent implements OnInit {

  gouvernorats: gouvernorat[] = [];
  public expForm!: FormGroup;
  public dipForm1!: FormGroup;
  profileForm: FormGroup;
  fichier: File | null = null;
  id_offre: number | undefined;

  constructor(
    private fb: FormBuilder,
    private gouvernoratService: GouvernoratService,
    private route: ActivatedRoute,
    private candidatureService: CandidatureService,
    private messageService: MessageService,
    private experienceService: ExperienceService,
    private diplomeService: DiplomeService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      gouvernoratName: ['', Validators.required],
      competence: ['', Validators.required],
      fichier: ['', Validators.required],
      id_offre: [null],
    });
  }

  ngOnInit(): void {
    this.expForm = this.fb.group({
      tags: this.fb.array([])
    });

    this.dipForm1 = this.fb.group({
      tags1: this.fb.array([])
    });

    this.gouvernoratService.getgouvernorats().subscribe(response => this.gouvernorats = response);

    this.id_offre = this.route.snapshot.params['id_offre'];
    this.profileForm.patchValue({ id_offre: this.id_offre });

    const token = localStorage.getItem('access_token');
    if (token) {
      console.log(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }
  }

  get tags(): FormArray {
    return this.expForm.get('tags') as FormArray;
  }
  deleteItem(index: number): void {
    this.tags.removeAt(index);
  }
  addTags(): void {
    this.tags.push(this.fb.group({
      poste: [''],
      datedebut: [''],
      datefin: [''],
      responsabilite: [''],
    }));
  }

  get tags1(): FormArray {
    return this.dipForm1.get('tags1') as FormArray;
  }
  deleteItem1(index: number): void {
    this.tags1.removeAt(index);
  }
  addTags1(): void {
    this.tags1.push(this.fb.group({
      diplome: [''],
      datediplome: [''],
    }));
  }

  onSubmitCandidature(token: string): Promise<any> {
    if (this.profileForm.valid && this.fichier) {
      const formData = new FormData();
      formData.append('id_offre', this.profileForm.get('id_offre')?.value);
      formData.append('nom', this.profileForm.get('nom')?.value);
      formData.append('prenom', this.profileForm.get('prenom')?.value);
      formData.append('mail', this.profileForm.get('mail')?.value);
      formData.append('telephone', this.profileForm.get('telephone')?.value);
      formData.append('gouvernoratName', this.profileForm.get('gouvernoratName')?.value);
      formData.append('competence', this.profileForm.get('competence')?.value);
      formData.append('fichier', this.fichier);

      return new Promise((resolve, reject) => {
        this.candidatureService.createCandidature(formData, token).subscribe(
          response => {
            console.log(this.profileForm.value);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidature envoyée avec succès.' });
            resolve(response);
          },
          error => {
            console.error('Erreur lors de l\'envoi de la candidature', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur s\'est produite lors de l\'envoi de la candidature.' });
            reject(error);
          }
        );
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez remplir tous les champs obligatoires.' });
      return Promise.reject('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fichier = fileList[0];
      const fileUrl: string = URL.createObjectURL(this.fichier);
      console.log('URL du fichier sélectionné:', fileUrl);
    }
  }

  ajouterExperiencesDiplomes(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }

    this.onSubmitCandidature(token).then((response) => {
      for (let el of this.expForm.value.tags) {
        el.id_candidature = response.id_candidature;
      }
      this.experienceService.saveExperience(this.expForm.value.tags, token).subscribe(
        () => console.log("Expérience ajoutée avec succès"),
        error => console.error("Une erreur s'est produite lors de l'ajout de l'expérience :", error)
      );

      for (let el of this.dipForm1.value.tags1) {
        el.id_candidature = response.id_candidature;
      }
      this.diplomeService.saveDiplome(this.dipForm1.value.tags1, token).subscribe(
        () => console.log("Diplôme ajouté avec succès"),
        error => console.error("Une erreur s'est produite lors de l'ajout du diplôme :", error)
      );
    }).catch(error => {
      console.error("Une erreur s'est produite lors de la soumission de la candidature :", error);
    });
  }

  onpython(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('http://127.0.0.1:5000/upload', formData).subscribe(response => {
        console.log('File uploaded successfully:', response);

        this.http.get<ResumeData>('http://127.0.0.1:5000/get_results').subscribe(result => {
          this.profileForm.controls['prenom'].setValue(result.first_name);
          this.profileForm.controls['nom'].setValue(result.last_name);
          this.profileForm.controls['mail'].setValue(result.email);
          this.profileForm.controls['telephone'].setValue(result.phone);
          this.profileForm.controls['competence'].setValue(result.SKILLS);

          if (Array.isArray(result.EXPERIENCE)) {
            result.EXPERIENCE.forEach((expData: any, index: number) => {
              if (index < this.tags.controls.length) {
                this.tags.controls[index].markAsDirty();
                this.tags.controls[index].get('poste')?.setValue(expData);
              } else {
                this.addTags();
                this.tags.controls[index].get('poste')?.setValue(expData);
                this.tags.controls[index].markAsDirty();
              }
            });
          }

          if (Array.isArray(result.EDUCATION)) {
            result.EDUCATION.forEach((dipData: any, index: number) => {
              if (index < this.tags1.controls.length) {
                this.tags1.controls[index].markAsDirty();
                this.tags1.controls[index].get('diplome')?.setValue(dipData);
              } else {
                this.addTags1();
                this.tags1.controls[index].get('diplome')?.setValue(dipData);
                this.tags1.controls[index].markAsDirty();
              }
            });
          }
        }, error => {
          console.error('Error fetching results:', error);
        });
      }, error => {
        console.error('Error uploading file:', error);
      });
    }
  }
}
