import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

const rpliPlans = [
  {
    name: "Whole Life Assurance (Gram Suraksha)",
    points: [
      "Lifetime coverage for rural policyholders.",
      "Affordable premiums with lifelong risk cover.",
      "Loan facility after 3 years of policy.",
      "Surrender option after 3 years.",
      "Government-backed with attractive bonuses.",
    ],
  },
  {
    name: "Convertible Whole Life Assurance (Gram Suvidha)",
    points: [
      "Can convert to Endowment after 5 years.",
      "Low initial premiums to ease entry.",
      "Flexibility to meet changing needs.",
      "Loan and surrender facilities available.",
      "Eligible for tax savings on premiums.",
    ],
  },
  {
    name: "Endowment Assurance (Gram Santosh)",
    points: [
      "Insurance plus savings for rural families.",
      "Lump-sum on maturity or death of policyholder.",
      "Loan available after 3 years of payment.",
      "Eligible for tax benefits under 80C.",
      "Backed by the government for claim security.",
    ],
  },
  {
    name: "10 Years Rural PLI (Gram Priya)",
    points: [
      "Short-term insurance plan with 10-year tenure.",
      "Ideal for rural customers seeking quicker returns.",
      "Low premium, high security, and bonus benefits.",
      "Loan and surrender facility available.",
      "Tax benefits on premiums paid.",
    ],
  },
  {
    name: "Children Policy (Bal Jeevan Bima)",
    points: [
      "Coverage for children in rural areas.",
      "Premiums waived on proposer’s death.",
      "Payout to the child at maturity age.",
      "Loan available after 3 years of policy.",
      "Encourages insurance awareness in villages.",
    ],
  },
];

export default function RPLIPlansAccordion() {
  return (
    <div className="w-full space-y-2">
      {rpliPlans.map((plan, idx) => (
        <Disclosure key={idx}>
          {({ open }) => (
            <div className="border border-green-200 rounded-lg shadow-sm bg-green-50">
              <Disclosure.Button className="flex w-full justify-between items-center px-4 py-3 text-left text-sm font-medium text-green-800 hover:bg-green-100 rounded-t-lg">
                <span>{plan.name}</span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-green-600`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-3 pt-1 text-sm text-green-700">
                <ul className="list-disc list-inside space-y-1">
                  {plan.points.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
