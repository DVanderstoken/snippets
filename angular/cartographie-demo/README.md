# Demo Cartographie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2 :
```
ng new myProjectName
```

## Google Maps integration

```
npm install angular2-google-maps --save
```

then update `app.module.ts` file :
```
(...)
import { AgmCoreModule } from 'angular2-google-maps/core';
(...)
imports: [
    (...)
    AgmCoreModule.forRoot({
      apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // <-- change with your own API key !
    })
  ],
(...)
```  

then, in any html component's template :
```
<sebm-google-map [latitude]="__geolocation.latitude" 
                 [longitude]="__geolocation.longitude" 
                 [zoom]="13">
  <sebm-google-map-marker [latitude]="__geolocation.latitude" 
                          [longitude]="__geolocation.longitude">
  </sebm-google-map-marker>
</sebm-google-map>
```

See full documentation @ [angular2-google-maps](https://angular-maps.com/).


## Leaflet integration

```
npm install leaflet --save
```

then, import leaflet in your component and initialize the map :
```
import * as L from 'leaflet';
(...)
this.map = L.map('leaflet').setView([latitude, longitude], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

this.marker = L.marker([latitude, longitude]).addTo(this.map);
(...)
```

Don't forget to import leaflet stylesheet : 
```
<link rel="stylesheet" 
      href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
```

Update your html component's template and the associated stylesheet if needed :
```
<div id="leaflet"></div>
```

See full documentation @ [leafletjs](http://leafletjs.com/reference.html).

### Working with Georep

Simply replace the map layer with : 
```
var georepLayer = L.tileLayer.wms("https://carto10.gouv.nc/arcgis/services/fond_{cartographie|imagerie}/MapServer/WMSServer",
      {
        "layers": "0",
        "format": "image/png",
        "version": "1.3.0",
        "srs": "EPSG:4326"
      }, {
        transitionEffect: 'resize',
        maxZoomLevel: 13
      }).addTo(this.map);
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

