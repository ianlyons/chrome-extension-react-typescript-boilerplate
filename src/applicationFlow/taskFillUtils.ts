import * as data from "./data";

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

export async function selectClickInput(
  inputType: InputType,
  inputs: HTMLButtonElement[] | HTMLInputElement[]
) {
  const possibleChoices = await data.getFillValuesForInputType(inputType);

  // with multiple inputs, there's not a particularly clear way to get the baseline property,
  // which we need to perform the lookup on the possibleChoiceValues to understand which
  // choice we want. so we just grab the id, which looks like:
  // "CurrentBorrower.declarations.ownershipInterestType-PRIMARY_RESIDENCE"
  // and hackily  separate the property name from the value.
  const normalizedPropertyName = decodePropertyName(inputs[0].id.split("-")[0]);
  const choice = possibleChoices[normalizedPropertyName];
  if (choice) {
    const choiceId = `${encodePropertyName(normalizedPropertyName)}-${
      choice.value
    }`;
    document.getElementById(choiceId).click();
  } else {
    // otherwise, default to selecting the first one /shrug
    inputs[0].click();
  }
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

export function fillTextlikeInput(
  input: HTMLInputElement,
  valueToFill: string | number
) {
  const focusEvent = createEventWithValueAndTarget("focus", valueToFill, input);
  const changeEvent = createEventWithValueAndTarget(
    "change",
    valueToFill,
    input
  );
  const blurEvent = createEventWithValueAndTarget("blur", valueToFill, input);
  input.dispatchEvent(focusEvent);
  input.dispatchEvent(changeEvent);
  input.dispatchEvent(blurEvent);
}

export async function pause(durationMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}
