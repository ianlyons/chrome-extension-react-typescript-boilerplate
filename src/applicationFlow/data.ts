import * as dataUtils from "../utils/dataUtils";
import * as utils from "../utils/utils";

interface FillDefinition {
  value: any;
  type?: InputType;
}

type FillValues = Record<string, FillDefinition>;

export async function getFillValuesForInputType(
  inputType: InputType
): Promise<FillValues> {
  const res: Record<string, any> = {};
  const fillValues = await getFillValues();
  utils.mapObject(fillValues, (value, key) => {
    if (value.type == inputType) {
      res[key] = value;
    }
  });
  return res;
}

async function defaultFillValues(
  prefillValues: FillValues
): Promise<FillValues> {
  const res: Record<string, any> = {};
  utils.mapObject(prefillValues, (value, key) => {
    res[key] = Object.assign({}, value, {
      type: value.type || "textlike",
    });
  });
  return res;
}

export async function getFillValues(): Promise<FillValues> {
  // TODO store this in state in case we need to reference it again
  const email = await dataUtils.getRandomEmail();

  return defaultFillValues({
    // Getting Started
    "Borrower.firstName": { value: "Ian" },
    "Borrower.lastName": { value: "Lyons" },
    "Borrower.homePhone": { value: "8023550813" },
    phoneNumber: { value: "8023770614" },
    phoneType: { value: "MOBILE" },
    "Borrower.maritalStatus": { value: "MARRIED" },
    "Borrower.currentAddress": { type: "address", value: "456 Washington St" },
    Accept_Terms_of_Service_and_EConsent: { type: "checkbox", value: true },
    "Email input": { value: email },
    "Email match confirmation": { value: email },
    accountCreationPassword: { value: "Password123!" },
    "Does_the_coborrower_exists?": {
      type: "button",
      value: "No",
    },

    "Application.loanPurpose": { type: "button", value: "PURCHASE" },

    "CurrentBorrower.consentToLenderContactGiven": {
      type: "checkbox",
      value: true,
    },

    "Accept Terms of Service and EConsent": {
      type: "checkbox",
      value: true,
    },

    // Getting to Know You
    "Application.propertyInfo.propertyType": { value: "SINGLE_FAMILY" },
    "Application.propertyUsageTypePurchase": { value: "PRIMARY_RESIDENCE" },
    "Application.propertyUsageTypePurchaseNewURLA": {
      value: "PRIMARY_RESIDENCE",
    },
    County_Name: {
      value: "New York",
      type: "typeahead",
    },
    "Application.appraisalValue": { value: "1000000" },
    "Application.purchasePrice": { value: "1000000" },
    "Application.totalDownPayment": { value: "200000" },
    "Application.loanAmount": { value: "800000" },
    "Borrower.SSN": { value: "001010001" },
    "Borrower.birthDate": { value: "05/01/1990" },

    // Income
    "Income.employers__id_currentEmployerId.name": { value: "Blend Labs" },
    "Income.employers__id_currentEmployerId.phoneNumber": {
      value: "8024567890",
    },
    "Income.employers__id_currentEmployerId.startDate": { value: "05/26/2014" },
    "Income.employers__id_currentEmployerId.yearsInProfession": { value: "10" },
    "Income.incomes_employerId_currentEmployerId_type_BASE.frequency": {
      value: "YEARLY",
    },
    "Income.incomes_employerId_currentEmployerId_type_BASE.yearlyIncome": {
      value: "100000",
    },

    // REO
    "CurrentREO.type": { value: "SINGLE_FAMILY" },
    "CurrentREO.address": { type: "address", value: "15 E. 76th St" },
    "CurrentREO.presentMarketValue": { value: "1000000" },
    "CurrentREO.usageType": { value: "PRIMARY_RESIDENCE" },
    "CurrentREO.dispositionType": {
      value: "RETAIN_FOR_PRIMARY_OR_SECONDARY_RESIDENCE",
    },
    "CurrentREO.mortgageCount": { value: "0" },
    addREO: {
      type: "button",
      value: "No,_done_adding_property",
    },

    // Demographics
    "CurrentBorrower.HMDASexType": {
      type: "multicheckbox",
      value: "NOT_PROVIDED",
    },
    "CurrentBorrower.HMDAEthnicityType": {
      type: "multicheckbox",
      value: "NOT_PROVIDED",
    },
    "CurrentBorrower.HMDARaceType": {
      type: "multicheckbox",
      value: "NOT_PROVIDED",
    },

    // Additional Questions
    "CurrentBorrower.currentAddress.moveIn": { value: "05/01/2014" },
    "CurrentBorrower.currentAddressResidencyType": {
      value: "LIVING_RENT_FREE",
    },
    "CurrentBorrower.declarations.ownershipInterestType": {
      type: "radio",
      value: "PRIMARY_RESIDENCE",
    },
    "CurrentBorrower.declarations.titleHeldType": {
      type: "radio",
      value: "SELF",
    },
    "CurrentBorrower.dependentCount": { value: "0" },
    Opt_into_Brokerage: {
      type: "button",
      value: "Not_interested",
    },

    // Review and Submit
    "Application.Borrower.estimatedCreditScore": {
      type: "textlike",
      value: "720",
    },
    preferredProducts: {
      type: "multicheckbox",
      value: "15 Year Fixed Rate",
    },
    "Borrower.estimatedCreditScore": {
      value: "759",
    },
    loanResultPreference: {
      value: "minimizeMonthlyPayment",
    },
  });
}
