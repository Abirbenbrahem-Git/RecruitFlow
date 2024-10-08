import { gouvernorat } from "../gouvernorat/gouvernorat";
import { offre } from "../offre/offre";

export class candidature {
    id_candidature?: number;
    prenom?: string;
    nom?: string;
    mail?: string;
    telephone?: number;
    competence?: string;
    nomficher?: string;
    fichiertype?: string;
    fichier?: Blob;
    gouvernorat?: gouvernorat;
    id_offre?: offre;
}
