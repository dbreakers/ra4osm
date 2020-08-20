import { Injectable } from '@angular/core';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root',
})

export class PhotoURLService {
   constructor(
    private globals: Globals) { }
get_osmphoto_url(member) {
      var member_image = "https://www.onlinescoutmanager.co.uk/sites/onlinescoutmanager.co.uk/public/member_photos/";
      var m_id  =  JSON.stringify(member.member_id);
      member_image = member_image + m_id.substr(0,m_id.length-3) + "000/";
      member_image = member_image + m_id+"/"+member.photo_guid+"/100x100_0.jpg";
    return member_image 
  }
}