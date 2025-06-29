import { Calendar, TrendingUp, Info } from "lucide-react";

import { interestRates } from "@/data/schemes";
import Image from "next/image";

const InterestRates = () => {
  //   const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Page Header */}
      <section className="w-full  bg-gradient-to-r from-red-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center flex-col gap-4 mb-4">
            <div>
              <Image
                src={"/post-inste.png"}
                alt={"parcel"}
                width={300}
                height={300}
                quality={80} // Slightly higher quality for sharper images
                priority
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">Current Interest Rates</h1>
          </div>
          <p className="text-xl text-white mb-6">
            Latest interest rates for all Post Office savings schemes
          </p>
          <div className="flex items-center justify-center space-x-2 text-white">
            <Calendar size={20} />
            <span>Last Updated: {interestRates.lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Interest Rates Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Post Office Savings Schemes Interest Rates
              </h2>
              <p className="text-gray-600 mt-1">
                Government notified rates effective from Q3 FY 2025
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Scheme Name
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Interest Rate (% p.a.)
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Compounding
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Tenure
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">💰</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Post Office Savings Account
                          </p>
                          <p className="text-sm text-gray-600">
                            Regular savings account
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        4.0%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      No fixed tenure
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">💰</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Recurring Deposit Account (RD)
                          </p>
                          <p className="text-sm text-gray-600">
                            Monthly savings scheme
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        6.7%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Quarterly
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      5 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🏦</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Time Deposit Account (TD)
                          </p>
                          <p className="text-sm text-gray-600">
                            Fixed deposit scheme
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        6.9%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      1-5 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📅</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Monthly Income Scheme (MIS)
                          </p>
                          <p className="text-sm text-gray-600">
                            Monthly income scheme
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        7.4%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Monthly payouts
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      5 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 bg-yellow-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">👧</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Sukanya Samriddhi Account (SSA)
                          </p>
                          <p className="text-sm text-gray-600">
                            Girl child savings scheme
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-orange-600">
                        8.2%
                      </span>
                      <div className="text-xs text-orange-600 font-medium">
                        HIGHEST
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      21 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🌾</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Kisan Vikas Patra (KVP)
                          </p>
                          <p className="text-sm text-gray-600">
                            Money doubling scheme
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        7.5%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      124 Monthly payouts
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📜</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            National Savings Certificate (NSC)
                          </p>
                          <p className="text-sm text-gray-600">
                            Tax saving certificate
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        6.8%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      5 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 bg-blue-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">👴</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Senior Citizens Savings Scheme (SCSS)
                          </p>
                          <p className="text-sm text-gray-600">
                            For senior citizens only
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-blue-600">
                        8.2%
                      </span>
                      <div className="text-xs text-blue-600 font-medium">
                        HIGHEST
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Quarterly
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      5 years
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🏛️</span>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Public Provident Fund (PPF)
                          </p>
                          <p className="text-sm text-gray-600">
                            Long-term tax saving
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-green-600">
                        7.1%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      Annually
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      15 years
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Info className="text-blue-600" size={24} />
                <h3 className="text-lg font-bold text-blue-800">
                  Rate Revision Information
                </h3>
              </div>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>
                  • Interest rates are reviewed quarterly by the Government of
                  India
                </li>
                <li>• Rates are effective from the date of notification</li>
                <li>
                  • Existing accounts continue with rates applicable at the time
                  of opening
                </li>
                <li>• New investments get current prevailing rates</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-lg font-bold text-yellow-800">
                  Important Notes
                </h3>
              </div>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• Interest rates shown are per annum (yearly)</li>
                <li>• TDS applicable on interest income exceeding ₹40,000</li>
                <li>• Premature withdrawal may result in penalty</li>
                <li>• Consult post office for latest rate confirmations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterestRates;
