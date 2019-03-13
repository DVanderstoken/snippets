import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { AgmCoreModule } from "@agm/core";
import { GeolocationService } from "./geolocation/geolocation.service";
import { CommuneService } from "./geolocation/commune.service";
import { ShipTrackingService } from "./mock-datas/tracking.service.mock";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAWS52sFXuID1yuHCc_X02Jgg60ZdwQUBs"
    })
  ],
  providers: [GeolocationService, CommuneService, ShipTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
