import { Component, OnInit } from '@angular/core';
import { Employeur } from 'src/app/service/employeur/employeur';
import { EmployeurService } from 'src/app/service/employeur/employeur.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-profil1',
  templateUrl: './profil1.component.html',
  styleUrls: ['./profil1.component.css']
})
export class Profil1Component implements OnInit {
  userDetails: any;
  updatedUserDetails: any = {};
  isUpdating: boolean = false;
  employeurs: Employeur[] = [];
  displayEditModal = false;
  selectedEmployeur: any = null;

  constructor(private employeurService: EmployeurService,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.employeurService.getUserDetails(token).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur : ', error);
      }
    );
  }



  // updateEmployeur($event: any) {
  //   const token = localStorage.getItem('access_token');
  //   if (!token) {
  //     console.error('Le token d\'authentification est null.');
  //     return;
  //   }
  //   const userId = this.userDetails.id; // Assuming id is present in userDetails
  //   this.isUpdating = true;
  //   this.employeurService.updateEmployeur(this.updatedUserDetails, userId, token)
  //     .subscribe(
  //       (data) => {
  //         console.log('User details updated successfully:', data);
  //         this.userDetails = data;
  //         this.isUpdating = false;
  //       },
  //       (error) => {
  //         console.error('Une erreur s\'est produite lors de la mise à jour des détails de l\'utilisateur : ', error);
  //         this.isUpdating = false;
  //
  //         this.messageService.add({severity: 'success', summary: 'Success', detail: 'Employeur modifié avec succès'});
  //       }
  //     );
  // }
 }
