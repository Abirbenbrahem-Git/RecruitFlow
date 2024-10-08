import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/authentification/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.refresh_token != null) {
          const jwtToken = response.refresh_token;
          localStorage.setItem('refresh_token', response.refresh_token);
           localStorage.setItem('access_token', response.access_token);
           localStorage.setItem('role', response.role);
          if (response.role === 'EMPLOYER') {
            this.router.navigateByUrl("/offre");
          } else if (response.role === 'CANDIDATE') {
            this.router.navigateByUrl("/profilCandidat");
          } else if (response.role === 'ADMIN') {
            this.router.navigateByUrl("/gerer-employeurs");
          } else {
            console.error('Rôle non géré : ', response.role);
          }

          alert("Bonjour ! Vous êtes connecté. Bienvenue dans notre plateforme!");
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la connexion : ', error);
        alert("Une erreur s'est produite lors de la connexion. Veuillez vérifier vos informations et réessayer.");
      }
    );
  }
}
