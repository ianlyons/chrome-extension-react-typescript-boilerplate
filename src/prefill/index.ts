import * as prefillUtils from "./prefillUtils";
import * as data from "./data";

export async function fillTask() {
  const prefillValues = data.getPrefillValues({ baseUsername: "ian" });
  const taskForm = document.querySelector("#taskForm");
  if (!taskForm) {
    console.info("Not on task page, skipping task fill");
    return;
  }

  const nonButtonInputs = Array.from(
    taskForm.querySelectorAll("input,select,textarea")
  );

  for (let i = 0; i < nonButtonInputs.length; i++) {
    const input = nonButtonInputs[i] as any;
    const propertyName = prefillUtils.decodePropertyName(
      input?.name || input.id
    );
    const fillValueDefinition = prefillValues[propertyName];
    if (!fillValueDefinition) {
      console.info(`No prefillable value found for ${propertyName}`);
      continue;
    }

    const valueToFill = fillValueDefinition.value;
    console.info(`Filling ${valueToFill} into ${propertyName}`);

    if (fillValueDefinition.type === "checkbox") {
      input.click();
      continue;
    } else if (fillValueDefinition.type === "radio") {
      const radioInput = input as HTMLInputElement;
      // TODO this will currently run multiple times per input because radios are structured as
      // n different `input type="radio"` elements with corresponding `name` attributes underneath
      // a shared `fieldset`. it's okay for now, because it will keep selecting the same value.
      const radioInputs = Array.from(
        document.querySelectorAll(`input[name="${radioInput.name}"]`)
      ) as HTMLInputElement[];
      prefillUtils.selectClickInput("radio", radioInputs);
    } else if (fillValueDefinition.type === "multicheckbox") {
      const multicheckboxInput = input as HTMLInputElement;
      // TODO this will currently run multiple times per input because radios are structured as
      // n different `input type="radio"` elements with corresponding `name` attributes underneath
      // a shared `fieldset`. it's okay for now, because it will keep selecting the same value.
      const multicheckboxInputs = Array.from(
        document.querySelectorAll(`input[name="${multicheckboxInput.name}"]`)
      ) as HTMLInputElement[];
      prefillUtils.selectClickInput("multicheckbox", multicheckboxInputs);
    } else if (fillValueDefinition.type === "address") {
      // // fill and open the modal
      // // input.click();
      // const changeEvent = prefillUtils.createEventWithValueAndTarget(
      //   "change",
      //   valueToFill,
      //   input
      // );
      // input.dispatchEvent(changeEvent);
      // await prefillUtils.pause(3000);
      // const focusEvent = prefillUtils.createEventWithValueAndTarget(
      //   "focus",
      //   valueToFill,
      //   input
      // );
      // input.dispatchEvent(focusEvent);

      // console.log("1", performance.now());

      // await prefillUtils.pause();
      // input.dispatchEvent(changeEvent);

      // console.log("2", performance.now());
      // await prefillUtils.pause();
      // try {
      //   document
      //     .querySelector(`${input.id}-dropdown-0`)
      //     .querySelector("button")
      //     .click();
      //   console.log("3", performance.now());
      //   await prefillUtils.pause();
      //   // submit the contents of the modal
      //   const modalSubmitButton = document.querySelector(
      //     '[data-it="it-AddressModal-content"] button[type="submit"]'
      //   ) as HTMLButtonElement;

      //   modalSubmitButton.click();
      //   console.log("4", performance.now());
      // } catch (err) {
      //   console.error(err);
      // }

      continue;
      // await prefillUtils.pause();
    } else if (fillValueDefinition.type === "textlike") {
      // some inputs trigger changes off of blur as well, so we fire a change then a blur with the
      // same values in succession
      prefillUtils.fillTextlikeInput(input, valueToFill);
    } else {
      throw new Error(`Unhandled input type: ${fillValueDefinition.type}`);
    }
  }
}

function advancePage() {
  const defaultContinueButton = document.querySelector(
    "#Continue"
  ) as HTMLButtonElement;
  // some tasks have a default continue button unassociated with values; if that's the
  // case, just click it
  if (defaultContinueButton) {
    return defaultContinueButton.click();
  }

  const submitEnumWrapper = document.querySelector('[data-it="SubmitEnum"]');
  const interstitialStartButton = document.querySelector(
    '[data-it="it-InterstitialView-primaryButton"]'
  ) as HTMLButtonElement;

  // We know that there will be only one set of submit enums per page.
  if (submitEnumWrapper) {
    const submitButtons = Array.from(
      submitEnumWrapper.querySelectorAll('button[type="submit"]')
    ) as HTMLElement[];
    prefillUtils.selectClickInput("button", submitButtons as any[]);
  } else if (interstitialStartButton) {
    interstitialStartButton.click();
  }
}

export async function fillTaskAndAdvancePage() {
  await fillTask();
  await prefillUtils.pause(150);
  advancePage();
}
