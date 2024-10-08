import { civilite } from "../Civilite/civilite"; // Assurez-vous que Civilite est correctement importé
import { gouvernorat } from "../gouvernorat/gouvernorat"; // Assurez-vous que Gouvernorat est correctement importé

export class Candidat {
  public id?: number;
  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public password?: string;
  public role?: string;
  public telephone?: string;
  public dateNaissance?: Date;
  public gouvernorat?: gouvernorat;
  public civilite?: civilite;
}
