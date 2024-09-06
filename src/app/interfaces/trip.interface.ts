import { ILocation } from './location.interface'

export interface ITrip {
  driver_id: string;
  passenger_id: string;
  vehicle_id: string;
  start_location_id: string | ILocation;
  end_location_id: string | ILocation;
  createdAt?: Date;
  updatedAt?: Date;
}