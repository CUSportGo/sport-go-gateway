import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { request } from 'http';
import { catchError, firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/exception-handler';

import { ImageData } from './file.pb';
import {
  CreateSportareaRequestDto,
  UpdateSportAreaRequestBody,
  UpdateAreaRequest,
} from './sportarea.dto';
import {
  AddSportAreaRequest,
  CreateSportareaRequest,
  CreateSportareaResponse,
  GetSportAreaByIdRequest,
  GetSportAreaByIdResponse,
  SearchSportAreaRequest,
  SportareaServiceClient,
  UpdateAreaResponse,
  UpdateSportAreaRequest,
} from './sportarea.pb';

@Injectable()
export class SportareaService implements OnModuleInit {
  private sportareaClient: SportareaServiceClient;
  private readonly logger = new Logger(SportareaService.name);

  constructor(@Inject('SPORTAREA_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.sportareaClient =
      this.client.getService<SportareaServiceClient>('SportareaService');
  }

  async create(
    body: CreateSportareaRequestDto,
    userId: string,
    files: Express.Multer.File[],
  ): Promise<CreateSportareaResponse> {
    if (body.shower != 'true' && body.shower != 'false') {
      throw new BadRequestException('Invalid request body');
    }
    if (body.carPark != 'true' && body.carPark != 'false') {
      throw new BadRequestException('Invalid request body');
    }
    const price = parseFloat(body.price);
    if (price < 0) {
      throw new BadRequestException('Invalid request body');
    }
    let images: ImageData[] = [];
    files.forEach((file: Express.Multer.File) => {
      const image: ImageData = {
        filename: file.originalname,
        data: file.buffer,
      };
      images.push(image);
    });
    const request: CreateSportareaRequest = {
      name: body.name,
      image: images,
      shower: body.shower == 'true' ? true : false,
      carPark: body.carPark == 'true' ? true : false,
      sportType: body.sportType,
      location: body.location,
      latitude: parseFloat(body.latitude),
      longitude: parseFloat(body.longitude),
      description: body.description,
      price: price,
      userId: userId,
    };
    console.log(request);
    return await firstValueFrom(
      this.sportareaClient.create(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async getSportAreaById(
    req: GetSportAreaByIdRequest,
  ): Promise<GetSportAreaByIdResponse> {
    return await firstValueFrom(
      this.sportareaClient.getSportAreaById(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async searchSportArea(request: SearchSportAreaRequest) {
    return await firstValueFrom(
      this.sportareaClient.searchSportArea(request).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async updateAreaInfo(req: UpdateAreaRequest): Promise<UpdateAreaResponse> {
    return await firstValueFrom(
      this.sportareaClient.updateArea(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async updateSportArea(
    requestBody: UpdateSportAreaRequestBody,
    sportAreaId: string,
    userId: string,
  ) {
    const updateSportArea: UpdateSportAreaRequest = {
      id: sportAreaId,
      name: requestBody.name,
      image: requestBody.image,
      shower: requestBody.shower,
      carPark: requestBody.carPark,
      sportType: requestBody.sportType,
      location: requestBody.location,
      latitude: requestBody.latitude,
      longitude: requestBody.longitude,
      description: requestBody.description,
      price: requestBody.price,
      userId: userId,
    };

    return await firstValueFrom(
      this.sportareaClient.updateSportArea(updateSportArea).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }

  async addSportArea(req: AddSportAreaRequest) {
    return await firstValueFrom(
      this.sportareaClient.addSportArea(req).pipe(
        catchError((error) => {
          this.logger.error(error);
          const exception = exceptionHandler.getExceptionFromGrpc(error);
          throw exception;
        }),
      ),
    );
  }
}
