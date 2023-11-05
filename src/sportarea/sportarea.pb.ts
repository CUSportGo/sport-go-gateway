/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'sportarea';

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
  userId: string;
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
  keyword: string;
  userLatitude: number;
  userLongitude: number;
  maxDistance: number;
}

export interface SearchSportAreaResponse {
  data: SearchSportAreaItem[];
}

export interface SearchSportAreaItem {
  id: string;
  name: string;
  imageURL: string;
  sportType: string[];
  location: string;
  description: string;
  distance: number;
  price: string;
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

export interface UpdateAreaRequest {
  id: string;
  sportType: string;
  areaId: string;
  name: string;
  openTime: string;
  closeTime: string;
  price: string;
}

export interface UpdateAreaResponse {
  data: SportArea | undefined;
}

export interface SportArea {
  id: string;
  name: string;
  imageURL: string;
  sportType: string[];
  location: string;
  description: string;
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
export interface UpdateSportAreaRequest {
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
  id: string;
  userId: string;
}

export interface UpdateSportAreaResponse {
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
  id: string;
}

export interface GetAreaByIdRequest {
  sportAreaId: string;
  sportType: string;
  areaId: string;
}

export interface GetAreaByIdResponse {
  data: SportDetail | undefined;
}

export const SPORTAREA_PACKAGE_NAME = 'sportarea';

export interface SportareaServiceClient {
  create(request: CreateSportareaRequest): Observable<CreateSportareaResponse>;

  searchSportArea(
    request: SearchSportAreaRequest,
  ): Observable<SearchSportAreaResponse>;

  addSportArea(request: AddSportAreaRequest): Observable<AddSportAreaResponse>;

  getSportAreaById(
    request: GetSportAreaByIdRequest,
  ): Observable<GetSportAreaByIdResponse>;

  updateSportArea(
    request: UpdateSportAreaRequest,
  ): Observable<UpdateSportAreaResponse>;

  getAreaById(request: GetAreaByIdRequest): Observable<GetAreaByIdResponse>;

  updateArea(request: UpdateAreaRequest): Observable<UpdateAreaResponse>;
}

export interface SportareaServiceController {
  create(
    request: CreateSportareaRequest,
  ):
    | Promise<CreateSportareaResponse>
    | Observable<CreateSportareaResponse>
    | CreateSportareaResponse;

  searchSportArea(
    request: SearchSportAreaRequest,
  ):
    | Promise<SearchSportAreaResponse>
    | Observable<SearchSportAreaResponse>
    | SearchSportAreaResponse;

  addSportArea(
    request: AddSportAreaRequest,
  ):
    | Promise<AddSportAreaResponse>
    | Observable<AddSportAreaResponse>
    | AddSportAreaResponse;

  getSportAreaById(
    request: GetSportAreaByIdRequest,
  ):
    | Promise<GetSportAreaByIdResponse>
    | Observable<GetSportAreaByIdResponse>
    | GetSportAreaByIdResponse;

  updateSportArea(
    request: UpdateSportAreaRequest,
  ):
    | Promise<UpdateSportAreaResponse>
    | Observable<UpdateSportAreaResponse>
    | UpdateSportAreaResponse;

  getAreaById(
    request: GetAreaByIdRequest,
  ):
    | Promise<GetAreaByIdResponse>
    | Observable<GetAreaByIdResponse>
    | GetAreaByIdResponse;

  updateArea(
    request: UpdateAreaRequest,
  ):
    | Promise<UpdateAreaResponse>
    | Observable<UpdateAreaResponse>
    | UpdateAreaResponse;
}

export function SportareaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'searchSportArea',
      'addSportArea',
      'getSportAreaById',
      'updateSportArea',
      'getAreaById',
      'updateArea',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SportareaService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('SportareaService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SPORTAREA_SERVICE_NAME = 'SportareaService';
