import * as dataUtils from "../utils/dataUtils";
import * as inputUtils from "../utils/inputUtils";

export async function createAccount() {
  const email = await dataUtils.getRandomEmail();
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const emailInput2 = document.getElementById("email2") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  await inputUtils.fillTextlikeInput(emailInput, email);
  await inputUtils.fillTextlikeInput(emailInput2, email);
  await inputUtils.fillTextlikeInput(passwordInput, "Password123!");
  const submitButton = document.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement;
  submitButton.click();
}
