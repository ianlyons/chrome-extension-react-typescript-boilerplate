function getRandomEmail(baseUsername: string) {
  const randomExtension = Math.random().toString(36).substring(7);
  return `${baseUsername}+${randomExtension}@blend.com`;
}

interface GetPrefillValuesOpts {
  baseUsername: string;
}

export function getPrefillValues(opts: GetPrefillValuesOpts) {
  // TODO store this in state in case we need to reference it again
  const email = getRandomEmail(opts.baseUsername);

  return {
    // Getting Started
    "Borrower.firstName": { value: "Ian" },
    "Borrower.lastName": { value: "Lyons" },
    "Borrower.homePhone": { value: "8023550813" },
    phoneNumber: { value: "8023770614" },
    phoneType: { value: "MOBILE" },
    "Borrower.maritalStatus": { value: "MARRIED" },
    "Borrower.currentAddress": { type: "address", value: "456 Washington St" },
    Accept_Terms_of_Service_and_EConsent: { type: "checkbox", value: true },
    Email_input: { value: email },
    Email_match_confirmation: { value: email },

    "Application.loanPurpose": { type: "button", value: "PURCHASE" },

    "CurrentBorrower.consentToLenderContactGiven": {
      type: "checkbox",
      value: true,
    },

    // Getting to Know You
    "Application.propertyInfo.propertyType": { value: "SINGLE_FAMILY" },
    "Application.propertyUsageTypePurchase": { value: "PRIMARY_RESIDENCE" },
    "Application.appraisalValue": { value: "1000000" },
    "Application.purchasePrice": { value: "1000000" },
    "Application.totalDownPayment": { value: "200000" },
    "Application.loanAmount": { value: "800000" },
    County_Name: { value: "New York Country" },
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
      value: 100000,
    },

    // REO
    "CurrentREO.type": { value: "SINGLE_FAMILY" },
    "CurrentREO.presentMarketValue": { value: "1000000" },
    "CurrentREO.usageType": { value: "PRIMARY_RESIDENCE" },
    "CurrentREO.dispositionType": {
      value: "RETAIN_FOR_PRIMARY_OR_SECONDARY_RESIDENCE",
    },
    "CurrentREO.mortgageCount": { value: 0 },

    // Demographics
    "CurrentBorrower.HMDASexType-NOT_PROVIDED": {
      type: "checkbox",
      value: true,
    },
    // Demographics
    "CurrentBorrower.HMDAEthnicityType-NOT_PROVIDED": {
      type: "checkbox",
      value: true,
    },
    // Demographics
    "CurrentBorrower.HMDARaceType-NOT_PROVIDED": {
      type: "checkbox",
      value: true,
    },

    // Additional Questions
    "CurrentBorrower.currentAddress.moveIn": { value: "05/01/2014" },
    "CurrentBorrower.currentAddressResidencyType": {
      value: "LIVING_RENT_FREE",
    },
    "CurrentBorrower.dependentCount": { value: "0" },
  };
}
