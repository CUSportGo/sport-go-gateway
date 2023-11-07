/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { ImageData } from "./file.pb";

export const protobufPackage = "sportarea";

export interface CreateSportareaRequest {
  name: string;
  image: ImageData[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
  userId: string;
}

export interface CreateSportareaResponse {
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
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
  image: string[];
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

export interface SportArea {
  id: string;
  name: string;
  image: string[];
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
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  price: string;
}

export interface GetSportAreaByIdRequest {
  id: string;
}

export interface GetSportAreaByIdResponse {
  data: GetSportAreaByIdItem | undefined;
}

export interface GetSportAreaByIdItem {
  id: string;
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  description: string;
  price: string;
  sportList: SportList[];
}

export interface UpdateSportAreaRequest {
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
  id: string;
  userId: string;
}

export interface UpdateSportAreaResponse {
  name: string;
  image: string[];
  shower: boolean;
  carPark: boolean;
  sportType: string[];
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  price: number;
  id: string;
}

export const SPORTAREA_PACKAGE_NAME = "sportarea";

export interface SportareaServiceClient {
  create(request: CreateSportareaRequest): Observable<CreateSportareaResponse>;

  searchSportArea(request: SearchSportAreaRequest): Observable<SearchSportAreaResponse>;

  addSportArea(request: AddSportAreaRequest): Observable<AddSportAreaResponse>;

  getSportAreaById(request: GetSportAreaByIdRequest): Observable<GetSportAreaByIdResponse>;

  updateSportArea(request: UpdateSportAreaRequest): Observable<UpdateSportAreaResponse>;
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

  updateSportArea(
    request: UpdateSportAreaRequest,
  ): Promise<UpdateSportAreaResponse> | Observable<UpdateSportAreaResponse> | UpdateSportAreaResponse;
}

export function SportareaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "searchSportArea", "addSportArea", "getSportAreaById", "updateSportArea"];
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
