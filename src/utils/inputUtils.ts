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

export function fillTextlikeInput(
  input: HTMLInputElement,
  valueToFill: string | number
) {
  // const focusEvent = createEventWithValueAndTarget("focus", valueToFill, input);
  const changeEvent = createEventWithValueAndTarget(
    "change",
    valueToFill,
    input
  );
  const blurEvent = createEventWithValueAndTarget("blur", valueToFill, input);
  // input.dispatchEvent(focusEvent);
  input.dispatchEvent(changeEvent);
  input.dispatchEvent(blurEvent);
}
