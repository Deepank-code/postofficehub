export const schemes = [
  {
    id: "rd",
    title: "Recurring Deposit Account",
    shortName: "RD",
    description:
      "If you want to save regularly with monthly deposits and earn attractive interest on your savings Recurring Deposit is for you.",
    detailedDescription:
      "Post Office Recurring Deposit Account allows you to save a fixed amount every month for a period of 5 years and earn attractive interest on your deposits you don't have to worry about market tends if it's going up and down.",
    minAmount: "₹100",
    maxAmount: "No Limit",
    tenure: "5 Years",
    interestRate: "6.7%",
    interestRateValue: 6.7,
    icon: "💰",
    eligibility: [
      "Any individual can open the account",
      "Joint account can be opened by up to 2 adults",
      "Guardian can open account for minor",
    ],
    benefits: [
      "Attractive interest rate",
      "Monthly investment habit",
      "Loan facility available",
      "Nomination facility available",
    ],
    taxBenefits:
      "Interest earned is taxable. TDS applicable if interest exceeds ₹40,000.",
    calculationType: "monthly",
    tenureOptions: [5],
  },
  {
    id: "td",
    title: "Time Deposit Account",
    shortName: "TD",
    description:
      "Fixed Deposit scheme with guaranteed returns for a tenure of 1 to 5 years, requiring just a one-time investment.",
    detailedDescription:
      "The Post Office Time Deposit Account is a fixed deposit scheme where you can invest a lump sum amount for a fixed period and earn guaranteed returns with government-backed interest rates. You can open unlimited accounts under this scheme, making it a flexible and secure option for your savings.",
    minAmount: "₹1,000",
    maxAmount: "No Limit",
    tenure: "1-5 Years",
    interestRate: "7.5%",
    interestRateValue: 7.5,
    icon: "🏦",
    eligibility: [
      "Any individual can open the account",
      "Joint account can be opened",
      "Minor account through guardian",
    ],
    benefits: [
      "Higher interest than savings account",
      "Flexible tenure options",
      "Invest in Lumpsum no monthly deposit headache",
      "Premature withdrawal allowed",
      "Loan facility available",
    ],
    taxBenefits:
      "Interest earned is taxable. TDS applicable if interest exceeds ₹40,000.",
    calculationType: "compound",
    tenureOptions: [1, 2, 3, 4, 5],
  },
  {
    id: "mis",
    title: "Monthly Income Scheme",
    shortName: "MIS",
    description:
      "Get monthly income with a one-time investment for 5 years with Post office you can earn attractive monthly fixed income",
    detailedDescription:
      "Post Office Monthly Income Scheme provides monthly income to investors through a one-time investment for a period of 5 years.",
    minAmount: "₹1,500",
    maxAmount: "₹9 Lakh (Single), ₹15 Lakh (Joint)",
    tenure: "5 Years",
    interestRate: "7.4%",
    interestRateValue: 7.4,
    icon: "📅",
    eligibility: [
      "Any individual above 10 years",
      "Joint account by 2 adults",
      "Trust and HUF can invest",
    ],
    benefits: [
      "Regular monthly income",
      "Capital protection",
      "Bonus on maturity",
      "Nomination facility",
    ],
    taxBenefits:
      "Monthly income is taxable. TDS applicable if income exceeds ₹40,000.",
    calculationType: "simple",
  },
  {
    id: "ssa",
    title: "Sukanya Samriddhi Account",
    shortName: "SSA",
    description:
      "Special savings scheme for girl child with highest interest rate and tax benefits.",
    detailedDescription:
      "Sukanya Samriddhi Account is a government savings scheme for girl children, offering the highest interest rate among all post office schemes with tax benefits.",
    minAmount: "₹250",
    maxAmount: "₹1.5 Lakh per year",
    tenure: "21 Years",
    interestRate: "8.2%",
    interestRateValue: 8.2,
    icon: "👧",
    eligibility: [
      "Girl child below 10 years",
      "Only 2 accounts per family",
      "Parent/guardian as account holder",
    ],
    benefits: [
      "Highest interest rate",
      "Tax benefits under 80C",
      "Tax-free maturity amount",
      "Partial withdrawal allowed",
    ],
    taxBenefits:
      "Investment qualifies for deduction under Section 80C. Maturity amount is tax-free.",
    calculationType: "compound",
    tenureOptions: [21],
  },
  {
    id: "kvp",
    title: "Kisan Vikas Patra",
    shortName: "KVP",
    description:
      "Double your money in approximately 10 years with this savings certificate.",
    detailedDescription:
      "Kisan Vikas Patra is a savings certificate scheme where your money gets doubled in approximately 10 years and 4 months.",
    minAmount: "₹1,000",
    maxAmount: "No Limit",
    tenure: "9 years and 7 months",
    interestRate: "7.5%",
    interestRateValue: 7.5,
    icon: "🌾",
    eligibility: [
      "Any individual can invest",
      "Joint investment allowed",
      "Minor through guardian",
    ],
    benefits: [
      "Money doubles in 9 years and 7 months",
      "No maximum limit",
      "Transfer allowed",
      "Nomination available",
    ],
    taxBenefits: "Interest earned is taxable. No TDS deduction.",
    calculationType: "compound",
    tenureOptions: [10.3],
  },
  {
    id: "nsc",
    title: "National Savings Certificate",
    shortName: "NSC",
    description:
      "5-year investment certificate with tax benefits under Section 80C.",
    detailedDescription:
      "National Savings Certificate is a 5-year fixed income investment scheme with tax benefits under Section 80C of Income Tax Act.",
    minAmount: "₹1,000",
    maxAmount: "No Limit",
    tenure: "5 Years",
    interestRate: "6.8%",
    interestRateValue: 6.8,
    icon: "📜",
    eligibility: [
      "Any individual can invest",
      "Joint investment allowed",
      "Trust, HUF can invest",
    ],
    benefits: [
      "Tax deduction under 80C",
      "Guaranteed returns",
      "Safe investment",
      "Transferable",
    ],
    taxBenefits:
      "Investment qualifies for deduction under Section 80C. Interest is taxable but gets reinvested.",
    calculationType: "compound",
    tenureOptions: [5],
  },
  {
    id: "scss",
    title: "Senior Citizens Savings Scheme",
    shortName: "SCSS",
    description:
      "Exclusive scheme for senior citizens with quarterly interest payments.",
    detailedDescription:
      "Senior Citizens Savings Scheme is exclusively for senior citizens, offering quarterly interest payments with attractive interest rates.",
    minAmount: "₹1,000",
    maxAmount: "₹30 Lakh",
    tenure: "5 Years",
    interestRate: "8.2%",
    interestRateValue: 8.2,
    icon: "👴",
    eligibility: [
      "Individual above 60 years",
      "Above 55 years if retired",
      "Defense personnel above 50 years",
    ],
    benefits: [
      "Highest interest rate for seniors",
      "Quarterly interest payment",
      "Tax deduction under 80C",
      "Premature closure allowed",
    ],
    taxBenefits:
      "Investment qualifies for deduction under Section 80C. Interest is taxable.",
    calculationType: "simple",
    tenureOptions: [5],
  },
];

export const interestRates = {
  lastUpdated: "Q3 FY 2025",
  rates: [
    { scheme: "Savings Account", rate: "4.0%" },
    { scheme: "Recurring Deposit", rate: "6.7%" },
    { scheme: "Time Deposit (1-5 years)", rate: "6.9%" },
    { scheme: "Monthly Income Scheme", rate: "7.4%" },
    { scheme: "Sukanya Samriddhi Account", rate: "8.2%" },
    { scheme: "Kisan Vikas Patra", rate: "7.5%" },
    { scheme: "National Savings Certificate", rate: "6.8%" },
    { scheme: "Senior Citizens Savings Scheme", rate: "8.2%" },
    { scheme: "Public Provident Fund", rate: "7.1%" },
  ],
};
