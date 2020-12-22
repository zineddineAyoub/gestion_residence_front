import { AuthentificationService } from './../../services/authentification.service';
import { ReclamationService } from './../../services/reclamation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';




//import * as jspdf from 'jspdf';  
//import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  public reclamation;
  public states;
  public new_state=0;
  public notFound=false;
  public loaded=false;

  @ViewChild('found1', {static: false}) found1: ElementRef;

  constructor(private route:ActivatedRoute,private service:ReclamationService,public serviceAuth:AuthentificationService,private router:Router) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{

     this.service.getOneReclamation(data.get("id_reclamation")).subscribe((res=>{
       try {
        this.reclamation = res.json(); 
        this.loaded=true; 
        this.notFound=false;
  
       } catch (error) {
         console.log("lol");
          this.notFound=true;
          this.loaded=true;
         
       }
      
     
        
        console.log(this.reclamation);
        
     }))
    });

    this.service.getReclamationStates().subscribe((data)=>{
      console.log(data.json());
      this.states = data.json();
      
    })
  }

  

  addState()
  {
    if(confirm("Voulez Vous vraiment changer l'état à "+this.states[this.new_state-1].name_reclamation_state))
    {
      console.log(this.new_state);
    let body = {
      id_reclamation : this.reclamation["id_reclamation"],
      id_reclamation_state : this.new_state
    }

    console.log(body);
    
    this.service.addState(body).subscribe((data)=>{
      console.log(data);
      this.reclamation.reclamation_states.push(data.json());
      
    })
    }
    
  }

  delete(id_reclamation)
  {
    if(confirm("Voulez-vous vraiment supprimer cette réclamation"))
    {
      this.service.deleteReclamation(id_reclamation).subscribe((data)=>{
       // this.router.navigate(['listReclamation']);
        this.router.navigate(['listReclamation'], {state: {data: {deleted:true}}});
      })
    } 
  }

  print(code_reclamation)
  {
   // this.router.navigate(['http://localhost:1000/api/reclamationPdf/LG0QKF']);
    window.location.href = 'http://localhost:1000/api/reclamationPdf/'+code_reclamation;
  }
  


}
