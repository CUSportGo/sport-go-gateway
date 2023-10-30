import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'timeFormat', async: false })
export class IsTimeFormat implements ValidatorConstraintInterface {
  validate(time: string, args: ValidationArguments) {
    // Regular expression to match "hh:mm" format
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    return regex.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in time format (hh:mm)`;
  }
}

export function TimeFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeFormat,
    });
  };
}

export class UpdateAreaRequest {
  timeField: string;
  id: string;
  sportType: string;
  areaId: string;
  name: string;
  @TimeFormat()
  openTime: string;
  @TimeFormat()
  closeTime: string;
  price: string;
}
