import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { GeolocationService } from './geolocation/geolocation.service';
import { Geolocation } from './geolocation/geolocation';
import { Commune } from './geolocation/commune';
import { CommuneService } from './geolocation/commune.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'POC de synchronisation descendante de donnees';

  private __geolocation: Geolocation;
  private __city: string;
  private __error: any = null;
  private __communes: Commune[];
  private __osmmap;
  private __georepplanmap;
  private __georepimgmap;
  private __cityMarker;

  constructor(
    private geolocationService: GeolocationService,
    private ref: ChangeDetectorRef,
    private __zone: NgZone,
    private communeService: CommuneService
  ) {
    this.__geolocation = new Geolocation();
    this.__geolocation.latitude = -22.271338;
    this.__geolocation.longitude = 166.440182;
  }

  ngOnInit() {
    this.__communes = this.communeService.getCommunes();

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    this.geolocationService.getLocation(options).toPromise().then(position => {
      if (position !== undefined) {
        this.__geolocation.latitude = position.coords.latitude;
        this.__geolocation.longitude = position.coords.longitude;

        this.initializeMap(this.__geolocation);
        this.geolocationService.getCity(this.__geolocation).toPromise().then(response => {
          this.__city = response;
        });
        this.ref.detectChanges();
      }
    });
  }

  selectedCommune(commune) {
    this.__city = commune.nom;
    this.__geolocation.latitude = commune.latitude;
    this.__geolocation.longitude = commune.longitude;
    this.centerMap(this.__geolocation);
  }

  initializeMap(geolocation: Geolocation) {
    this.__osmmap = L.map('leaflet-plan').setView(
      [this.__geolocation.latitude, this.__geolocation.longitude],
      13
    );

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.__osmmap);

    this.__cityMarker = L.marker([
      this.__geolocation.latitude,
      this.__geolocation.longitude
    ]).addTo(this.__osmmap);

    this.__georepplanmap = L.map('georep-plan').setView(
      [this.__geolocation.latitude, this.__geolocation.longitude],
      13
    );
    const georepCartoLayer = L.tileLayer
      .wms(
        'https://carto.gouv.nc/arcgis/services/fond_cartographie/MapServer/WmsServer',
        {
          layers: '0',
          format: 'image/png',
          version: '1.3.0',
          srs: 'EPSG:4326'
        },
        {
          transitionEffect: 'resize',
          maxZoomLevel: 13,
          attribution:
            '&copy; <a href="georep.nc">Gouvernement de la Nouvelle-Calédonie</a>'
        }
      )
      .addTo(this.__georepplanmap);

    const georepVoirieLayer = L.tileLayer
      .wms(
        'https://carto.gouv.nc/arcgis/services/voirie/MapServer/WmsServer',
        {
          layers: '0',
          format: 'image/png',
          version: '1.3.0',
          srs: 'EPSG:4326',
          transparent: true
        },
        {
          // transitionEffect: 'resize',
          maxZoomLevel: 13
        }
      )
      .addTo(this.__georepplanmap);

    this.__cityMarker = L.marker([
      this.__geolocation.latitude,
      this.__geolocation.longitude
    ]).addTo(this.__georepplanmap);

    this.__georepimgmap = L.map('georep-img').setView(
      [this.__geolocation.latitude, this.__geolocation.longitude],
      13
    );
    const georepLayer = L.tileLayer
      .wms(
        'https://carto.gouv.nc/arcgis/services/fond_imagerie/MapServer/WmsServer',
        {
          layers: '0',
          format: 'image/png',
          version: '1.3.0',
          srs: 'EPSG:4326'
        },
        {
          transitionEffect: 'resize',
          maxZoomLevel: 13
        }
      )
      .addTo(this.__georepimgmap);

    this.__cityMarker = L.marker([
      this.__geolocation.latitude,
      this.__geolocation.longitude
    ]).addTo(this.__georepimgmap);
  }

  centerMap(geolocation: Geolocation) {
    this.__osmmap.setView(
      new L.LatLng(geolocation.latitude, geolocation.longitude),
      13,
      { animation: true }
    );
    this.__georepplanmap.setView(
      new L.LatLng(geolocation.latitude, geolocation.longitude),
      13,
      { animation: true }
    );
    this.__georepimgmap.setView(
      new L.LatLng(geolocation.latitude, geolocation.longitude),
      13,
      { animation: true }
    );
    this.__cityMarker.setLatLng([
      this.__geolocation.latitude,
      this.__geolocation.longitude
    ]);
  }
}
