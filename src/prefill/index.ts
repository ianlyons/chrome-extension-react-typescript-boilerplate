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
    const input = nonButtonInputs[i] as HTMLElement;
    const propertyName = prefillUtils.decodePropertyName(input.id);
    const fillValueDefinition = prefillValues[propertyName];
    if (!fillValueDefinition) {
      console.info(`No prefillable value found for ${propertyName}`);
      continue;
    }
    // if (fillValueDefinition.type !== "address") continue;
    const valueToFill = fillValueDefinition.value;
    console.info(`Filling ${valueToFill} into ${propertyName}`);

    if (fillValueDefinition.type === "checkbox") {
      input.click();
      continue;
    } else if (fillValueDefinition.type === "radio") {
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
    } else {
      // some inputs trigger changes off of blur as well, so we fire a change then a blur with the
      // same values in succession
      const changeEvent = prefillUtils.createEventWithValueAndTarget(
        "change",
        valueToFill,
        input
      );
      const blurEvent = prefillUtils.createEventWithValueAndTarget(
        "blur",
        valueToFill,
        input
      );
      input.dispatchEvent(changeEvent);
      input.dispatchEvent(blurEvent);
    }
  }
}

export function advancePage() {
  const defaultContinueButton = document.querySelector("#Continue");
  // some tasks have a default continue button unassociated with values; if that's the
  // case, just click it
  if (defaultContinueButton) {
    return (defaultContinueButton as any).click();
  }

  const submitEnumWrapper = document.querySelector('[data-it="SubmitEnum"]');
  const interstitialStartButton = document.querySelector(
    '[data-it="it-InterstitialView-primaryButton"]'
  ) as HTMLButtonElement;
  if (submitEnumWrapper) {
    const submitValues = data.getButtonPrefillValues();
    const submitButtons = Array.from(
      submitEnumWrapper.querySelectorAll('button[type="submit"]')
    ) as HTMLButtonElement[];
    const submitButtonProperty = submitButtons[0].id.split("-")[0];
    const submitButtonChoice = submitValues[submitButtonProperty];
    if (submitButtonChoice) {
      const submitButtonId = `${submitButtonProperty}-${submitButtonChoice.value}`;
      document.getElementById(submitButtonId).click();
    } else {
      // otherwise, default to the first button /shrug
      submitButtons[0].click();
    }
  } else if (interstitialStartButton) {
    interstitialStartButton.click();
  }
}
