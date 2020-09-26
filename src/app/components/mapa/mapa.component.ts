import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapCont: Mapboxgl.Map;
  marker: Mapboxgl.Marker

  constructor( public dataService: DataService ) {}
  
  ngOnInit(){
    if(!navigator.geolocation){ console.log('NOT SUPPORTED') }
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;

      this.dataService.Alng = coords.longitude;
      this.dataService.Alat = coords.latitude;

      Mapboxgl.accessToken = environment.mapboxKey;
     
      this.mapCont = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coords.longitude, coords.latitude],
      zoom: 14
      });

      this.marker = new Mapboxgl.Marker({draggable: true})
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(this.mapCont); 
      
      this.marker.on('drag', () => {
          this.dataService.Dlng = this.marker.getLngLat().lng;
          this.dataService.Dlat = this.marker.getLngLat().lat;
      });
    });

    this.watchPosition();
  }

  watchPosition(){
    let deslat = 0;
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
