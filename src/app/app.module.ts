//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import { HttpClientModule }    from '@angular/common/http';
//import {enableProdMode} from '@angular/core';
//import {HttpClientModule} from 'ngx-http-client';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
//import { environment } from '../environments/environment';
import { LogonComponent } from './logon/logon.component';
//import { RegisterComponent } from './register/register.component';
import { ProgcardComponent } from './progcard/progcard.component';
import { ProgrammeComponent } from './programme/programme.component';
//import { PageNav1Component } from './PageNav1/PageNav1.component';
//import { ScoutcardComponent } from './scoutcard/scoutcard.component';
import { TermpickerComponent } from './termpicker/termpicker.component';
//import { MedicalcardComponent } from './medicalcard/medicalcard.component';
//import { LeaderrostaComponent } from './leaderrosta/leaderrosta.component';
//import { MedicalsummaryComponent } from './medicalsummary/medicalsummary.component';
//import { BirthdayComponent } from './birthday/birthday.component';
//import { QMListsComponent } from './qmlists/qmlists.component';
//import { QMcardComponent } from './qmcard/qmcard.component';
//import { LastcheckedComponent } from './lastchecked/lastchecked.component';
//import { GlobalsearchComponent } from './globalsearch/globalsearch.component';
//import { RostaComponent } from './rosta/rosta.component';
import { SectionselectComponent } from './sectionselect/sectionselect.component';
import { MenuComponent } from './menu/menu.component';
//import { MedicalComponent } from './medical/medical.component';
import { Globals } from './globals';

//import { EventtabComponent } from './scoutcard/eventtab/eventtab.component';
//import { PersontabComponent } from './scoutcard/persontab/persontab.component';
//import { EventcardComponent } from './eventcard/eventcard.component';
//import { SummarytabComponent } from './eventcard/summarytab/summarytab.component';
//import { ProgSummarytabComponent } from './progcard/summarytab/summarytab.component';
//import { AnswertabComponent } from './eventcard/answertab/answertab.component';
//import { AttendancetabComponent } from './eventcard/attendancetab/attendancetab.component';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [OnsenModule, HttpClientModule
  //,ServiceWorkerModule.register('@angular/service-worker/ngsw-worker.js')
  ],
  declarations: [AppComponent, LogonComponent, SectionselectComponent, MenuComponent, TermpickerComponent, ProgcardComponent, EventsComponent, ProgrammeComponent ],
  entryComponents: [LogonComponent,   ProgrammeComponent, SectionselectComponent, MenuComponent,   ProgcardComponent,   TermpickerComponent, EventsComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ Globals ]
})

export class AppModule {}

//platformBrowserDynamic().bootstrapModule(AppModule);