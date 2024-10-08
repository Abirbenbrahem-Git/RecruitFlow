import { Component, OnInit } from '@angular/core';
import { Employeur } from 'src/app/service/employeur/employeur';
import { EmployeurService } from 'src/app/service/employeur/employeur.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gerer-employeurs',
  templateUrl: './gerer-employeurs.component.html',
  styleUrls: ['./gerer-employeurs.component.css']
})
export class GererEmployeursComponent implements OnInit {
  employeurs: Employeur[] = [];
  displayAddModal = false;
  displayEditModal = false;
  selectedEmployeur: any = null;

  constructor(private employeurService: EmployeurService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getAllEmployeurs(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }
  }

  getAllEmployeurs(token: string) {
    this.employeurService.getAllEmployeurs(token).subscribe(
      response => {
        console.log(response);
        this.employeurs = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des employeurs :', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des employeurs'
        });
      }
    );
  }

  saveEmployeur(newData: Employeur) {
    this.employeurs.unshift(newData);
    this.displayAddModal = false;
     }

  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
  }

  hideEditModal(isClosed: boolean) {
    this.displayEditModal = !isClosed;
  }

  showEditModal(employeur: Employeur) {
    this.selectedEmployeur = employeur;
    console.log('selectedEmployeur:', this.selectedEmployeur);
    this.displayEditModal = true;
  }

  updateEmployeur(updatedData: any) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
     this.getAllEmployeurs(token);
    const index = this.employeurs.findIndex(emp => emp.id === updatedData.id);
    if (index !== -1) {
      this.employeurs[index] = updatedData;
      this.displayEditModal = false;
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Employeur modifié avec succès'});
    }
  }


  deleteEmployeur(employeur: Employeur) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce Employeur ?',
      accept: () => {
        this.employeurService.deleteEmployeur(Number(employeur.id),token).subscribe(
          response => {
            this.employeurs = this.employeurs.filter(data => data.id !== employeur.id);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Employeur supprimée'});
          },
          error => {
            console.error('Une erreur s\'est produite lors de la suppression de l\'employeur :', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression de l\'employeur'
            });
          }
        );
      }
    });
  }

}
