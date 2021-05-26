export function compact(list) {
  return Array.from(list).filter((arg) => !!arg);
}

export function classnames(...classnames) {
  return compact(classnames).join(" ");
}
