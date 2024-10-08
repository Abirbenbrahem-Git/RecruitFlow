import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/authentification/jwt.service';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { GouvernoratService } from 'src/app/service/gouvernorat/gouvernorat.service';
import { CiviliteService } from 'src/app/service/Civilite/civilite.service';
import {civilite} from "../../service/Civilite/civilite";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  gouvernorats: any[] = [];
  civilites: any[] = [];

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private GouvernoratService: GouvernoratService,
    private CiviliteService: CiviliteService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['CANDIDATE', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      gouvernorat: [null, Validators.required],
      civilite: [null, Validators.required]
    }, { validator: this.passwordMathValidator });
  }

  ngOnInit(): void {
    this.GouvernoratService.getgouvernoratss().subscribe(
      (data: any[]) => {
        this.gouvernorats = data;
        console.log(this.gouvernorats);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des gouvernorats :', error);
      }
    );
    this.CiviliteService.getcivilitess().subscribe(
      (data: civilite[]) => {
        if (data) { // Vérifiez si les données sont définies
          this.civilites = data;
        } else {
          console.error('Les données des civilites sont undefined.');
          // Gérer le cas où les données des civilites sont undefined
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des civilites :', error);
      }
    );
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        (response) => {
          alert("Bienvenue :)");
          this.router.navigateByUrl("/login");
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de l\'enregistrement : ', error);
          alert("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.");
        }
      );
    } else {
      console.error('Le formulaire est invalide. Veuillez remplir tous les champs correctement.');
      alert("Le formulaire est invalide. Veuillez remplir tous les champs correctement.");
    }
  }
}
