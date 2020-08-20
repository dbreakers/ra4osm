
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
import { MenuComponent } from '../menu/menu.component';
import { NetworkService } from '../network.service';
import { Globals } from '../globals';
import {  Sortservice } from '../sort';
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[cards]',
  templateUrl: './sectionselect.component.html'
})

export class SectionselectComponent implements OnInit, OnChanges {
  section = new Array;
  localsection = "";
  localname = "";

  constructor(private _navigator: OnsNavigator,
    private inj: Injector,
    private globals: Globals,
       private sorting: Sortservice,
    private networkService: NetworkService) { }

  push(event, index) {

    if (document.getElementById(this.localsection) != null) {
      document.getElementById(this.localsection).checked = false;
    };
    if (document.getElementById(index.sectionid) != null) {

      document.getElementById(index.sectionid).checked = true;
    }
    this.localsection = index.sectionid;

  }

  find_current_term() {
    var current_term = -1;
    
    if (this.globals.config[2].hasOwnProperty(this.globals.mysection)) {
      this.globals.config[2][this.globals.mysection].sort(this.sorting.compareValuesArray(["startdate"],"desc")) ;
      for (var i = 0; i < this.globals.config[2][this.globals.mysection].length; i++) {
        if (this.globals.config[2][this.globals.mysection][i].past == true) { current_term = i; i = this.globals.config[2][this.globals.mysection].length; }
      }
      var term = this.globals.config[2][this.globals.mysection][current_term].termid;
    }
    this.globals.current_term = current_term; 
  }

  section_data_return(data) {
    //alert("heelo");
    this.globals.sectiondata = data;
    this.globals.loaded.section = true;
      this.networkService.setAPIvalues();
      if (this._navigator.element.pages.length>1)
      {

 this._navigator.element.popPage({onTransitionEnd : function() {
     $scope.nav.replacePage(MenuComponent, { animation : 'none' }); }})} else {
    this._navigator.element.replacePage(MenuComponent);
 }
  }

  section_api(api,section,term) {
    let apiv = api[0].apis.find(i => i.apiid == 41);
  this.networkService.setAPIvalues2(apiv);
    this.networkService.getSectionData(section, term).subscribe(SectionConfig => this.section_data_return(SectionConfig));
  }

  select_section() {
    this.globals.config = this.section;
    this.globals.configread = true;
    this.globals.mysection = this.localsection;
    this.find_current_term();
    this.globals.loaded.events = false;
    this.globals.loaded.eventsA = false;
    this.globals.loaded.eventsL = false;
    this.globals.loaded.progs = false;
    this.globals.loaded.section = false;
    this.globals.loaded.qm = false;
    this.globals.event = [];
    this.globals.eventA = [];
    this.globals.progs = [];
    this.globals.qmlist = [];
    var f = this.globals.config[1].find(obj => obj.sectionid == this.localsection);
    this.globals.sectionname = f.groupname + ":" + f.sectionname;
    if (this.globals.current_term != '-1') {
     this.networkService.getAPIdata(this.globals.mysection).subscribe(apidata=>this.section_api(apidata,this.globals.mysection, this.globals.config[2][this.globals.mysection][this.globals.current_term].termid)) 
    //this.logonService.getSectionData(this.globals.mysection, this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
    } else {
      this.networkService.getAPIdata(this.globals.mysection).subscribe(apidata=>this.section_api(apidata,this.globals.mysection, -1) );
      //this.logonService.getSectionData(this.globals.mysection, '-1').subscribe(SectionConfig => this.section_data_return(SectionConfig));
      }


  }

  check() {
    alert("hello")
  }

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }
  /** 
    section_config_return(config) {
      this.section = config;
      this.globals.configread = true;
      this.globals.config = this.section;
      // Check we still have access to the chosen section
      var found = false;
      for (var i = 0; i < this.globals.config[1].length; i++) {
        if (this.globals.config[1][i].sectionid==this.globals.mysection)
        {
          found = true;
        }
      }
      if ((this.globals.mysection=="")||(found==false))
      {
        this.globals.mysection = this.globals.config[1][0].sectionid;
      }
    
    this.localsection = this.globals.mysection;
    if (found==true)
    {
  
  
  
    let promise = new Promise(function(resolve, reject) {  setTimeout(() => resolve("done!"), 400);  });
  
  promise.then(
    result => this._navigator.element.replacePage(MainComponent), // shows "done!" after 1 second
    error => alert(error) // doesn't run
  )
    };
    }
    */


  ngOnInit() {

    if (!this.globals.configread) {
      this.networkService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));
    } else {
    this.section = this.globals.config;
      this.localsection = this.globals.mysection;


      // resolve runs the first function in .then


    }
  }

  ngOnChanges() {
    this.section = this.globals.config;
    this.localsection = this.globals.mysection;
  }


}