import { Router } from '@angular/router';
import { ReclamationService } from './../../services/reclamation.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {AgmMap,MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  public types;
  public success;

  public agmMap;
  public zoom = 5;
  public lat ;
  public lng ;

  public lat1 = 31.669746 ;
  public lng1 = -7.973328;

  public address;

  public getAddress;

  public days;
  public selectedDays=[];
  public daysRequired=false;
  public type_appartement=false;

  public noAddress;

   public form = new FormGroup({
   id_reclamation_type : new FormControl('',Validators.required),
   first_name_reclaimer : new FormControl('',[Validators.required,Validators.minLength(3)]),
   last_name_reclaimer : new FormControl(''),
   address_reclaimer : new FormControl(''),
   email_reclaimer : new FormControl(''),
   phone_number_reclaimer : new FormControl(''),
   description : new FormControl(''),
   horaire : new FormControl(''),
   editor : new FormControl('')
  });

  constructor(private service:ReclamationService,private apiloader:MapsAPILoader,private router:Router) { }

  ngOnInit(): void {
  
    this.service.getReclamationTypes().subscribe((data)=>{
      this.types = data.json();
      console.log(this.types);      
    });
    
    this.service.getAvailabilities().subscribe((data)=>{
     this.days=data.json();
      
      console.log(this.days);
      
    })
  }

  submit()
  {
    if(this.form.value["address_reclaimer"])
    {
      console.log(this.form.value);
    this.form.value["code_reclamation"]= this.makeRandom();
    if(this.lat && this.lng)
    {
      this.form.value["latitude"]=this.lat;
      this.form.value["longitude"]=this.lng;
    }
   console.log("LENGTH",this.selectedDays.length);
   
   if(this.form.value["id_reclamation_type"]==1 && this.selectedDays.length<1 )
   {
       this.daysRequired=true;   
    }

   else
   {
    this.form.value["availabilities"]=this.selectedDays;
    this.service.addReclamation(this.form.value).subscribe((data)=>
    {
      console.log(data.json()); 
      console.log(data.json().code_reclamation);
      let code = data.json().code_reclamation
      this.router.navigate(['/reclamationAjouté'], {state: {data: {code}}});
    })
   }
      
    }
    else{
      this.noAddress=true;
    }
    
  }

  telephone($event)
  {
    console.log($event);
    
     if(!((0<=$event["key"] && $event["key"]<=9) || $event["key"]=="+" || $event["key"]=="Backspace" || $event["key"]=="CapsLock" || $event["key"]=="Enter"))
    {      
      this.form.patchValue({
        phone_number_reclaimer:this.form.value["phone_number_reclaimer"].slice(0, -1)
      })
    }
   
   }

    makeRandom() {
    let text = "";
    let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  get(){
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
        this.zoom=16;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.lat1 = this.lat;
        this.lng1 = this.lng;
        console.log("THEY AAAREE",this.lat,this.lng);
        
        this.getAddress=(this.lat,this.lng)
        console.log(position)
  
        this.apiloader.load().then(() => {
          let geocoder = new google.maps.Geocoder;
          let latlng = {lat: this.lat, lng: this.lng};
          
         
          geocoder.geocode({'location': latlng}, results=> {
              
            console.log(results);
            
              if (results[0]) {
                //this.address= results[0].formatted_address;
                 
                this.form.patchValue({
                  address_reclaimer: results[0].formatted_address
                });
                
                console.log(this.form.value);
                
              } else {
                console.log('Not found');
              }
          });

         
        });
  
      }
    })
  }
  
  }

  googleMaps()
  {
    
    this.get();
    this.noAddress=false;
  }

  checked(day)
  {
    if( this.selectedDays.some(tag => tag ===  day))
   {
    
     this.selectedDays = this.selectedDays.filter(h=>h != day);
     
   }
   else{
    this.selectedDays.push(day);
   }
   
    console.log(this.selectedDays);
    console.log("LENGTH",this.selectedDays.length);
    
  }

}
