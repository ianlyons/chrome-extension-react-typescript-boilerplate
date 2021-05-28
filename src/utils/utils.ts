export function compact(list) {
  return Array.from(list).filter((arg) => !!arg);
}

export function classnames(...classnames) {
  return compact(classnames).join(" ");
}

export function mapObject(object, predicate) {
  const res = [];
  for (const key in object) {
    res.push(predicate(object[key], key));
  }
  return res;
}
