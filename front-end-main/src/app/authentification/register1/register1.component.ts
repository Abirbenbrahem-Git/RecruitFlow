import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/authentification/jwt.service';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component implements OnInit {

  register1Form: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    this.register1Form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['EMPLOYER'],
      confirmPassword: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      nomEntreprise: ['', Validators.required],
      emailEntreprise: ['', [Validators.required, Validators.email]],
      telephoneEntreprise: ['', Validators.required],
      adresseEntreprise: ['', Validators.required],
      secteurActivite: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
    console.log("*****************",this.register1Form)
  }

  goBack(): void {
    this.location.back(); // Utilisez location.back() pour naviguer en arrière
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  submitForm(){

    console.log(this.register1Form);

    Object.keys(this.register1Form.controls).forEach(x => {
      console.log(x)

    })
    if (this.register1Form.valid) {
      console.log(this.register1Form.value);

      this.service.register1(this.register1Form.value).subscribe(
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
