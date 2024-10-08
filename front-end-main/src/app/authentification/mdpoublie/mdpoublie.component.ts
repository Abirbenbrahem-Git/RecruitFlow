import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/authentification/jwt.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mdpoublie',
  templateUrl: './mdpoublie.component.html',
  styleUrls: ['./mdpoublie.component.css']
})
export class MDPOublieeComponent implements OnInit {

  resetForm: FormGroup;
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(
    private jwtService: JwtService,
    private fb: FormBuilder,
    private location: Location
  ) {  this.resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const email = this.resetForm.get('email')?.value;
    this.jwtService.resetPassword(email).subscribe(
      () => {
        this.emailSent = true;
        this.errorMessage = '';
      },
      (error) => {
        this.emailSent = false;
        this.errorMessage = error.message || "Une erreur est survenue lors de l'envoi du lien de réinitialisation. Veuillez réessayer plus tard.";
      }
    );
  }
}
