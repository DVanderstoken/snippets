import { Observable } from 'rxjs/Observable';
import { of, from } from 'rxjs';
import 'rxjs/add/observable/from';
import { map, delay, mergeMap, concatMap } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { TrackingRecords, TrackRecord } from './tracking-records.model';
import { DATAS } from './tracking-records-mock';

@Injectable()
export class ShipTrackingService implements OnInit {
  private finalDatas: TrackingRecords[];

  public getTrackingNodesForShip(
    shipName: string,
    IMO?: string,
    MMSI?: string
  ): Observable<TrackRecord> {
    if (IMO) {
      if (MMSI) {
        console.log("Filtering with ship name, IMO and MMSI");
        this.finalDatas = this.shipNameAndIMOAndMMSIFiltering(
          shipName,
          MMSI,
          IMO
        );
      } else {
        console.log("Filtering with ship name and IMO");
        this.finalDatas = this.shipNameAndIMOFiltering(shipName, IMO);
      }
    } else {
      if (MMSI) {
        console.log("Filtering with ship name and MMSI");
        this.finalDatas = this.shipNameAndMMSIFiltering(shipName, MMSI);
      } else {
        console.log("Filtering with ship name");
        this.finalDatas = this.shipNameFiltering(shipName);
      }
    }

    const sortedArray = this.finalDatas[0].tracking.sort((one, another) =>
      one.UnixUTCTimestamp > another.UnixUTCTimestamp ? 1 : -1
    );
    // send one tracking record every 1000 ms
    return Observable.from(sortedArray).pipe(concatMap(entry => of(entry).pipe(delay(1000))));
  }

  ngOnInit() {
    this.finalDatas = DATAS;
  }

  private shipNameFiltering(shipName: string): TrackingRecords[] {
    return DATAS.filter(record => record.shipName === shipName);
  }

  private shipNameAndIMOFiltering(
    shipName: string,
    IMO: string
  ): TrackingRecords[] {
    return this.finalDatas.filter(record => {
      record.IMO === IMO && record.shipName === shipName;
    });
  }

  private shipNameAndMMSIFiltering(
    shipName: string,
    MMSI: string
  ): TrackingRecords[] {
    return this.finalDatas.filter(record => {
      record.MMSI === MMSI && record.shipName === shipName;
    });
  }

  private shipNameAndIMOAndMMSIFiltering(
    shipName: string,
    MMSI: string,
    IMO: string
  ): TrackingRecords[] {
    return this.finalDatas.filter(record => {
      record.MMSI === MMSI &&
        record.IMO === IMO &&
        record.shipName === shipName;
    });
  }
}
