import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-seatreservation',
  templateUrl: 'seatreservation.html',
})
export class SeatreservationPage {
  seatData = [
    [ {number: '1', isReserved: false, isDisabled: false}, 
      {number: '2', isReserved: false, isDisabled: false}, 
      {number: '3', isReserved: true, isDisabled: false}, 
      {number: '', isReserved: false, isDisabled: true}, 
      {number: '4', isReserved: false, isDisabled: false}, 
      {number: '5', isReserved: false, isDisabled: false}, 
      {number: '6', isReserved: false, isDisabled: false}
    ],
    [ {number: '7', isReserved: false, isDisabled: false}, 
      {number: '8', isReserved: false, isDisabled: false}, 
      {number: '9', isReserved: true, isDisabled: false}, 
      {number: '', isReserved: false, isDisabled: true}, 
      {number: '10', isReserved: false, isDisabled: false}, 
      {number: '11', isReserved: false, isDisabled: false}, 
      {number: '12', isReserved: false, isDisabled: false}
    ],
  ];
  selectedDate = {
    dateFormatted: moment().local().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    currentDay : moment().local().format("dddd"),
    minDate: moment().local().format("YYYY-MM-DD"),
    maxDate: moment().local().add(7,'days').endOf('day').format("YYYY-MM-DD"),
    minTime: moment().local().format("YYYY-MM-DD"),
    maxTime: moment().local().endOf("day").format("YYYY-MM-DD")
  };;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatreservationPage');
    this.initSelectedDate(null);
  }

  initSelectedDate(sDate) {
    /*
    if (sDate == null)
      sDate = new Date();

    this.selectedDate = {
      dateFormatted: sDate.toLocaleDateSeting(),
      minTime: sDate.setHours(0,0,0).toLocaleDateSeting(),
      maxTime: sDate.setDate(sDate + 7).setHours(24, 0, 0).toLocaleDateSeting()
    };
    console.log("Selected Date : %o", this.selectedDate);
    */
  }

  convertToLocalTimeString(oDate)
  {
    return new Date(oDate.getTime() - oDate.getTimezoneOffset() * 60000).toISOString();
  }
}
