import { AuthentificationService } from './authentification.service';
import { Http} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  link='http://127.0.0.1:1000/api/';
  constructor(private http:Http) { }

  getReclamationTypes()
  {
    return this.http.get(this.link+'reclamation_type');
  }

  addReclamation(body)
  {
    return this.http.post(this.link+"reclamation",body);
  }

  getAvailabilities()
  {
    return this.http.get(this.link+"availability");
  }

  getReclamations()
  {
    return this.http.get(this.link+"reclamation",this.header);
  }

  getOneReclamation(id_reclamation)
  {
    return this.http.get(this.link+"reclamation/"+id_reclamation);
  }

  getReclamationStates()
  {
    return this.http.get(this.link+"reclamation_state");
  }

  addState(body)
  { 
    return this.http.post(this.link+"reclamation_attachState",body,this.header);
  }

  deleteReclamation(id_reclamation)
  {
    return this.http.delete(this.link+"reclamation/"+id_reclamation,this.header);
  }

  print(id_reclamation)
  {
    return this.http.get(this.link+"reclamationPdf/"+id_reclamation,this.header);
  }

  get header()
  {
    return AuthentificationService.headerAuthorization();
  }

 
}
