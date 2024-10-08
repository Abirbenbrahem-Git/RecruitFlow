import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterEmployeurComponent } from './ajouter-employeur.component';


@NgModule({
  declarations: [// Declare AjouterEmployeurComponent here
  ],
  imports: [
    CommonModule
  ],
  exports: [AjouterEmployeurComponent]  // Optionally export AjouterEmployeurComponent if it needs to be used outside this module
})
export class AjouterOffreModule { }
