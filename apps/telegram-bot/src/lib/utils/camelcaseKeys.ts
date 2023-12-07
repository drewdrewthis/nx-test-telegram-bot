/* eslint-disable @typescript-eslint/no-explicit-any */
type CamelizeString<ObjectProperty extends string> =
  ObjectProperty extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : ObjectProperty;

export type Camelize<GenericObject> = {
  [ObjectProperty in keyof GenericObject as CamelizeString<
    ObjectProperty & string
  >]: GenericObject[ObjectProperty] extends Array<infer ArrayItem>
    ? ArrayItem extends Record<string, unknown>
      ? Array<Camelize<ArrayItem>>
      : GenericObject[ObjectProperty]
    : GenericObject[ObjectProperty] extends Record<string, unknown>
    ? Camelize<GenericObject[ObjectProperty]>
    : GenericObject[ObjectProperty];
};

/**
 * Converts the keys of an object from snake_case to camelCase.
 * @param {Record<string, any>} obj - The object with snake_case keys.
 * @returns {Record<string, any>} - The object with camelCase keys.
 */
export function camelcaseKeys<T extends Record<string, any>>(
  obj: T
): Camelize<T> {
  return Object.keys(obj).reduce((result: any, key: string) => {
    const camelCaseKey = key.replace(/(_\w)/g, (matches) =>
      matches[1].toUpperCase()
    );
    result[camelCaseKey] = obj[key];
    return result;
  }, {});
}
