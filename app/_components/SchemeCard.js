import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileText,
} from "lucide-react";
import Link from "next/link";

const SchemeCard = ({
  id,
  title,
  shortName,
  description,
  minAmount,
  tenure,
  interestRate,
  icon,
}) => {
  const schemeDetails = {
    prematureWithdrawal:
      id === "ppf"
        ? "Not allowed before 15 years"
        : "Allowed after completion of tenure",
    requiredForm: `Form ${id.toUpperCase()}-1`,
    accountType: "Post Office Savings Account",
    taxBenefit: ["ppf", "nsc", "ssa"].includes(id)
      ? "Available under 80C"
      : "No tax benefit",
    eligibility: "Indian citizens of all ages",
    maturityPayout: "Direct transfer to linked bank account",
  };

  return (
    <Link href={`/schemes/${id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-yellow-400 overflow-hidden transform hover:scale-105">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-3xl">{icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                  {shortName}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{title}</p>
              </div>
            </div>
            <ArrowRight
              className="text-gray-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1"
              size={24}
            />
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-sm mb-6 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Key Features Grid */}
          <div className="grid grid-cols-3 gap-4 text-sm mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs font-medium">
                Min Investment
              </p>
              <p className="font-bold text-gray-800 mt-1">{minAmount}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-xs font-medium">Tenure</p>
              <p className="font-bold text-gray-800 mt-1">{tenure}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-gray-500 text-xs font-medium">Interest Rate</p>
              <p className="font-bold text-green-600 mt-1">{interestRate}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText size={14} className="text-yellow-600" />
                <span className="font-medium text-gray-700">
                  Required Form:
                </span>
              </div>
              <span className="text-gray-800 font-semibold">
                {schemeDetails.requiredForm}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CreditCard size={14} className="text-blue-600" />
                <span className="font-medium text-gray-700">Payout to:</span>
              </div>
              <span className="text-gray-800 font-semibold">
                {schemeDetails.accountType}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={14} className="text-orange-600" />
                <span className="font-medium text-gray-700">Premature:</span>
              </div>
              <span className="text-gray-800 font-semibold text-right">
                {schemeDetails.prematureWithdrawal}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle size={14} className="text-green-600" />
                <span className="font-medium text-gray-700">Tax Benefit:</span>
              </div>
              <span className="text-gray-800 font-semibold">
                {schemeDetails.taxBenefit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SchemeCard;
