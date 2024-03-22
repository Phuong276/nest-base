interface IDumDate<T> {
  enum?: object;
  object?: new () => T;
  isArray?: boolean;
}

export function Property<T>(options?: IDumDate<T>) {
  return function (target: any, propertyKey: string): void {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    const properties =
      Reflect.getMetadata('properties', target.constructor) || [];

    const propertyInfo = {
      key: propertyKey,
      type,
      enumSchema: options?.enum,
      objectType: options?.object,
      isArray: options?.isArray,
    };
    properties.push(propertyInfo);
    Reflect.defineMetadata('properties', properties, target.constructor);
  };
}
