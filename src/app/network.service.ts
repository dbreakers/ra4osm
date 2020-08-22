import { Injectable } from "@angular/core";
import { Security } from "./security";
//import { SECURITY } from './mock-security';
import { Observable, forkJoin, of, from } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEvent,
  HttpRequest,
  HttpInterceptor,
  HttpHandler 
} from "@angular/common/http";
import { CustomURLEncoder } from "./urlencoder.component";
import { map, concatMap, catchError,tap } from "rxjs/operators";
import { Globals } from "./globals";
import { timer } from "rxjs/observable/timer";
import { switchMap, mergeMap, toArray } from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  })
};

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  private configUrl = this.globals.proxyURL;
  constructor(private http: HttpClient, private globals: Globals) {}

  slowhttp = true; // Use concatMap rather than forkJoin

   
  doLogon(user: string, password: string): Observable<Security> {
    let authURL = this.configUrl + "?osmpath=users.php&action=authorise";
    let body = new HttpParams();
    body = body.set("email", user);
    body = body.set("password", password);
    return this.http
      .post<Security>(authURL, body, httpOptions)
      .pipe(catchError(error => of(error)));
  }

  setAPIvalues() {
let apiv = this.globals.sectiondata[2].apis.find(i => i.apiid == 41);
this.setAPIvalues2(apiv);
  }

  setAPIvalues2(apiv) {
    
    this.globals.access.members = "";
    this.globals.access.events = "";
    this.globals.access.progs = "";
    this.globals.access.register = "";
    this.globals.access.badges = "";
    this.globals.access.noaccess = true;
    this.globals.access.progs = "";
    /* this.globals.memberaccess = "";
    this.globals.badgeaccess = "";
    this.globals.eventsaccess = "";
    this.globals.programmeaccess = "";
    this.globals.registeraccess = "";
    this.globals.noaccess = true; */
    if (apiv! != undefined) {
      if (!apiv.permissions.hasOwnProperty("empty")) {
        this.globals.access.members = apiv.permissions.member;

        this.globals.access.events = apiv.permissions.hasOwnProperty("events")
          ? apiv.permissions.events
          : 0;
        this.globals.access.progs = apiv.permissions.hasOwnProperty("programme")
          ? apiv.permissions.programme
          : 0;
        this.globals.access.register = apiv.permissions.hasOwnProperty(
          "register"
        )
          ? apiv.permissions.register
          : 0;
        this.globals.access.badges = apiv.permissions.hasOwnProperty("badges")
          ? apiv.permissions.badges
          : 0;
        this.globals.access.qm = apiv.permissions.hasOwnProperty(
          "quartermaster"
        )
          ? apiv.permissions.quartermaster
          : 0;
        this.globals.access.noaccess = false;
      }
    }
  }

  has_http_errors(a) {
    var e = false;
    for (var i = 0; i < a.length; i++) {
      if (a[i].hasOwnProperty("isError")) {
        e = true;
        i = a.length;
      }
    }
    return e;
  }

  getSectionConfig(): Observable<any> {
    let fullURL = this.configUrl + "?osmpath=api.php&action=getSectionConfig";
    let fullURL2 = this.configUrl + "?osmpath=api.php&action=getUserRoles";
    let fullURL3 = this.configUrl + "?osmpath=api.php&action=getTerms";
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return forkJoin(
      this.http
        .post(fullURL, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL2, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL3, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error })))
    );
  }

  getAPIdata(sectionid): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/settings/access/&action=getAPIAccess&sectionid=" +
      sectionid; // access
      let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

      return forkJoin(
      this.http
        .post(fullURL, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))))
  }

  getSectionData(sectionid, term): Observable<any> {
    let st = this.globals.config[1].find(i => i.sectionid == sectionid);
    let blankingURL = 
      this.configUrl + "?osmpath=api.php&action=getSectionConfig"
     
    let fullURL4 =
      this.configUrl +
      "?osmpath=ext/events/summary/&action=get&sectionid=" +
      sectionid +
      "&termid=" +
      term; //Events
    if ( this.globals.access.events < 10 ) {
      fullURL4 = blankingURL;
    }

    let fullURL5 =
      this.configUrl +
      "?osmpath=ext/programme/&action=getProgrammeSummary&sectionid=" +
      sectionid +
      "&termid=" +
      term; //Programme
      if  (this.globals.access.progs < 10 ){
      fullURL5 = blankingURL;
    }
    let fullURL6 =
      this.configUrl +
      "?osmpath=ext/settings/access/&action=getAPIAccess&sectionid=" +
      sectionid; // access
    
let fullURL7 =
      this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id=" +
      sectionid +
      "&type=programme&associated_id=0"; 
    if ( this.globals.access.events < 10 ) {
      fullURL7 = blankingURL;
    }
let fullURL8 =
      this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id=" +
      sectionid +
      "&type=generic_event&associated_id=0"; 
    if ( this.globals.access.events < 10 ) {
      fullURL7 = blankingURL;
    }


    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    let body2 = new HttpParams();
    body2 = body2.set("secret", this.globals.secret);
    body2 = body2.set("userid", this.globals.userid);
    body2 = body2.set("section_id", sectionid);
    body2 = body2.set("term_id", term);
    return forkJoin(
      
       
      this.http
        .post(fullURL4, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL5, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
      this.http
        .post(fullURL6, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
        this.http
        .post(fullURL7, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
        this.http
        .post(fullURL8, body, httpOptions)
        .pipe(catchError(error => of({ isError: true, error }))),
       
    );
  }



  getEventData(event): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id="+this.globals.mysection+"&type=event&associated_id=" +
      event;
    fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(tap(d=> d.event = event), catchError(error => of({ isError: true, error })))
  }
  getEventData2(event) {
    let fullURL =
     this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id="+this.globals.mysection+"&type=event&associated_id=" +
      event;
   /* fullURL =
      fullURL +
      "&sectionid=" +
      this.globals.mysection +
      "&termid=" +
      this.globals.config[2][this.globals.mysection][this.globals.current_term]
        .termid;*/
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);

    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(tap(d=> d.event = event), catchError(error => of({ isError: true, error })))
  }

  getEventsData(): Observable<any> {
    //  let singleObservables = this.globals.sectiondata[3].items.map( event => this.getEventData(event.eventid) )
// RAs
    if (!this.slowhttp) {
      
      let singleObservables = this.globals.sectiondata[0].items.map(event =>
        this.getEventData(event.eventid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[0].items.map(event =>
        this.getEventData2(event.eventid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray()); 
    }
    //return forkJoin(singleObservables);
  }
  //https://www.onlinescoutmanager.co.uk/ext/risk_assessments/?action=getRiskAssessment&section_id=3320&type=meeting&associated_id=5015897
  getProgData(prog): Observable<any> {
    let fullURL =
      this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id="+this.globals.mysection+"&type=meeting&associated_id=" +
      prog;
   
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(tap(d=> d.prog = prog), catchError(error => of({ isError: true, error })))
  }

  getProgData2(prog) {
      let fullURL =
      this.configUrl +
      "?osmpath=ext/risk_assessments/&action=getRiskAssessment&section_id="+this.globals.mysection+"&type=meeting&associated_id=" +
      prog; 
    let body = new HttpParams();
    body = body.set("secret", this.globals.secret);
    body = body.set("userid", this.globals.userid);
    // return this.http.post(fullURL,body,httpOptions).pipe(catchError(error => of(error)))
    return this.http
      .post(fullURL, body, httpOptions)
      .pipe(tap(d=> d.prog = prog), catchError(error => of({ isError: true, error })))
  }

  f(x) {
    return x;
  }

  getProgsData(): Observable<any> {
    if (!this.slowhttp) {
      let singleObservables = this.globals.sectiondata[1].items.map(prog =>
        this.getProgData(prog.eveningid)
      );
      return forkJoin(singleObservables);
    } else {
      let singleObservables = this.globals.sectiondata[1].items.map(prog =>
        this.getProgData2(prog.eveningid)
      );
      return from(singleObservables)
        .pipe(concatMap(param => this.f(param)))
        .pipe(toArray());
    }
  }

}
  
  // 

