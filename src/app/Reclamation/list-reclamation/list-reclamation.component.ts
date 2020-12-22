import { AuthentificationService } from './../../services/authentification.service';
import { Router } from '@angular/router';
import { ReclamationService } from './../../services/reclamation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {
  public reclamations;
  public deleted=false;
  constructor(private service:ReclamationService,private router:Router,private serviceAuth:AuthentificationService) { }

  ngOnInit(): void {
    if(!this.serviceAuth.isLoggedIn()){
      this.router.navigate(['login']);  
    }

    

    else{
      this.service.getReclamations().subscribe((data)=>{
        console.log(data.json());
        this.reclamations = data.json();
      })
    }

    try{
      if(history.state.data.deleted){
        this.deleted = true;
       }
    }
    catch {}
    
    
  }

  deleteReclamation(reclamation)
  {
    if(confirm("Voulez vous vraiment supprimer la réclamation N°: "+reclamation.code_reclamation))
    {
      this.service.deleteReclamation(reclamation.id_reclamation).subscribe((data)=>{
        this.reclamations = this.reclamations.filter(h=>h != reclamation);
        this.deleted=true;
      })
    }
    
  }

}
