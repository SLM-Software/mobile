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
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-storelocator',
  templateUrl: 'storelocator.html',
})
export class StorelocatorPage {

  map: GoogleMap;
  storeMarkers; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private googleMaps : GoogleMaps, public geolocation: Geolocation) {

    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorelocatorPage');
  }

  loadMap() {
    let storeMarkers : any =  [
      {
        name : "Dragon's Gate",
        latitude : '37.7907',
        longitude : '-122.4056'
      }
    ];

    this.geolocation.getCurrentPosition().then((position) => {
      console.log("Current position : %o", position);

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
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 15,
          tilt: 30
        },
        mapType: "MAP_TYPE_ROADMAP"
      });
 
      //this.map.on(GoogleMapsEvent.MAP_READY).subscribe(this.addMarker);
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(this.addMarker);

    });

    this.geolocation.watchPosition().subscribe((position) => {
      this.map.animateCamera({
        target: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        duration: 5000 // 5 secs
      });
    });
  }

  addMarker() {
    let storeMarkers : any =  [
      {
        name : "Dragon's Gate",
        latitude : '37.7907',
        longitude : '-122.4056'
      }
    ];

    console.log("Store markers : %o", storeMarkers);
    for (var _i=0; _i < storeMarkers.length; _i++) {
      console.log("Adding marker : %o", storeMarkers[_i]);
      this.map.addMarker({
        title: storeMarkers[_i].name,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: Number(storeMarkers[_i].latitude),
          lng: Number(storeMarkers[_i].longitude)
        }
      })
      .then(marker=> {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            alert('clicked');
          });
      });
    }

  }
}
