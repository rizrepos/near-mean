import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../shop.service';
import { Shop } from '../shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  providers: [ ShopsService ]
})
export class ShopsComponent implements OnInit {
  shops: Shop[];
  shop: Shop;
  name: string;
  geo: [number];

  constructor(private shopsService: ShopsService) { }

  ngOnInit() {

    // get user location
    let _this = this;

    let positionCB = function (position) {

      let lat = position.coords.latitude;
      let lng = position.coords.longitude;


      _this.shopsService.getShops(lat, lng)
        .subscribe(shops => {
          _this.shops = shops;

          console.log(shops);
        })

    }

    navigator.geolocation.getCurrentPosition(positionCB);


  }

}
