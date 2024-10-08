import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/service/Candidat/Candidat'; // Assurez-vous d'importer la classe Candidat appropriée
import { CandidatService } from 'src/app/service/Candidat/candidat.service'; // Assurez-vous d'importer le service Candidat approprié
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gerer-candidats',
  templateUrl: './gerer-candidats.component.html',
  styleUrls: ['./gerer-candidats.component.css']
})
export class GererCandidatsComponent implements OnInit {
  candidats: any[] = [];
  displayAddModal = false;
  displayEditModal = false;
  selectedCandidat: any = null;

  constructor(private candidatService: CandidatService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getAllCandidats(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }
  }

  getAllCandidats(token: string) {
    this.candidatService.getAllCandidats(token).subscribe(
      response => {
        console.log(response);
        this.candidats = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des candidats :', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des candidats'
        });
      }
    );
  }

  saveCandidat(newData: any) {
    console.log("Candidat ajouté avec succèsssssssssssss.");
    console.log(newData)
    this.candidats.unshift(newData);
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

  showEditModal(candidat: Candidat) {
    this.selectedCandidat = candidat;
    console.log('selectedCandidat:', this.selectedCandidat);
    this.displayEditModal = true;
  }

  updateCandidat(updatedData: Candidat) {
    const index = this.candidats.findIndex(cand => cand.id === updatedData.id);
    if (index !== -1) {
      this.candidats[index] = updatedData;
      this.displayEditModal = false;
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidat modifié avec succès'});
    }
  }

  deleteCandidat(candidat: Candidat) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce candidat ?',
      accept: () => {
        this.candidatService.deleteCandidat(Number(candidat.id),token).subscribe(
          response => {
            this.candidats = this.candidats.filter(data => data.id !== candidat.id);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidat supprimé'});
          },
          error => {
            console.error('Une erreur s\'est produite lors de la suppression du candidat :', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la suppression du candidat'
            });
          }
        );
      }
    });
  }
}
