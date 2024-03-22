import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Property } from './dummy';
import { applyDecorators } from '@nestjs/common';

interface IDtoDecoratorOption<T> {
  required?: boolean;
  expose?: boolean;
  length?: true;
  description?: string;
  title?: string;
  example?: T;
  enum?: string[] | number[];
  matches?: RegExp;
  min?: number;
  max?: number;
  isArray?: boolean;
  type?: any;
}

interface IPropertyType extends ApiPropertyOptions, DateConstructor {}

interface IDtoOptionsInitDecorators<T> extends IDtoDecoratorOption<T> {
  propertyType?: IPropertyType;
}

function initializeDecorators<T>(
  options: IDtoOptionsInitDecorators<T>,
  additionMiddle: (decorators: PropertyDecorator[]) => any,
) {
  const ApiPropertyOpts = {} as IPropertyType;
  if (options?.required) {
    ApiPropertyOpts.required = true;
  }
  if (!options?.required) {
    ApiPropertyOpts.required = false;
  }
  if (options?.propertyType) {
    ApiPropertyOpts.type = options.propertyType;
  }
  if (options?.description) {
    ApiPropertyOpts.description = options.description;
  }
  if (options?.example) {
    ApiPropertyOpts.example = options.example;
  }
  if (options?.enum) {
    ApiPropertyOpts.enum = options.enum;
  }
  if (options?.isArray) {
    ApiPropertyOpts.isArray = options.isArray;
  }
  if (options?.type) {
    ApiPropertyOpts.type = options.type;
  }
  if (options?.title) {
    ApiPropertyOpts.title = options.title;
  }
  const decorators = [ApiProperty(ApiPropertyOpts)];
  if (options?.expose) {
    decorators.push(Expose());
  }
  if (options?.matches) {
    decorators.push(Matches(options.matches));
  }
  if (options?.max && !options?.length) {
    decorators.push(Max(options.max));
  }
  if (options?.min && !options?.length) {
    decorators.push(Min(options.min));
  }
  if (options?.length) {
    decorators.push(Length(options.min, options.max));
  }
  additionMiddle(decorators);
  if (!options?.required) {
    decorators.push(IsOptional());
  } else if (options?.required && options?.type) {
    decorators.push(IsNotEmptyObject());
  } else {
    decorators.push(IsNotEmpty());
  }
  if (process.env.NODE_ENV === 'test') {
    decorators.push(
      Property({
        enum: options?.enum,
        object: options?.type,
        isArray: options?.isArray,
      }),
    );
  }
  return applyDecorators(...decorators);
}

export function DtoString(options?: IDtoDecoratorOption<string>) {
  return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
    decorators.push(IsString()),
  );
}

export function DtoNumber(options?: IDtoDecoratorOption<number>) {
  return initializeDecorators(options, (decorators: PropertyDecorator[]) => {
    decorators.push(IsNumber());
    decorators.push(Transform(({ value }) => Number(value)));
    return decorators;
  });
}

export function DtoBoolean(options?: IDtoDecoratorOption<boolean>) {
  return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
    decorators.push(IsBoolean()),
  );
}

export function DtoArray(options?: IDtoDecoratorOption<Array<any>>) {
  return initializeDecorators(options, (decorators: PropertyDecorator[]) => {
    decorators.push(IsArray());
    return decorators;
  });
}

export function DtoEnum(
  entity: object,
  options?: IDtoDecoratorOption<object | [] | string | number>,
) {
  if (options && !options?.enum) {
    options.enum = Object.entries(entity).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value,
    );
  }

  return initializeDecorators(options, (decorators: PropertyDecorator[]) => {
    decorators.push(IsIn(options?.enum));
    return decorators.push(IsEnum(entity));
  });
}

export function DtoDateTime(options?: IDtoDecoratorOption<Date>) {
  return initializeDecorators(
    { ...options, propertyType: Date },
    (decorators: PropertyDecorator[]) => decorators.push(IsDateString()),
  );
}
