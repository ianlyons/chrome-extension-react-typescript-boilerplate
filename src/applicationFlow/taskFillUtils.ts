import * as data from "./data";
import * as inputUtils from "../utils/inputUtils";
import * as utils from "../utils/utils";

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

export async function fillAddressInput(input: HTMLInputElement, value: string) {
  // fill and open the modal
  const focusEvent = inputUtils.createEventWithValueAndTarget(
    "focus",
    "",
    input
  );
  input.dispatchEvent(focusEvent);
  const changeEvent = inputUtils.createEventWithValueAndTarget(
    "change",
    value,
    input
  );
  input.dispatchEvent(changeEvent);
  await utils.pause(300);

  const button = document.querySelector(
    `#${input.id}-dropdown-0 button`
  ) as HTMLButtonElement;
  const mouseUpEvent = inputUtils.createEventWithValueAndTarget(
    "mousedown",
    null,
    button
  );
  button.dispatchEvent(mouseUpEvent);

  // wait for the modal to animate in
  await utils.pause(500);
  // submit the contents of the modal
  const modalSubmitButton = document.querySelector(
    '[data-it="it-AddressModal-content"] button[type="submit"]'
  ) as HTMLButtonElement;

  modalSubmitButton.click();

  const blurEvent = inputUtils.createEventWithValueAndTarget("blur", "", input);
  input.dispatchEvent(blurEvent);
  await utils.pause(10);
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

export const fillTextlikeInput = inputUtils.fillTextlikeInput;
