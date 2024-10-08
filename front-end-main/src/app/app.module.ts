import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ConsulterOffreComponent } from './recruteur/consulter-offre/consulter-offre.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterOffreComponent } from './recruteur/consulter-offre/ajouter-offre/ajouter-offre.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ModifierOffreComponent } from './recruteur/consulter-offre/modifier-offre/modifier-offre.component';
import { RechercherOffreComponent } from './candidat/rechercher-offre/rechercher-offre.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FiltrerOffreComponent } from './candidat/filtrer-offre/filtrer-offre.component';
import { PostulerOffreComponent } from './candidat/postuler-offre/postuler-offre.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuCandidatComponent } from './candidat/menu-candidat/menu-candidat.component';
import { MenuRecruteurComponent } from './recruteur/menu-recruteur/menu-recruteur.component';
import { CandidatureCandidatComponent } from './candidat/candidature-candidat/candidature-candidat.component';
import { AcceuilComponent } from './component/acceuil/acceuil.component';
import { ExperienceCandidatComponent } from './candidat/candidature-candidat/experience-candidat/experience-candidat.component';
import { DiplomeCandidatComponent } from './candidat/candidature-candidat/diplome-candidat/diplome-candidat.component';
import { GererEmployeursComponent } from './Admin/gerer-employeurs/gerer-employeurs.component';
import { AjouterEmployeurComponent } from './Admin/gerer-employeurs/ajouter-employeur/ajouter-employeur.component';
import { ModifierEmployeurComponent } from './Admin/gerer-employeurs/modifier-employeur/modifier-employeur.component';
import {CalendarModule} from "primeng/calendar";
import { MenuAdminComponent } from './Admin/menu-admin/menu-admin.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { RegisterComponent } from './authentification/register/register.component';
import { Register1Component } from './authentification/register1/register1.component';
import { LoginComponent } from './authentification/login/login.component';
import { MDPOublieeComponent } from './authentification/mdpoublie/mdpoublie.component';
import { ExemplesCVComponent } from './component/exemples-cv/exemples-cv.component';
import { ConsulterCandidatureComponent } from './recruteur/consulter-candidature/consulter-candidature.component';
import { ConsulterDiplomeComponent } from './recruteur/consulter-candidature/consulter-diplome/consulter-diplome.component';
import { ConsulterExperienceComponent } from './recruteur/consulter-candidature/consulter-experience/consulter-experience.component';
import { MAJprofilComponent } from './authentification/majprofil/majprofil.component';
import { NouveauMDPComponent } from './authentification/nouveau-mdp/nouveau-mdp.component';
//import { EmployerDashboardComponent } from './recruteur/employer-dashboard/employer-dashboard.component';
 import { ProfilCandidatComponent } from './candidat/profil-candidat/profil-candidat.component';
import { GererCandidatsComponent } from './Admin/gerer-candidats/gerer-candidats.component';
import { AjouterCandidatComponent } from './Admin/gerer-candidats/ajouter-candidat/ajouter-candidat.component';
import { ModifierCandidatComponent } from './Admin/gerer-candidats/modifier-candidat/modifier-candidat.component';
import {ProfilComponent} from "./authentification/profil/profil.component";
import { Profil1Component } from './authentification/profil1/profil1.component';
import { MAJProfiLComponent } from './authentification/profil/maj-profi-l/maj-profi-l.component';
@NgModule({
  declarations: [
    AppComponent,
    ConsulterOffreComponent,
    AjouterOffreComponent,
    ModifierOffreComponent,
    RechercherOffreComponent,
    FiltrerOffreComponent,
    PostulerOffreComponent,
    MenuCandidatComponent,
    MenuRecruteurComponent,
    CandidatureCandidatComponent,
    AcceuilComponent,
    ExperienceCandidatComponent,
    DiplomeCandidatComponent,
    GererEmployeursComponent,
    AjouterEmployeurComponent,
    ModifierEmployeurComponent,
    MenuAdminComponent,
    RegistrationComponent,
    RegisterComponent,
    Register1Component,
    LoginComponent,
    MDPOublieeComponent,
    ExemplesCVComponent,
    ConsulterCandidatureComponent,
    ConsulterDiplomeComponent,
    ConsulterExperienceComponent,
    MAJprofilComponent,
    NouveauMDPComponent,
   // EmployerDashboardComponent,
     ProfilCandidatComponent,
    GererCandidatsComponent,
    AjouterCandidatComponent,
    ModifierCandidatComponent,
    ProfilComponent,
    Profil1Component,
    MAJProfiLComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    CardModule,
    DropdownModule,
    FileUploadModule,
    CalendarModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
