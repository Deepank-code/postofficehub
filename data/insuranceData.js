export const pliPlans = [
  {
    id: "pli-whole-life",
    name: "Whole Life Assurance",
    type: "PLI",
    premium: "Flexible",
    sumAssured: "₹20,000 - ₹50,00,000",
    maturityAge: 80,
    features: [
      "Life cover till age 80",
      "Loan facility",
      "Surrender value",
      "Bonus participation",
    ],
    eligibility: "Central/State Govt employees",
  },
  {
    id: "pli-endowment",
    name: "Endowment Assurance",
    type: "PLI",
    premium: "Fixed",
    sumAssured: "₹20,000 - ₹50,00,000",
    maturityAge: "Varies (15-35 years)",
    features: [
      "Maturity benefit",
      "Death benefit",
      "Loan facility",
      "Bonus participation",
    ],
    eligibility: "Central/State Govt employees",
  },
  {
    id: "pli-term",
    name: "Term Assurance",
    type: "PLI",
    premium: "Low",
    sumAssured: "₹1,00,000 - ₹50,00,000",
    maturityAge: "No maturity",
    features: [
      "Pure life cover",
      "Low premium",
      "High sum assured",
      "No maturity benefit",
    ],
    eligibility: "Central/State Govt employees",
  },
];

export const rpliPlans = [
  {
    id: "rpli-whole-life",
    name: "Whole Life Policy",
    type: "RPLI",
    premium: "Flexible",
    sumAssured: "₹10,000 - ₹10,00,000",
    maturityAge: 80,
    features: [
      "Life cover till age 80",
      "Loan facility",
      "Surrender value",
      "Bonus participation",
    ],
    eligibility: "Rural postal employees",
  },
  {
    id: "rpli-endowment",
    name: "Endowment Policy",
    type: "RPLI",
    premium: "Fixed",
    sumAssured: "₹10,000 - ₹10,00,000",
    maturityAge: "Varies (10-20 years)",
    features: [
      "Maturity benefit",
      "Death benefit",
      "Loan facility",
      "Bonus participation",
    ],
    eligibility: "Rural postal employees",
  },
  {
    id: "rpli-term",
    name: "Term Policy",
    type: "RPLI",
    premium: "Very Low",
    sumAssured: "₹50,000 - ₹10,00,000",
    maturityAge: "No maturity",
    features: [
      "Pure life cover",
      "Lowest premium",
      "High sum assured",
      "No maturity benefit",
    ],
    eligibility: "Rural postal employees",
  },
];

export const competitorRates = [
  {
    provider: "LIC",
    planName: "Jeevan Anand",
    premium: "₹15,000/year",
    sumAssured: "₹10,00,000",
    maturity: "25 years",
    returns: "5-6%",
  },
  {
    provider: "SBI Life",
    planName: "Smart Wealth Builder",
    premium: "₹18,000/year",
    sumAssured: "₹10,00,000",
    maturity: "20 years",
    returns: "6-7%",
  },
  {
    provider: "HDFC Life",
    planName: "Sanchay Plus",
    premium: "₹20,000/year",
    sumAssured: "₹10,00,000",
    maturity: "15 years",
    returns: "6-8%",
  },
  {
    provider: "PLI",
    planName: "Whole Life Assurance",
    premium: "₹12,000/year",
    sumAssured: "₹10,00,000",
    maturity: "25 years",
    returns: "7-8%",
  },
  {
    provider: "RPLI",
    planName: "Endowment Policy",
    premium: "₹10,000/year",
    sumAssured: "₹10,00,000",
    maturity: "20 years",
    returns: "7-8%",
  },
];

export const importantDocuments = [
  {
    title: "PLI form",
    description: "Postal life insurance form",
    fileSize: "-",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/1meN7rYwiF8LAeX1KXuWdKT4eYMvZR7DG/view?usp=sharing",
  },
  {
    title: "RPLI Scheme Insurance form",
    description: "RPLI schemes for rural employees",
    fileSize: "-",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/1_h2zl0qeM_pyIBQZ44eg7P8E1mnFWvrX/view?usp=sharing",
  },
  {
    title: "Death claim form",
    description: "Age-wise premium calculation tables for all PLI/RPLI plans",
    fileSize: "-",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/1iveY2M9U1Z0AISgQQ5I5WntQBE4D9fSl/view?usp=sharing",
  },
  {
    title: "Surrender RPLI/PLI form",
    description: " policy surrender settlement",
    fileSize: "1.5 MB",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/1d75eSJvAZqSMoHuZS9nw0RP0rXohgCZL/view?usp=sharing",
  },
  {
    title: "Revival Application form",
    description: "Downloadable forms for new policy applications",
    fileSize: "0.8 MB",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/17bXFEL1iT4zvXgo4K63OjlB-I6CQDJ9M/view?usp=sharing",
  },
  {
    title: "Loan Application form",
    description: "APPLICATION FOR LOAN ON SECURITY OF PLI/RPLI POLICY",
    fileSize: "-",
    type: "PDF",
    downloadUrl:
      "https://drive.google.com/file/d/14ZRwjzRkzaIYK4mAhr1zLeVymrD7Bg8z/view?usp=sharing",
  },
];

export const bankInterestRates = [
  {
    bank: "SBI",
    savingsRate: "2.70%",
    fdRate1Year: "6.10%",
    fdRate5Year: "6.50%",
    recurringDeposit: "6.10%",
  },
  {
    bank: "HDFC Bank",
    savingsRate: "3.00%",
    fdRate1Year: "6.25%",
    fdRate5Year: "6.75%",
    recurringDeposit: "6.25%",
  },
  {
    bank: "ICICI Bank",
    savingsRate: "3.00%",
    fdRate1Year: "6.20%",
    fdRate5Year: "6.70%",
    recurringDeposit: "6.20%",
  },
  {
    bank: "Axis Bank",
    savingsRate: "3.00%",
    fdRate1Year: "6.30%",
    fdRate5Year: "6.80%",
    recurringDeposit: "6.30%",
  },
  {
    bank: "Post Office",
    savingsRate: "4.00%",
    fdRate1Year: "6.90%",
    fdRate5Year: "6.90%",
    recurringDeposit: "6.70%",
  },
];
