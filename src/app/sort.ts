
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Sortservice {

 constructor() { }

compareValuesArray(key, order='asc') {
   return function(a, b) {
  var compare = 0;
  for (var i=0; i<key.length; i++)
  {
     if(!a.hasOwnProperty(key[i]) || 
       !b.hasOwnProperty(key[i])) {
  	  return 0; 
    }
    if (compare==0){
    const varA = (typeof a[key[i]] === 'string') ? 
      a[key[i]].toUpperCase() : a[key[i]];
    const varB = (typeof b[key[i]] === 'string') ? 
      b[key[i]].toUpperCase() : b[key[i]];
      
    
    if (varA > varB) {
      compare = 1;
    } else if (varA < varB) {
      compare = -1;
    }
    if (compare!=0)
    {
     return (
      (order == 'desc') ? 
      (compare * -1) : compare
    ); 
    }
    
    }
  }
  return (
      (order == 'desc') ? 
      (compare * -1) : compare
    ); 
   }
}


}