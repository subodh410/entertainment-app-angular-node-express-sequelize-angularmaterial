import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    
   
    return this.http.post(`http://localhost:8080/api/user/signin`, {
      username: data.username,
      password: data.password,
  
    });
    
  }

  gethighScorer() : Observable<any>
  {
    return this.http.get(`http://localhost:8080/api/homepage`);
  }
  getGamehighScorer() : Observable<any>
  {
    return this.http.get(`http://localhost:8080/api/homepage/game`);
  }
}
