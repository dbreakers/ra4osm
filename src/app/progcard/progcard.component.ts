// this.globals.progs.find(i => i.items[0].eveningid == 4282328)

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
} from 'ngx-onsenui';

//import {DomSanitizer} from '@angular/platform-browser'
import * as ons from 'onsenui';
import { AppComponent } from '../app.component';
import { Globals } from '../globals';
//import {  PhotoURLService } from '../photoUrl';
//import { AttendancetabComponent } from './attendancetab/attendancetab.component';
//import { AnswertabComponent } from './answertab/answertab.component';
//import { ProgSummarytabComponent } from './summarytab/summarytab.component';


@Component({
  selector: 'ons-page[progcard]',
  templateUrl: './progcard.component.html',
  styleUrls: ['./progcard.component.css']
})

export class ProgcardComponent implements OnInit {
    //members = new Array;
    prog = new Object;
    
    summarytab = ProgSummarytabComponent;
  //  attendancetab = AttendancetabComponent;
  //  answertab = AnswertabComponent;
  constructor(
    private _params: Params, 
    private _navigator: OnsNavigator,
  private inj: Injector,
  // private sanitizer: DomSanitizer,
    private globals: Globals,
  //  private photoURL: PhotoURLService
  ) { }


  
  ngOnInit() { 
    if (this._params.data && this._params.data.index){
      // this.globals.progs.find(i => i.items[0].eveningid == 4282328)
      this.globals.progcard = this._params.data.index;
      this.prog = this.globals.progs.find(i => i.items[0].eveningid == this.globals.progcard)
     //  this.event = this.globals.eventA.find(f=>f.eventid==this.globals.eventcard)
     //  this.eventd = this.globals.event.find(f=>f.eventid==this.globals.eventcard)
    }
 }  
  

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
}