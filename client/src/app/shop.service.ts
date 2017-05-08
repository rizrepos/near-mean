import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Shop } from './shop';
import 'rxjs/add/operator/map';

@Injectable()
export class ShopsService {

  constructor(private http: Http) { }

  // retrieving contact service
  getShops(lat, lng){
    return this.http.get('http://localhost:9000/api/shops?lat=-' + lat + '&lng=' + lng )
      .map(res=>res.json());
  }

}
