import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-reclamation',
  templateUrl: './success-reclamation.component.html',
  styleUrls: ['./success-reclamation.component.css']
})
export class SuccessReclamationComponent implements OnInit {
  public code;
  constructor(private router:Router) { }

  ngOnInit(): void {
    try {
      this.scrollTop();
      this.code = history.state.data.code;
    } catch (error) {
      this.router.navigate(['/ajouterReclamation']);
    }    
  }

  scrollTop() {
    window.scroll(0,0);
}

}
