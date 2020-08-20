import {
  Component,
  Injector,
  ViewChild,
  Params,
  OnInit,
  OnChanges,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { AppComponent } from '../app.component';
import { MedicalcardComponent } from '../medicalcard/medicalcard.component';
import { MenuComponent } from '../menu/menu.component';
import {  DateformatService } from '../dateformatter';
import { NetworkService } from '../network.service';
import { Globals } from '../globals';
import * as ons from 'onsenui';
import {  Sortservice } from '../sort';

@Component({
  selector: 'ons-page[cards]',
  templateUrl: './termpicker.component.html'
})

export class TermpickerComponent implements OnInit {
  section = new Array;
  localterm = "";
  termscopy = [];
  localtermid = "";

  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private dateFormat: DateformatService,
    private networkService: NetworkService) { }

  push(event, index, i) {
    this.localterm = i;   
  }

   section_data_return(data) {
  this.globals.sectiondata = data;
  this.globals.event = [];
  this.globals.eventA = [];
  this.globals.progs = [];
  this.networkService.setAPIvalues();
   this.globals.loaded.events = false;
    this.globals.loaded.eventsA = false;
    this.globals.loaded.eventsL = false;
    this.globals.loaded.progs = false;
    this.globals.loaded.section = false;
  this._navigator.element.replacePage(MenuComponent);

  }

  select_term() {
    this.globals.current_term = this.localterm;
  if (this.globals.current_term!='-1') {
   this.networkService.getSectionData(this.globals.mysection,this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
  } else
  {
    this.networkService.getSectionData(this.globals.mysection,'-1').subscribe(SectionConfig => this.section_data_return(SectionConfig));
  }
  }
  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  termdates(s,e) {
    var subtitle = "From "+this.dateFormat.date_format_date_nd(s,false) +" to "+ this.dateFormat.date_format_date_nd(e,false)
    return subtitle;
  }


  ngOnInit() {
   
    if (!this.globals.configread) {
    //  this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));
    } else { 
      this.section = this.globals.config;
      this.localterm = this.globals.current_term;
      this.localtermid = this.section[2][this.globals.mysection][this.localterm].termid;
      this.termscopy = this.section[2][this.globals.mysection]
      this.termscopy.sort(this.sorting.compareValuesArray(["startdate"],"desc")) ;
      this.localterm = this.termscopy.findIndex(i=>i.termid==this.localtermid);
      if (this.localterm != this.globals.current_term) {this.globals.current_term=this.localterm}
      }
    
  }
  


}