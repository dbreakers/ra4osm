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

import { Observable, forkJoin, of, from } from "rxjs";

import { TermpickerComponent } from "../termpicker/termpicker.component";
 
import { ProgrammeComponent } from "../programme/programme.component";
 
import { EventsComponent } from "../events/events.component";
 
import { AppComponent } from "../app.component";
 
import { SectionselectComponent } from "../sectionselect/sectionselect.component";
 
import { Globals } from "../globals";
import { LogonService } from "../logon.service";
import { PhotoURLService } from "../photoUrl";
import * as ons from "onsenui";
import { Dropbox } from "dropbox";

@Component({
  selector: "ons-page[settings]",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  access = "";
  members = new Array();
  saved_data = [];
  genders = new Object();
  counter = 0;
  lastclick = "";
   
  termselect = TermpickerComponent;
   
  program = ProgrammeComponent;
  
  events = EventsComponent;
   
  sectionselect = SectionselectComponent;
   
  accessToken = "";
  win: any;
  ac = "";
  $scope = "";
  save_set = [];
  REDIRECT = "https://scouttoolset.firebaseapp.com/auth.html";

  images = new Object();
  dbx = new Dropbox({ clientId: "qxf5tksolzymekf" });

  @ViewChild("navi") private navi: OnsNavigator;

  constructor(
    private inj: Injector,
    private globals: Globals,
    private _navigator: OnsNavigator,
    private logonService: LogonService,
    private photoURL: PhotoURLService
  ) {}

  loadPage(page) {
    //  this.menu.nativeElement.close();
    //  this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
    this._navigator.element.pushPage(page, { animation: "fade" });
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  do_QM(qm) {
    this.globals.qmlist = qm;
    this.globals.loaded.qm = true;
  }

  do_events_loaded() {
    if (
      this.globals.loaded.eventsS &
      this.globals.loaded.eventsA &
      this.globals.loaded.eventsL &
      this.globals.loaded.eventsSS
    ) {
      this.globals.loaded.events = true;
    }
  }

  do_events(e) {
    this.globals.event = e;
    this.globals.loaded.eventsL = true;
    this.do_events_loaded();
  }

  do_eventsA(e) {
    this.globals.eventA = e;
    this.globals.loaded.eventsA = true;
    this.do_events_loaded();
  }

  do_eventsS(e) {
    this.globals.eventS = e;
    this.globals.loaded.eventsS = true;
    this.do_events_loaded();
  }

  do_eventsSS(e) {
    this.globals.eventSS = e;
    this.globals.loaded.eventsSS = true;
    this.do_events_loaded();
  }

  do_progs(p) {
    this.globals.progs = p;
    // this.globals.loadprogs=true;
    this.globals.loaded.progs = true;
  }
 
  validateToken(token) {}

  gup(url, name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regexS = "[#?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else return results[1];
  }

   
 

  ngOnInit() {
     
    //  if (this.globals.eventsection!=this.globals.mysection){

    if (!this.globals.access.noaccess) {
      var fj = [];
      if (!this.globals.loaded.events && this.globals.access.events > 0) {
        fj.push(
          this.logonService
            .getEventsData()
            .subscribe(Events => this.do_eventsA(Events))
        );
        fj.push(
          this.logonService
            .getEventsAData()
            .subscribe(Events => this.do_events(Events))
        );
        fj.push(
          this.logonService
            .getEventsSData()
            .subscribe(Events => this.do_eventsS(Events))
        );
        fj.push(
          this.logonService
            .getEventsSSData()
            .subscribe(Events => this.do_eventsSS(Events))
        );
      }
      if (!this.globals.loaded.progs && this.globals.access.progs > 0) {
        fj.push(
          this.logonService
            .getProgsData()
            .subscribe(Progs => this.do_progs(Progs))
        );
      }
      if (this.globals.access.qm > 0) {
      fj.push(
        this.logonService.getQMListData().subscribe(QM => this.do_QM(QM))
      );
      }
      forkJoin(fj);
    }
    //  }

    // Deal with the scenario where we have access but no data
    this.access = this.globals.sectiondata[5].apis.find(i => i.apiid == 41);
    if (this.globals.access.progs > 0) {
      if (this.globals.sectiondata[4].items.length == 0) {
        this.globals.loaded.progs = true;
      }
    }
    if (this.globals.access.events > 0) {
      if (this.globals.sectiondata[3].items.length == 0) {
        this.globals.loaded.events = true;
      }
    }
    
    
    
  }
}
