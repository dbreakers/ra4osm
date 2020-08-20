import { Injectable } from '@angular/core';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root',
})

export class DateformatService {
   constructor(
    private globals: Globals) { }

monthnames= ["January","February","March","April","May","June","July","August","September","October","November","December"];
daynames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
 smonthnames= ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
 sdaynames = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]
date_format_monthname(date,ls) {
    var d = new Date(date);
    if (ls){
    return this.monthnames[d.getMonth()];
   //return parseInt(d.substring(5,7),10)-1;
    } else {
      return this.smonthnames[d.getMonth()];
    }
  }

getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

getDetailAge(dob, date) {
  var now = date;
  //var today = new Date(now.getFullYear(),now.getMonth(),now.getDate());

  var yearNow = now.getFullYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

 // var dob = new Date(dateString.substring(6,10),
 //                    dateString.substring(0,2)-1,                   
 //                    dateString.substring(3,5)                  
 //                    );

  var yearDob = dob.getFullYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();
  //var age = {};
  var ageString = "";
  var yearString = "";
  var monthString = "";
  var dayString = "";


  var yearAge = yearNow - yearDob;

  if (monthNow >= monthDob)
    var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow -monthDob;
  }

  if (dateNow >= dateDob)
    var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  var age = new Object;
 // yearAge = yearAge;
 // monthAge = monthAge;
 // dateAge = dateAge;
      
var yearstring = "";
var daystring = "";
  if ( yearAge > 1 ) yearString = " years";
  else yearString = " year";
  if ( monthAge> 1 ) monthString = " months";
  else monthString = " month";
  if ( dateAge > 1 ) dayString = " days";
  else dayString = " day";
return yearAge + "/" + monthAge;
/*
  if ( (yearAge > 0) && (monthAge > 0) && (dateAge > 0) )
    ageString = yearAge + yearString + ", " + monthAge + monthString + ", and " + dateAge + dayString + " old.";
  else if ( (yearAge == 0) && (monthAge == 0) && (dateAge > 0) )
    ageString = "Only " + dateAge + dayString + " old!";
  else if ( (yearAge > 0) && (monthAge == 0) && (dateAge == 0) )
    ageString = yearAge + yearString + " old. Happy Birthday!!";
  else if ( (yearAge > 0) && (monthAge > 0) && (dateAge == 0) )
    ageString = yearAge + yearString + " and " + monthAge + monthString + " old.";
  else if ( (yearAge == 0) && (monthAge > 0) && (dateAge > 0) )
    ageString = monthAge + monthString + " and " + dateAge + dayString + " old.";
  else if ( (yearAge > 0) && (monthAge == 0) && (dateAge > 0) )
    ageString = yearAge + yearString + " and " + dateAge + dayString + " old.";
  else if ( (yearAge == 0) && (monthAge > 0) && (dateAge == 0) )
    ageString = monthAge + monthString + " old.";
  else ageString = "Oops! Could not calculate age!";

  return ageString; */
}

  
date_format_nth(d) {
var day = d.getDate()
      if(day>3 && day<21) return 'th'; // thanks kennebec
      switch (day % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

  
  
date_format_dayname(d,ls) {
  if (ls){
  return  this.daynames[d.getDay()];
  } else
  {
     return  this.sdaynames[d.getDay()];
  }
}

date_format_days_between(s,e) {
  var one_day=1000*60*60*24;
   var date1 = new Date(s);
    var date2 = new Date(e);
   var difference_ms = date2 - date1;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day)+1; 
}

date_format_date_nd(d,ls) {
   var today = new Date();
   var date = new Date(d);
   var inc_year = false;
   if (d==today) { return "Today"} else
    {
      if (date.getFullYear()!=today.getFullYear()) { inc_year = true;}
      var ss = "";
      ss = ss + " " +date.getDate();
      ss = ss + this.date_format_nth(date) + " ";
      ss = ss + this.date_format_monthname(date,ls);
      if (inc_year) { ss = ss +" "+date.getFullYear()}
      return ss;
    }
 }    



 date_format_date(d,ls) {
   var today = new Date();
   var date = new Date(d);
   var inc_year = false;
   if (d==today) { return "Today"} else
    {
      if (date.getFullYear()!=today.getFullYear()) { inc_year = true;}
      var ss = this.date_format_dayname(date,ls);
      ss = ss + " " +date.getDate();
      ss = ss + this.date_format_nth(date) + " ";
      ss = ss + this.date_format_monthname(date,ls);
      if (inc_year) { ss = ss +" "+date.getFullYear()}
      return ss;
    }
 }    

}