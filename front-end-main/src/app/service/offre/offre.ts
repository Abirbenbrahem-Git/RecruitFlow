import { gouvernorat } from "../gouvernorat/gouvernorat";
import { niveau } from "../niveau/niveau";

export class offre {
    public id_offre?: number;
    public titre?: string;
    public description?: string;
    public detail?: string;
    public salaire?: number; 
    public gouvernorat?: gouvernorat;    
    public niveau?: niveau;
}
