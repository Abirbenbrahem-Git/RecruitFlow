import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulerOffreComponent } from './candidat/postuler-offre/postuler-offre.component';
import { RechercherOffreComponent } from './candidat/rechercher-offre/rechercher-offre.component';
import { ConsulterOffreComponent } from './recruteur/consulter-offre/consulter-offre.component';
import { CandidatureCandidatComponent } from './candidat/candidature-candidat/candidature-candidat.component';
import { AcceuilComponent } from './component/acceuil/acceuil.component';
import { ExperienceCandidatComponent } from './candidat/candidature-candidat/experience-candidat/experience-candidat.component';
import { DiplomeCandidatComponent } from './candidat/candidature-candidat/diplome-candidat/diplome-candidat.component';
import { GererEmployeursComponent } from './Admin/gerer-employeurs/gerer-employeurs.component';

import {RegisterComponent} from "./authentification/register/register.component";
import {LoginComponent} from "./authentification/login/login.component";
import {Register1Component} from "./authentification/register1/register1.component";
import {RegistrationComponent} from "./authentification/registration/registration.component";
import {MDPOublieeComponent} from "./authentification/mdpoublie/mdpoublie.component";
import {ExemplesCVComponent} from "./component/exemples-cv/exemples-cv.component";
import {ConsulterCandidatureComponent} from "./recruteur/consulter-candidature/consulter-candidature.component";
import {
  ConsulterDiplomeComponent
} from "./recruteur/consulter-candidature/consulter-diplome/consulter-diplome.component";
import {
  ConsulterExperienceComponent
} from "./recruteur/consulter-candidature/consulter-experience/consulter-experience.component";
//import {EmployerDashboardComponent} from "./recruteur/employer-dashboard/employer-dashboard.component";

 import {ProfilCandidatComponent} from "./candidat/profil-candidat/profil-candidat.component";
import {NouveauMDPComponent} from "./authentification/nouveau-mdp/nouveau-mdp.component";
import {MAJprofilComponent} from "./authentification/majprofil/majprofil.component";
import {GererCandidatsComponent} from "./Admin/gerer-candidats/gerer-candidats.component";
import {ProfilComponent} from "./authentification/profil/profil.component";
import {Profil1Component} from "./authentification/profil1/profil1.component";
import {MAJProfiLComponent} from "./authentification/profil/maj-profi-l/maj-profi-l.component";

const routes: Routes = [
  {path: 'rechercher', component:RechercherOffreComponent},
  { path: 'postuler/:id_offre', component:PostulerOffreComponent},
  { path: 'offre',component:ConsulterOffreComponent},
  { path: 'candidatures',component:CandidatureCandidatComponent},
  { path: 'accueil',component:AcceuilComponent},
  { path: 'experience/:id_candidature',component:ExperienceCandidatComponent},
  { path: 'diplome/:id_candidature',component:DiplomeCandidatComponent},
  {path:'gerer-employeurs',component:GererEmployeursComponent},
  {path: 'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'register1',component:Register1Component},
  {path:'registration',component:RegistrationComponent},
  {path:'MDPOubliee',component:MDPOublieeComponent},
  {path:'exemples-CV',component:ExemplesCVComponent},
  {path:'consulter-candidature', component:ConsulterCandidatureComponent},
  {path:'consulterdiplome/:id_candidature',component: ConsulterDiplomeComponent},
  {path:'consulterexperiences/:id_candidature',component:ConsulterExperienceComponent },
  //{path:'employer-dashboard',component:EmployerDashboardComponent},
  {path:'profilCandidat',component:ProfilCandidatComponent},
  {path:'nouveau-mdp', component: NouveauMDPComponent},
  {path:'MAJprofil',component:MAJprofilComponent},
  {path:'gerer-candidats',component:GererCandidatsComponent},
  {path:'profile', component:ProfilComponent},
  {path:'profile1', component:Profil1Component},
  { path: 'majprofil', component: MAJprofilComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
