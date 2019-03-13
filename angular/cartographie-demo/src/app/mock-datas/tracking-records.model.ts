export interface TrackRecord {
  UTCDateTime: string;
  UnixUTCTimestamp: number;
  lat: number;
  lon: number;
  callsign: string;
  windFrom: string;
  knots: string;
  gust: string;
  barometer: string;
  airTemp: string;
  dewPoint: string;
  waterTemp: string;
}

export interface TrackingRecords {
  shipName: string;
  IMO: string;
  MMSI: string;
  tracking: TrackRecord[];
}
