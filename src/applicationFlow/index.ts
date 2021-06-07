import * as taskFillUtils from "./taskFillUtils";
import * as utils from "../utils/utils";
import * as data from "./data";

interface FillTaskOpts {
  isDebugMode: boolean;
}

export async function fillTask(opts: FillTaskOpts) {
  const debugLogger = utils.getDebugLogger(opts.isDebugMode);
  const prefillValues = await data.getFillValues();
  const taskForm = document.querySelector("#taskForm");

  if (!taskForm) {
    debugLogger("Not on task page, skipping task fill");
    return;
  }

  const nonButtonInputs = Array.from(
    taskForm.querySelectorAll("input,select,textarea")
  );

  const alreadyCompletedInputs = new Set();

  for (let i = 0; i < nonButtonInputs.length; i++) {
    let input = nonButtonInputs[i] as any;

    const propertyName = taskFillUtils.decodePropertyName(
      input?.name || input.id
    );
    console.log(`input is:`, input);
    const fillValueDefinition = prefillValues[propertyName];
    if (!fillValueDefinition) {
      debugLogger(`No prefillable value found for ${propertyName}`);
      continue;
    }

    // this stops us from re-filling (or re-checking/unchecking) situations where a single
    // control (e.g. a multicheckbox) is comprised of multiple input elements
    if (alreadyCompletedInputs.has(input.name)) {
      debugLogger(
        `Returning early for already-completed input id ${input.name}`
      );
      continue;
    } else {
      alreadyCompletedInputs.add(input.name);
    }

    // sometimes through rerenders, an input can be removed from the DOM. the result of this
    // is that our reference is stale; refresh it here.
    if (!input.isConnected) {
      input = document.getElementById(input.id);
    }

    const valueToFill = fillValueDefinition.value;
    debugLogger(`Filling ${valueToFill} into ${propertyName}`);

    if (fillValueDefinition.type === "checkbox") {
      input.click();
      continue;
    } else if (fillValueDefinition.type === "radio") {
      const radioInput = input as HTMLInputElement;
      const radioInputs = Array.from(
        document.querySelectorAll(`input[name="${radioInput.name}"]`)
      ) as HTMLInputElement[];
      taskFillUtils.selectClickInput("radio", radioInputs);
    } else if (fillValueDefinition.type === "multicheckbox") {
      const multicheckboxInput = input as HTMLInputElement;
      const multicheckboxInputs = Array.from(
        document.querySelectorAll(`input[name="${multicheckboxInput.name}"]`)
      ) as HTMLInputElement[];
      taskFillUtils.selectClickInput("multicheckbox", multicheckboxInputs);
    } else if (fillValueDefinition.type === "address") {
      await taskFillUtils.fillAddressInput(input, valueToFill);
    } else if (fillValueDefinition.type === "textlike") {
      // some inputs trigger changes off of blur as well, so we fire a change then a blur with the
      // same values in succession
      await taskFillUtils.fillTextlikeInput(input, valueToFill);
    } else if (fillValueDefinition.type === "typeahead") {
      await taskFillUtils.fillTypeaheadInput(input, valueToFill);
    } else {
      throw new Error(`Unhandled input type: ${fillValueDefinition.type}`);
    }
  }
}

async function advancePage() {
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
    await taskFillUtils.selectClickInput("button", submitButtons as any[]);
  } else if (interstitialStartButton) {
    interstitialStartButton.click();
  }
}

interface FillTaskAndAdvancePageOpts {
  isDebugMode: boolean;
}

export async function fillTaskAndAdvancePage(opts: FillTaskAndAdvancePageOpts) {
  await fillTask({ isDebugMode: opts.isDebugMode });
  await utils.pause(200);
  console.log("advancing page");
  await advancePage();
}
