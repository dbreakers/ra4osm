import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  version: string = '1.0.1';
  login: boolean = false;
  secret: string = "";
  userid: string = "";
  mysection: string = "3329";
  application: string = "RA for OSM";
  proxyURL: string = "https://www.2ndnewhawscouts.org.uk/osmr/osmrelay2.php";
  configread: boolean = false;
  config: any;
  sectiondata: any;
  eventA:  Array<any> = [];
  progs:  Array<any> = [];
  qmlist:  Array<any> = [];
 // eventsection: string = "";
  current_term: string  = "-1";
 
  sectionname: string = "No Section";

 loaded: Object = { progs: false, events: false,  eventsL: false, eventsA: false, eventsS: false, eventsSS: false, members: false, register: false, config: false, section: false, qm: false}     
 access: Object = { noaccess: true, badges: "",progs: "", events: "", members: "", register: "", qm: ""}   
 errors: Object = { progs: false, events: false, members: false, register: false, config: false, section: false}  
}
