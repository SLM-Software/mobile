import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { 
  GoogleMaps, 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsAnimation,
  MyLocation,
  LatLng, 
  CameraPosition, 
  MarkerOptions, 
  Marker, 
  GoogleMapOptions, 
  GoogleMapsMapTypeId 
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-storelocator',
  templateUrl: 'storelocator.html',
})
export class StorelocatorPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private googleMaps : GoogleMaps) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorelocatorPage');
  }

  loadMap() {
    let latLng = new LatLng(-34.9290, 138.6010);

    this.map = new GoogleMap('map', {
      controls : {
        compass: true,
        myLocationButton: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera : {
        target: {
          lat: -34.9290,
          lng: 138.6010
        },
        zoom: 15,
        tilt: 30
      },
      mapType: "MAP_TYPE_ROADMAP"
    });
    this.map.setMapTypeId("MAP_TYPE_ROADMAP");

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

}
