import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  mapCont: Mapboxgl.Map;
  marker: Mapboxgl.Marker

  ngOnInit(){
    if(!navigator.geolocation){ console.log('NOT SUPPORTED') }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      
      Mapboxgl.accessToken = environment.mapboxKey;

      this.mapCont = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coords.longitude, coords.latitude],
      zoom: 14
      });
      this.marker = new Mapboxgl.Marker().setLngLat([coords.longitude, coords.latitude]).addTo(this.mapCont);      
    });
    this.watchPosition();

  }

  watchPosition(){
    let deslat = 0;
    let deslon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      if(position.coords.latitude === deslat){
        navigator.geolocation.clearWatch(id);
      }
    },(err) => {
      console.log(err)
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0
    })
  }


}

