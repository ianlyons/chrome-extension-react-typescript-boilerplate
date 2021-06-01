export function compact(list: any[]) {
  return Array.from(list).filter((arg) => !!arg);
}

export function classnames(...classnames: string[]) {
  return compact(classnames).join(" ");
}

type MapPredicate = (value: any, key: string) => any;
export function mapObject(
  object: Record<string, any>,
  predicate: MapPredicate
) {
  const res = [];
  for (const key in object) {
    res.push(predicate(object[key], key));
  }
  return res;
}
