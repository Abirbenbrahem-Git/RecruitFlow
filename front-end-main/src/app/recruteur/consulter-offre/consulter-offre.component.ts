import { Component, OnInit } from '@angular/core';
import { offre } from 'src/app/service/offre/offre';
import { OffreService } from 'src/app/service/offre/offre.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulter-offre',
  templateUrl: './consulter-offre.component.html',
  styleUrls: ['./consulter-offre.component.css']
})
export class ConsulterOffreComponent implements OnInit {

  offres: offre[] = [];
  displayAddModal = false;
  displayEditModal = false;
  selectedOffre: any = null;

  constructor(
    private offreService: OffreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      this.getoffres(token);
    } else {
      console.error('Le token d\'authentification est null.');
    }
  }

  getoffres(token: string) {
    this.offreService.getoffres(token).subscribe(
      response => {
        console.log(response);
        this.offres = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des offres : ', error);
      }
    );
  }



  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
  }

  showEditModal(offre: offre) {
    this.displayEditModal = true;
    this.selectedOffre = offre;
  }

  hideEditModal(isClosed: boolean) {
    this.displayEditModal = !isClosed;
  }

  saveOffre(newData: any) {
    this.offres.unshift(newData);
  }

  updateOffre(updatedData: any) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.getoffres(token);
    const index = this.offres.findIndex(offre => offre.id_offre === updatedData.id_offre);
    if (index !== -1) {
      this.offres[index] = updatedData;
    }
  }

  deleteOffre(offre: offre) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Le token d\'authentification est null.');
      return;
    }
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette offre ?',
      accept: () => {
        this.offreService.deleteOffre(Number(offre.id_offre),token).subscribe(
          response => {
            this.offres = this.offres.filter(data => data.id_offre !== offre.id_offre);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offre supprimée' });
          },
        )
      }
    });
  }
}
