import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importation de HttpHeaders depuis @angular/common/http
import { userService } from 'src/app/service/profil/user.service'; // Correction de la référence au service userService
import { JwtService } from "../../service/authentification/jwt.service";

@Component({
  selector: 'app-majprofil',
  templateUrl: './majprofil.component.html',
  styleUrls: ['./majprofil.component.css']
})
export class MAJprofilComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient, // Correction de la référence à httpClient
    private userService: userService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const accessTokenKey = 'access_token';
      const token = localStorage.getItem(accessTokenKey);

      if (!token) {
        console.error('Le token d\'authentification est null.');
        return;
      }

      const formData = this.profileForm.value;

      this.userService.updateUser(formData, token).subscribe(
        (response: any) => {
          console.log('Profil mis à jour avec succès', response);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du profil', error);
          // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
        }
      );
    }
  }
}
