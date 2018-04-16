import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ScanpassPage } from '../../pages/scanpass/scanpass';

declare var google;

@Component({
  selector: 'page-storelocator',
  templateUrl: 'storelocator.html',
})
export class StorelocatorPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  storeMarkers: any; 
  currentMarker: any;
  blnHideOverlay : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation) {

    this.storeMarkers  =  [
      {
        name : "Hudson's Bay",
        latitude : 42.252865,
        longitude : -73.790962
      }
    ];

    this.platform.ready().then(() => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorelocatorPage');
    this.loadMap();
  }

  public hideOverlay() {
    this.blnHideOverlay = true;
  };

  public btnLoungeClicked() {
    this.navCtrl.push(ScanpassPage);
  }

  private loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      console.log("Current position : %o", position);
      // FOR TESTING ONLY
      let LatLng = new google.maps.LatLng(42.252863, -73.790961);
      //let LatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      let mapOptions = {
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
        center: LatLng,
        zoom: 15,
        //tilt: 30,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.currentMarker = new google.maps.Marker({
        map: this.map,
        position: LatLng
      });
    }, (err) => {
        console.log("Error : " + JSON.stringify(err));
    });
    
    //this.map.on(GoogleMapsEvent.MAP_READY).subscribe(this.addMarker);
    //this.map.on(google.maps.GoogleMapsEvent.MAP_READY).subscribe(this.addMarker);
    this.addMarker();

    this.geolocation.watchPosition().subscribe((position) => {
      this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }, (err) => {
      console.log("Error : " + JSON.stringify(err));
    });
  }

  private addMarker() {

    console.log("Store markers : " + JSON.stringify(this.storeMarkers));

    for (var _i=0; _i < this.storeMarkers.length; _i++) {
      console.log("Adding marker : " + JSON.stringify(this.storeMarkers[_i]));
      let marker = new google.maps.Marker({
      //this.map.addMarker({
        map: this.map,
        title: this.storeMarkers[_i].name,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.storeMarkers[_i].latitude, this.storeMarkers[_i].longitude)
      });
      let content = "<h4>Information!</h4>";
      this.addInfoWindow(marker, content);
    }
      //.then(marker=> {
      //  marker.on(google.maps.GoogleMapsEvent.MARKER_CLICK)
      //    .subscribe(() => {
      //      alert('clicked');
      //    });
      //});
  } 

  private addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
