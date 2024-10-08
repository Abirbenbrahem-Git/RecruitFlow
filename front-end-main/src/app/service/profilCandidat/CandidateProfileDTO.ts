import { gouvernorat } from '../gouvernorat/gouvernorat';
import { niveau } from '../niveau/niveau';

export class CandidateProfileDTO {
  public competences: string;
  public experiencesProfessionnelles: string;
  public diplome: string;
  public gouvernorat?: gouvernorat;
  public niveau?: niveau;

  constructor(
    competences: string,
    experiencesProfessionnelles: string,
    diplome: string,
    gouvernorat?: gouvernorat,
    niveau?: niveau
  ) {
    this.competences = competences;
    this.experiencesProfessionnelles = experiencesProfessionnelles;
    this.diplome = diplome;
    this.gouvernorat = gouvernorat;
    this.niveau = niveau;
  }
}
