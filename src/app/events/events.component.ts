import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from "ngx-onsenui";

import { AppComponent } from "../app.component";
import { Globals } from "../globals";
import { DateformatService } from "../dateformatter";
import * as ons from "onsenui";
import { Sortservice } from "../sort";
//import { EventcardComponent } from "../eventcard/eventcard.component";

@Component({
  selector: "ons-page[events]",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private dateFormat: DateformatService
  ) {}

  list= [];

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  event_generate_summary() {
  for (var i=0; i<this.globals.eventA.length; i++)
  {
    var list = this.globals.event.find(f => f.eventid == this.globals.eventA[i].eventid);
    var share = this.globals.eventS.find(f => f.event == this.globals.eventA[i].eventid);
    var shareS = this.globals.eventSS.find(f => f.event == this.globals.eventA[i].eventid);
    let evt = this.globals.eventA[i];
    var li = new Object;
    // Sharing
    li.name = evt.name;
    li.startdate = evt.startdate;
    li.enddate = evt.enddate;
    li.dates = this.eventdates(evt.startdate,evt.enddate)
    li.eventid = evt.eventid;
    li.shared = false;
    if (shareS.hasOwnProperty('items')){
    li.shared =  share.items.length - 1 > 1;
    }
    li.sharee = false;
    if (evt.extra!="") { 
       var shar =  JSON.parse(evt.extra)
       if (shar.sharing.hasOwnProperty('sharee')) {
       li.sharee = true 
        }
    }
    
    li.count = 0;
    li.countL = 0;
    if (!li.shared) {
   for (var j = 0; j < list.items.length; j++) {
      if (list.items[j].attending == "Yes") {
        if (list.items[j].patrolid != -2) {
          li.count++;
        }
        if (list.items[j].patrolid == -2) {
          li.countL++;
        }
      }
    } 
  }
    for (var j = 0; j < share.items.length; j++) {
       // if (share.items[j].sectionid != this.globals.mysection) {
          if (share.items[j].patrolid != -2) {
            li.count++;
          }
          if (share.items[j].patrolid == -2) {
            li.countL++;
          }
       // }
    }
   li.eventlimit = 0
    if (evt.hasOwnProperty("attendancelimit")) {
      li.eventlimit = evt.attendancelimit;
    }

   if (shareS.hasOwnProperty('items')){
    if (li.shared) {
     li.eventlimit = 0; 
   //  debugger;
     for (var j = 0; j < shareS.items.length; j++) { 
       if (shareS.items[j].hasOwnProperty('sectionid')){
       li.eventlimit = li.eventlimit + shareS.items[j].attendancelimit;
       }
      }
    }
   }
//Maximum Share limit
    if (evt.extra!="") { 
       var shar =  JSON.parse(evt.extra)
       if (shar.sharing.limit>0)  
        {li.eventlimit =shar.sharing.limit}
    }
    
  li.eventlimitldr = 0;
  if (evt.hasOwnProperty("limitincludesleaders")) {
      li.eventlimitldr = evt.limitincludesleaders;
    }
  if (li.eventlimit ==0)
    { li.class = "blue"} 
  if (li.eventlimit !=0){
    var p = li.count / li.eventlimit;
      if (p <= 0.5) {
        li.class = "green";
      }
      if (p > 0.5 && p < 0.75) {
        li.class = "amber";
      }

      if (p >= 0.75) {
        li.class = "red";
      }
  }


  var d = new Date(evt.confdate);
    var now2 = new Date();
    var d2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
    var diff = (d.getTime() - d2.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    // return Math.abs(Math.round(diff));
    li.signup = Math.round(diff);

  this.list.push(li);
  }
}
  

  event_option(eventid, s) {
    var list = this.globals.event.find(f => f.eventid == eventid);
    var evt = this.globals.eventA.find(f => f.eventid == eventid);
    var share = this.globals.eventS.find(f => f.event == eventid);
    var count = 0;
    for (var i = 0; i < list.items.length; i++) {
      if (list.items[i].attending == s)
        if (
          evt.limitincludesleaders == 1 ||
          (evt.limitincludesleaders == 0 && list.items[i].patrolid != -2)
        ) {
          count++;
        }
    }
    for (var i = 0; i < share.items.length; i++) {
      if (share.items[i].sectionid != this.globals.mysection) {
        if (
          evt.limitincludesleaders == 1 ||
          (evt.limitincludesleaders == 0 && share.items[i].patrolid != -2)
        ) {
          count++;
        }
      }
    }
    return count;
  }

  is_shared(event,direction) {
    /* if (event.extra!="") { 
 return  JSON.parse(event.extra).hasOwnProperty('sharing')
 } else 
 {return false} */
    var f = this.globals.eventSS.find(e => e.event == event.eventid);
    if (direction==1){
    if (f.hasOwnProperty('items')){
    return f.items.length - 1 > 1;
    } else return false;
    }
    if (direction==2){
      if (event.extra!="") { 
       var shar =  JSON.parse(event.extra)
       if (shar.sharing.hasOwnProperty('sharee'))
       return true 
        } else 
 {return false}
    } else 
 {return false}
  }


  event_option2(eventid, s, l) {
    var list = this.globals.event.find(f => f.eventid == eventid);
    var evt = this.globals.eventA.find(f => f.eventid == eventid);
    var share = this.globals.eventS.find(f => f.event == eventid);
    var count = 0;
    for (var i = 0; i < list.items.length; i++) {
      if (list.items[i].attending == s) {
        if (l == 0 && list.items[i].patrolid != -2) {
          count++;
        }
        if (l == 1 && list.items[i].patrolid == -2) {
          count++;
        }
      }
    }


    if ("Yes" == s) {
      for (var i = 0; i < share.items.length; i++) {
        if (share.items[i].sectionid != this.globals.mysection) {
          if (l == 0 && share.items[i].patrolid != -2) {
            count++;
          }
          if (l == 1 && share.items[i].patrolid == -2) {
            count++;
          }
        }
      }
    }
    return count;
  }

  event_class(eventid) {
    var el = this.event_limit(eventid);
    var c = this.event_option(eventid, "Yes");
    if (el == 0) {
      return "blue";
    } else {
      var p = c / el;
      if (p <= 0.5) {
        return "green";
      }
      if (p > 0.5 && p < 0.75) {
        return "amber";
      }

      if (p >= 0.75) {
        return "red";
      }
    }
  }

  event_limit(eventid) {
    var event = this.globals.eventA.find(f => f.eventid == eventid);
    if (event.hasOwnProperty("attendancelimit")) {
      return event.attendancelimit;
    } else return 0;
  }

  event_limit_inc(eventid) {
    var event = this.globals.eventA.find(f => f.eventid == eventid);
    if (event.hasOwnProperty("limitincludesleaders")) {
      return event.limitincludesleaders;
    } else return 0;
  }

  signup(date) {
    var d = new Date(date);
    var now2 = new Date();
    var d2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
    var diff = (d.getTime() - d2.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    // return Math.abs(Math.round(diff));
    return Math.round(diff);
  }

  eventdates(s, e) {
    var subtitle = "";
    if (e == "1970-01-01") {
      e = null;
    }
    // if (e!=null) { subtitle = "From "; }
    subtitle = subtitle + this.dateFormat.date_format_date(s, false);
    if (e != null) {
      subtitle = subtitle + " - ";
      subtitle = subtitle + this.dateFormat.date_format_date(e, false);
      subtitle =
        subtitle +
        " (" +
        this.dateFormat.date_format_days_between(s, e) +
        " day";
      if (this.dateFormat.date_format_days_between(s, e) > 1) {
        subtitle = subtitle + "s";
      }
      subtitle = subtitle + ")";
    }
    return subtitle;
  }

  go(e, event) {
    this._navigator.element.pushPage(EventcardComponent, {
      data: { index: event.eventid }
    });
  }


  ngOnInit() {
   this.event_generate_summary();
    this.list.sort(
      this.sorting.compareValuesArray(["startdate"], "desc")
    );
  }
}
