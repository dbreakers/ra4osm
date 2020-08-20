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

import { AppComponent } from '../app.component';
import { Globals } from '../globals';
import {  DateformatService } from '../dateformatter';
import * as ons from 'onsenui';
import {  Sortservice } from '../sort';
import { ProgcardComponent } from '../progcard/progcard.component';

@Component({
  selector: 'ons-page[programme]',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})

export class ProgrammeComponent implements OnInit {

 
constructor(
    private inj: Injector,
    private globals: Globals,
    private sorting: Sortservice,
    private _navigator: OnsNavigator,
    private dateFormat: DateformatService) { }

 openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }


timeformat(t) {
  var h = t.substring(0, 2);
  var m = t.substring(3, 5);
  var s = t.substring(6, 8);
  var ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12
  h = h ? h : 12;
  return h + ':' + m + ' ' + ampm;}

helpers_notif(evening){
  var e = this.globals.progs.find(i => i.items[0].eveningid == evening);
  if (e != undefined) {
  var needed = e.items[0].parentsrequired;
  var count = e.items[0].help.length;
  if (needed==0){return ""} else return count+"/"+needed;

  } else return ""
}


leaders_not(evening) {
  var e = this.globals.progs.find(i => i.items[0].eveningid == evening);
  if (e != undefined) { return e.items[0].unavailableleaders.length;
  } else return 0  
}
helpers(evening)
{
  var e = this.globals.progs.find(i => i.items[0].eveningid == evening);
  if (e != undefined) {
  var needed = e.items[0].parentsrequired;
  var count = e.items[0].help.length;
  if (needed == 0) return 0;
  if ((needed != 0)&&(count==0)) return 1;
  if ((needed != 0)&&(count<needed)) return 2;
  if ((needed != 0)&&(count>=needed)) return 3;
  }
}

eventdates(s,e) {
  var subtitle = "";
  if (e=="1970-01-01"){ e=null}
 // if (e!=null) { subtitle = "From "; }
  subtitle = subtitle + this.dateFormat.date_format_date(s,false);
  if (e!=null) {
    subtitle = subtitle + " - ";
    subtitle = subtitle + this.dateFormat.date_format_date(e,false);
    subtitle = subtitle + " (" + this.dateFormat.date_format_days_between(s,e)+" day";
    if (this.dateFormat.date_format_days_between(s,e)>1) {subtitle=subtitle+"s"}
    subtitle = subtitle + ")"; 
  }
  return subtitle
}

go(e,prog){
   this._navigator.element.pushPage(ProgcardComponent, { data: { index: prog.eveningid } });
}

ngOnInit() {
 // this.globals.eventA.sort(this.sorting.compareValuesArray(["startdate"],"desc"))

}
}