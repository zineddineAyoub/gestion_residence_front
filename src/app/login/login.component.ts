import { NavBarComponent } from './../nav-bar/nav-bar.component';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ElementRef} from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
 

  form = new FormGroup({
    email : new FormControl('',
    [Validators.required,
    Validators.minLength(3)
  ]),
    password : new FormControl('',Validators.required)
  });

  constructor(
    private service:AuthentificationService,
     private router : Router,
     private elementRef: ElementRef
     ) { }

  ngOnInit(): void {
  //  this.elementRef.nativeElement.ownerDocument.body.style.background= '.background';
  }

  login()
  {  
    this.service.login(this.form.value).subscribe(response=>{
      if(response)
      {
          this.router.navigate(['article']);
      }  
    },
    (error : Response)=>{
      if(error.status === 401)
      {
        this.form.setErrors({invalidLogin:true})
      }
    });
  }
}
