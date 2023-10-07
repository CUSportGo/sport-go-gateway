/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "sportarea";

export interface CreateSportareaRequest {
  name: string;
  imageURL: string;
  shower: boolean;
  carPark: boolean;
  sportType: string;
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
  sportType: string;
  location: string;
  latitude: number;
  longtitude: number;
  description: string;
  price: number;
}

export const SPORTAREA_PACKAGE_NAME = "sportarea";

export interface SportareaServiceClient {
  create(request: CreateSportareaRequest): Observable<CreateSportareaResponse>;
}

export interface SportareaServiceController {
  create(
    request: CreateSportareaRequest,
  ): Promise<CreateSportareaResponse> | Observable<CreateSportareaResponse> | CreateSportareaResponse;
}

export function SportareaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create"];
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
