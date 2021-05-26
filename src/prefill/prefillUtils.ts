export function createEventWithValueAndTarget(
  type: string,
  value: any,
  target: any
) {
  var event = new Event(type);
  Object.defineProperty(event, "target", { value: target });
  Object.defineProperty(event, "currentTarget", { value: target });
  (event.target as any).value = value;
  (event.currentTarget as any).value = value;
  return event;
}

export function decodePropertyName(encodedPropertyName: string) {
  return encodedPropertyName
    .replace(/\u2219/g, ".")
    .replace(/\u228f([0-9]?[0-9])\u2290/g, "[$1]");
}

export function encodePropertyName(text: string) {
  return text
    .replace(/\./g, "\u2219")
    .replace(/\[([0-9]?[0-9])\]/g, "\u228f$1\u2290");
}

export async function pause(durationMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}
