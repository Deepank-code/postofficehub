"use client";
import {
  Shield,
  Download,
  TrendingUp,
  FileText,
  GitCompare,
  Info,
} from "lucide-react";
import { useState } from "react";
import {
  pliPlans,
  rpliPlans,
  competitorRates,
  importantDocuments,
  bankInterestRates,
} from "@/data/insuranceData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/_ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/_ui/table";
import RPLIPlansAccordion from "../_components/RPLIPlansAccordian";
import PLIPlansAccordion from "../_components/PLIPlansAccordian";
import Image from "next/image";

const Insurance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownload = (docTitle) => {
    alert(`Downloading: ${docTitle}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Page Header */}
      <section
        className="bg-gradient-to-r from-red-600 to-yellow-500
 text-white py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center flex-col gap-4 space-x-3 mb-4">
            <div>
              <Image
                src={"/post-parcell.png"}
                alt={"parcel"}
                width={300}
                height={300}
                quality={80} // Slightly higher quality for sharper images
                priority
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">Post Office Insurance</h1>
          </div>
          <p className="text-xl mb-6">
            PLI & RPLI - Secure Your Future with Government-Backed Insurance
          </p>
        </div>
      </section>

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 ">
          <div className="flex justify-center space-x-2 overflow-x-auto py-4">
            {[
              { id: "overview", label: "Overview", icon: Info },
              { id: "plans", label: "Plans & Features", icon: Shield },
              { id: "compare", label: "Rate Comparison", icon: GitCompare },
              { id: "documents", label: "Documents", icon: FileText },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeTab === id
                    ? "bg-red-600 text-white border-red-600 shadow"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* PLI and RPLI Cards */}
            <div className="grid md:grid-cols-1 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-800">
                    <Shield size={24} />
                    <span>Postal Life Insurance (PLI)</span>
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Government-backed life insurance since 1884, providing
                    secure and affordable coverage for government, PSU
                    employees, and professionals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-blue-800 text-sm space-y-3">
                  <p>
                    PLI started in 1884 for postal workers and expanded to cover
                    wider government staff and professionals. It offers
                    affordable premiums, guaranteed claims, and attractive
                    bonuses while providing financial protection for families
                    across India.
                  </p>
                  <p className="font-semibold mb-1">
                    Available Plans (Tap to view details):
                  </p>
                  <PLIPlansAccordion />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <Shield size={24} />
                    <span>Rural Postal Life Insurance (RPLI)</span>
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Affordable life insurance since 1995 for India&apos;s rural
                    families, providing secure, government-backed coverage with
                    bonus benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-green-800 text-sm space-y-3">
                  <p>
                    Launched in 1995, RPLI brings insurance to rural India,
                    ensuring low-cost, reliable financial security using the
                    vast post office network. It aims to protect farmers,
                    workers, and families with guaranteed claims and accessible
                    plans.
                  </p>
                  <p className="font-semibold mb-1">
                    Available Plans (Tap to view details):
                  </p>
                  <RPLIPlansAccordion />
                </CardContent>
              </Card>
            </div>

            {/* Why PLI/RPLI is Better */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-800">
                  <TrendingUp size={24} />
                  <span>Why PLI/RPLI is Better than Private Insurance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Lower Premiums
                    </h3>
                    <p className="text-sm text-gray-600">
                      20-30% lower premiums compared to LIC and private insurers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🛡️</div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Government Security
                    </h3>
                    <p className="text-sm text-gray-600">
                      Backed by Government of India, ensuring 100% claim
                      settlement
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Better Returns
                    </h3>
                    <p className="text-sm text-gray-600">
                      Higher bonus rates and better returns on maturity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "compare" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitCompare size={24} />
                  <span>Insurance Premium Comparison</span>
                </CardTitle>
                <CardDescription>
                  Compare similar plans across different providers (Sum Assured:
                  ₹10 Lakh)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider</TableHead>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Annual Premium</TableHead>
                      <TableHead>Maturity Period</TableHead>
                      <TableHead>Expected Returns</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorRates.map((rate, index) => (
                      <TableRow
                        key={index}
                        className={
                          rate.provider === "PLI" || rate.provider === "RPLI"
                            ? "bg-green-50"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          {rate.provider === "PLI" ||
                          rate.provider === "RPLI" ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">
                              {rate.provider}
                            </span>
                          ) : (
                            rate.provider
                          )}
                        </TableCell>
                        <TableCell>{rate.planName}</TableCell>
                        <TableCell>{rate.premium}</TableCell>
                        <TableCell>{rate.maturity}</TableCell>
                        <TableCell>{rate.returns}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp size={24} />
                  <span>Bank Interest Rates Comparison</span>
                </CardTitle>
                <CardDescription>
                  Current interest rates across major banks and Post Office
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank/Institution</TableHead>
                      <TableHead>Savings Account</TableHead>
                      <TableHead>FD (1 Year)</TableHead>
                      <TableHead>FD (5 Year)</TableHead>
                      <TableHead>Recurring Deposit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankInterestRates.map((rate, index) => (
                      <TableRow
                        key={index}
                        className={
                          rate.bank === "Post Office" ? "bg-red-50" : ""
                        }
                      >
                        <TableCell className="font-medium">
                          {rate.bank === "Post Office" ? (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                              {rate.bank}
                            </span>
                          ) : (
                            rate.bank
                          )}
                        </TableCell>
                        <TableCell>{rate.savingsRate}</TableCell>
                        <TableCell>{rate.fdRate1Year}</TableCell>
                        <TableCell>{rate.fdRate5Year}</TableCell>
                        <TableCell>{rate.recurringDeposit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "documents" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <FileText size={24} />
              <span>Important Documents & Forms</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantDocuments.map((doc, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                        <FileText className="text-red-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-2">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {doc.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {doc.type} • {doc.fileSize}
                          </span>
                          <button
                            onClick={() => handleDownload(doc.title)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm"
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insurance;
