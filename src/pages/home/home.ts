import { Component , ViewChild , ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';


declare let google ;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
@ViewChild('map') mapElement : ElementRef ;

map:any;
  constructor(public navCtrl: NavController , public geolocation: Geolocation) {

  }
  
  
  ionViewDidLoad(){
    
    this.loadmap();
  }

  
  
  
  loadmap(){
    
    this.geolocation.getCurrentPosition().then((position)=>{
      
      
        let latlong = new google.maps.LatLng(position.coords.latitude ,position.coords.longitude);  
  let options = {
    
    center: latlong,
    zoom : 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP   //satellite is kind of map change with ROADMAP
    
  }
  
  this.map = new google.maps.Map(this.mapElement.nativeElement, options);
      
  var marker = new google.maps.Marker({position: latlong, map: this.map});
      
  var discribation = "Here your order will be come"
  
  var infowindow = new google.maps.InfoWindow({
    content: discribation
  });
      
   marker.addListener('click', function() {
    infowindow.open(this.map, marker);
  });     
      },(error)=>{console.log(error);
      
      });

}


}
