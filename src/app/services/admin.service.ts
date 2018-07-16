import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  startNewTab(userId) {
    var venueId = JSON.parse(localStorage.getItem("user")).venueId;
    var data = {
      venueId: venueId,
      userId: userId
    };
    return this.http.post('/api/tab/', data)
  }

}