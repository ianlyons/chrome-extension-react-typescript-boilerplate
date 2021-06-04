import * as utils from "../utils/utils";

export async function getRandomEmail() {
  const randomExtension = Math.random().toString(36).substring(7);
  const username = (await utils.getStoredValue("username")).username;
  return `${username}+${randomExtension}@blend.com`;
}
