/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "sportarea";

export interface CreateSportareaRequest {
  name: string;
  imageURL: string;
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longtitude: number;
  description: string;
  price: number;
}

export interface CreateSportareaResponse {
  name: string;
  imageURL: string;
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longtitude: number;
  description: string;
  price: number;
}

export interface SearchSportAreaRequest {
  sportType: string[];
  location: string;
  userLatitude: number;
  userLongitude: number;
  maxDistance: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SearchSportAreaResponse {
  data: SportArea[];
}

export interface AddSportAreaRequest {
  id: string;
  sportType: string;
  name: string;
  openTime: string;
  closeTime: string;
  price: string;
}

export interface AddSportAreaResponse {
  data: SportArea | undefined;
}

export interface SportArea {
  id: string;
  name: string;
  imageURL: string;
  sportType: string[];
  location: string;
  description: string;
  distance: number;
  price: string;
  sportList: SportList[];
}

export interface SportList {
  sportType: string;
  area: SportDetail[];
}

export interface SportDetail {
  name: string;
  openTime: string;
  closeTime: string;
  price: string;
}

export interface GetSportAreaByIdRequest {
  id: string;
}

export interface GetSportAreaByIdResponse {
  data: SportArea | undefined;
}

export const SPORTAREA_PACKAGE_NAME = "sportarea";

export interface SportareaServiceClient {
  create(request: CreateSportareaRequest): Observable<CreateSportareaResponse>;

  searchSportArea(request: SearchSportAreaRequest): Observable<SearchSportAreaResponse>;

  addSportArea(request: AddSportAreaRequest): Observable<AddSportAreaResponse>;

  getSportAreaById(request: GetSportAreaByIdRequest): Observable<GetSportAreaByIdResponse>;
}

export interface SportareaServiceController {
  create(
    request: CreateSportareaRequest,
  ): Promise<CreateSportareaResponse> | Observable<CreateSportareaResponse> | CreateSportareaResponse;

  searchSportArea(
    request: SearchSportAreaRequest,
  ): Promise<SearchSportAreaResponse> | Observable<SearchSportAreaResponse> | SearchSportAreaResponse;

  addSportArea(
    request: AddSportAreaRequest,
  ): Promise<AddSportAreaResponse> | Observable<AddSportAreaResponse> | AddSportAreaResponse;

  getSportAreaById(
    request: GetSportAreaByIdRequest,
  ): Promise<GetSportAreaByIdResponse> | Observable<GetSportAreaByIdResponse> | GetSportAreaByIdResponse;
}

export function SportareaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "searchSportArea", "addSportArea", "getSportAreaById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SportareaService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SportareaService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SPORTAREA_SERVICE_NAME = "SportareaService";
