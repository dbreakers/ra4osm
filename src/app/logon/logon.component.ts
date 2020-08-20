
import {
  Component,
  Injector,
  ViewChild,
  ModalFactory,
  Params,
  OnInit,
  OnsSplitterSide,
  OnsNavigator,
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';

import { AppComponent } from '../app.component';
import { PageNav1Component } from '../PageNav1/PageNav1.component';
import { SectionselectComponent} from '../sectionselect/sectionselect.component';
import { MenuComponent } from '../menu/menu.component';
import { Globals } from '../globals';
import * as ons from 'onsenui';
import { LogonService } from '../logon.service';
import { Security } from '../security';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent  {
 //var error_text: string;
 error_text = "";

  constructor(private _navigator: OnsNavigator, 
              private inj: Injector,
              private logonService: LogonService, 
              private globals: Globals) { }

  push():void {
//ons.notification.alert('Logon');
    this._navigator.element.pushPage(PageNav1Component);
  }

find_current_term() {
    var current_term = -1;
    for (var i = 0; i < this.globals.config[2][this.globals.mysection].length; i++) {
      if (this.globals.config[2][this.globals.mysection][i].past == true) { current_term = i }
    }
    var term = this.globals.config[2][this.globals.mysection][current_term].termid;
    this.globals.current_term = current_term;

}

section_data_return(data) {
  this.globals.sectiondata = data;
  this.logonService.setAPIvalues();
  this._navigator.element.replacePage(MainComponent);
}

section_API_return(api) {
  let apiv = api[0].apis.find(i => i.apiid == 41);
  this.logonService.setAPIvalues2(apiv);
   this.logonService.getSectionData(this.globals.mysection,this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
}

section_config_return(s) {
  this.globals.configread = true;
  this.globals.loaded.config = true;
    this.globals.config = s;
    var found = false;
    for (var i = 0; i < this.globals.config[1].length; i++) {
      if (this.globals.config[1][i].sectionid==this.globals.mysection)
      {
        found = true;
        this.globals.sectionname = this.globals.config[1][i].groupname + ":" + this.globals.config[1][i].sectionname;
        this.find_current_term();
      }
    }
    if ((this.globals.mysection=="")||(found==false))
    {
      this.globals.mysection = this.globals.config[1][0].sectionid;
      if (this.globals.config[1].length==1){
        found = true;
        this.globals.sectionname = this.globals.config[1][0].groupname + ":" + this.globals.config[1][0].sectionname;
        this.find_current_term();
      }
    }
  if (found!=true)
  {
    this._navigator.element.replacePage(SectionselectComponent);
    
  } else
  {
    
  //   this.logonService.getSectionData(this.globals.mysection,this.globals.config[2][this.globals.mysection][this.globals.current_term].termid).subscribe(SectionConfig => this.section_data_return(SectionConfig));
  this.logonService.getAPIdata(this.globals.mysection).subscribe(SectionConfig => this.section_API_return(SectionConfig));
}
}
  post_logon(api_return : any)
  {
    if (api_return.hasOwnProperty('error'))
    { this.error_text = api_return.error;    modal.hide(); } else
    { this.globals.secret = api_return.secret;
    this.globals.userid = api_return.userid;
    //this.globals.pageload = false;
    //this._navigator.element.replacePage(SectionselectComponent).then(alert("me"));
 
     this.logonService.getSectionConfig().subscribe(SectionConfig => this.section_config_return(SectionConfig));

    
    }
  }

  logon(username2 : string,password2:string): void {
    this.validate(username2, password2);
    if (( this.error_text == "" ) && (password2=="")) {this.error_text = "You must enter a password";}
    if (this.error_text=="")
    {
          modal.show(); 
       this.logonService.doLogon(username2,password2).subscribe(Security=> this.post_logon(Security));

    }
  }


   validate2(email,password) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  {
     return false
    //ons.notification.alert('Mail '+ email);
  } else {
    
    
  if (password=="") {return false} 
  }
  //this.error_text = "";
  return true;
   }

  validate(email,password) {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
  {
    this.error_text = "You have entered an invalid email address!";
    
    //ons.notification.alert('Mail '+ email);
  } else {
    this.error_text = "";

       }
   
  }


  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }

  
}