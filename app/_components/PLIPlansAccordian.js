import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

const pliPlans = [
  {
    name: "Whole Life Assurance (Suraksha)",
    points: [
      "Coverage throughout the policyholder’s lifetime.",
      "Premiums paid up to a certain age while coverage continues.",
      "Eligible for policy loans after 3 years.",
      "Surrender facility available after 3 years.",
      "Bonus and maturity benefits backed by the government.",
    ],
  },
  {
    name: "Convertible Whole Life Assurance (Suvidha)",
    points: [
      "Option to convert into Endowment after 5 years.",
      "Flexibility to adjust plans based on future needs.",
      "Lower premium rates during initial years.",
      "Loan and surrender facilities available.",
      "Eligible for tax benefits under Section 80C.",
    ],
  },
  {
    name: "Endowment Assurance (Santosh)",
    points: [
      "Combines insurance and savings.",
      "Lump-sum payment on maturity or on death.",
      "Loan facility after 3 years of policy.",
      "Eligible for tax benefits on premiums.",
      "Bonus declared annually, enhancing returns.",
    ],
  },
  {
    name: "Joint Life Assurance (Yugal Suraksha)",
    points: [
      "Covers both husband and wife under one policy.",
      "Premiums based on the elder’s age.",
      "Ensures financial security for families.",
      "Loan facility after 3 years of policy.",
      "Tax benefits and government-backed claims.",
    ],
  },
  {
    name: "Children Policy (Bal Jeevan Bima)",
    points: [
      "Coverage for children aged 5–20 years.",
      "Premium waiver on the proposer’s death.",
      "Maturity benefit at age 25 for the child.",
      "Loan facility after 3 years.",
      "Bonus and tax benefits included.",
    ],
  },
];

export default function PLIPlansAccordion() {
  return (
    <div className="w-full space-y-2">
      {pliPlans.map((plan, idx) => (
        <Disclosure key={idx}>
          {({ open }) => (
            <div className="border border-blue-200 rounded-lg shadow-sm bg-blue-50">
              <Disclosure.Button className="flex w-full justify-between items-center px-4 py-3 text-left text-sm font-medium text-blue-800 hover:bg-blue-100 rounded-t-lg">
                <span>{plan.name}</span>
                <ChevronUp
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-600`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-3 pt-1 text-sm text-blue-700">
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
