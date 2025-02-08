import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  HelpCircle,
  IndianRupee,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

//
// Tooltip Component
//
const Tooltip = ({ text }) => (
  <div className="group relative">
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-help" />
    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-sm rounded p-2 -right-2 transform translate-x-full -translate-y-1/2 w-64">
      {text}
      <div className="absolute left-0 top-1/2 transform -translate-x-1 rotate-45 w-2 h-2 bg-gray-800"></div>
    </div>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

//
// TaxForm Component
//
export const TaxForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    totalIncome: 0,
    otherIncome: 0,
    age: 30,
    hra: 0,
    housingLoanInterest: 0,
    section80C: 0,
    section80CCD: 0,
    section80CCD1B: 0,
    section80D: 0,
    section80E: 0,
    section80EEA: 0,
    section80EEB: 0,
    section80G: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "age" ? parseInt(value, 10) || 0 : parseFloat(value) || 0,
    }));
  };

  // Updated inputClasses: removed "text-right" and added "pl-4" for left padding.
  const inputClasses =
    "mt-1 block w-full h-12 text-lg rounded-md bg-gray-700 border-gray-600 text-white pl-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50";
  const labelClasses =
    "block text-sm font-medium text-gray-300 flex items-center gap-2";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Tax Calculator
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Income Details
          </h3>

          <div>
            <label htmlFor="totalIncome" className={labelClasses}>
              Yearly Income from Salary
              <Tooltip text="Enter your total annual salary before any deductions" />
            </label>
            <input
              type="number"
              id="totalIncome"
              name="totalIncome"
              value={formData.totalIncome}
              onChange={handleChange}
              className={inputClasses}
              min="0"
              step="1000"
              required
            />
          </div>

          <div>
            <label htmlFor="otherIncome" className={labelClasses}>
              Income from Other Sources
              <Tooltip text="Include interest income, rental income, etc." />
            </label>
            <input
              type="number"
              id="otherIncome"
              name="otherIncome"
              value={formData.otherIncome}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="age" className={labelClasses}>
              Age
            </label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="30">Less than 60</option>
              <option value="65">60 to 80</option>
              <option value="81">Above 80</option>
            </select>
          </div>
        </div>

        {/* Exemptions & Deductions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Exemptions & Deductions
          </h3>

          <div>
            <label htmlFor="hra" className={labelClasses}>
              HRA and Other Exemptions
              <Tooltip text="House Rent Allowance and other salary exemptions" />
            </label>
            <input
              type="number"
              id="hra"
              name="hra"
              value={formData.hra}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="housingLoanInterest" className={labelClasses}>
              Interest on Housing Loan
              <Tooltip text="Maximum deduction: ₹2,00,000" />
            </label>
            <input
              type="number"
              id="housingLoanInterest"
              name="housingLoanInterest"
              value={formData.housingLoanInterest}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="section80C" className={labelClasses}>
              Section 80C
              <Tooltip text="PF, PPF, Insurance Premium (Max: ₹1,50,000)" />
            </label>
            <input
              type="number"
              id="section80C"
              name="section80C"
              value={formData.section80C}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      {/* Additional Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="section80CCD" className={labelClasses}>
            Section 80CCD (NPS)
            <Tooltip text="Employee's contribution to NPS (Max: ₹1,50,000)" />
          </label>
          <input
            type="number"
            id="section80CCD"
            name="section80CCD"
            value={formData.section80CCD}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80CCD1B" className={labelClasses}>
            Section 80CCD(1B)
            <Tooltip text="Additional NPS contribution (Max: ₹50,000)" />
          </label>
          <input
            type="number"
            id="section80CCD1B"
            name="section80CCD1B"
            value={formData.section80CCD1B}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80D" className={labelClasses}>
            Section 80D
            <Tooltip text="Medical Insurance Premium" />
          </label>
          <input
            type="number"
            id="section80D"
            name="section80D"
            value={formData.section80D}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80E" className={labelClasses}>
            Section 80E
            <Tooltip text="Interest on Education Loan" />
          </label>
          <input
            type="number"
            id="section80E"
            name="section80E"
            value={formData.section80E}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80EEA" className={labelClasses}>
            Section 80EEA
            <Tooltip text="Interest on Home Loan for Affordable Housing (Max: ₹1,50,000)" />
          </label>
          <input
            type="number"
            id="section80EEA"
            name="section80EEA"
            value={formData.section80EEA}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80EEB" className={labelClasses}>
            Section 80EEB
            <Tooltip text="Interest on Electric Vehicle Loan (Max: ₹1,50,000)" />
          </label>
          <input
            type="number"
            id="section80EEB"
            name="section80EEB"
            value={formData.section80EEB}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="section80G" className={labelClasses}>
            Section 80G
            <Tooltip text="Donations to Charity" />
          </label>
          <input
            type="number"
            id="section80G"
            name="section80G"
            value={formData.section80G}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
            Calculating...
          </div>
        ) : (
          "Calculate Tax"
        )}
      </motion.button>
    </motion.form>
  );
};

TaxForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

//
// TaxResults Component
//
export const TaxResults = ({ results }) => {
  if (!results) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* New Regime Card */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-lg shadow-lg ${
            results.recommendation === "New Tax Regime"
              ? "bg-gradient-to-br from-blue-900 to-blue-800 border-2 border-blue-500"
              : "bg-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <IndianRupee className="w-5 h-5" />
            New Tax Regime
            {results.recommendation === "New Tax Regime" && (
              <span className="text-sm text-blue-300 font-normal px-2 py-1 bg-blue-900/50 rounded-full">
                Recommended
              </span>
            )}
          </h3>
          <dl className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <dt>Taxable Income:</dt>
              <dd className="font-medium">
                {formatCurrency(results.newRegime.taxableIncome)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Base Tax:</dt>
              <dd className="font-medium">
                {formatCurrency(results.newRegime.baseTax)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Health & Education Cess:</dt>
              <dd className="font-medium">
                {formatCurrency(results.newRegime.cess)}
              </dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700 text-white">
              <dt className="font-semibold">Total Tax:</dt>
              <dd className="font-semibold">
                {formatCurrency(results.newRegime.totalTax)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Effective Tax Rate:</dt>
              <dd className="font-medium">
                {results.newRegime.effectiveTaxRate.toFixed(2)}%
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Old Regime Card */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-lg shadow-lg ${
            results.recommendation === "Old Tax Regime"
              ? "bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-purple-500"
              : "bg-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <IndianRupee className="w-5 h-5" />
            Old Tax Regime
            {results.recommendation === "Old Tax Regime" && (
              <span className="text-sm text-purple-300 font-normal px-2 py-1 bg-purple-900/50 rounded-full">
                Recommended
              </span>
            )}
          </h3>
          <dl className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <dt>Taxable Income:</dt>
              <dd className="font-medium">
                {formatCurrency(results.oldRegime.taxableIncome)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Base Tax:</dt>
              <dd className="font-medium">
                {formatCurrency(results.oldRegime.baseTax)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Health & Education Cess:</dt>
              <dd className="font-medium">
                {formatCurrency(results.oldRegime.cess)}
              </dd>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700 text-white">
              <dt className="font-semibold">Total Tax:</dt>
              <dd className="font-semibold">
                {formatCurrency(results.oldRegime.totalTax)}
              </dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Effective Tax Rate:</dt>
              <dd className="font-medium">
                {results.oldRegime.effectiveTaxRate.toFixed(2)}%
              </dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>

      {/* Recommendation Box */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-lg p-6"
      >
        <div className="flex items-start gap-4">
          {results.recommendation === "New Tax Regime" ? (
            <TrendingDown className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          ) : (
            <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
          )}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Tax Saving Recommendation
            </h4>
            <p className="text-gray-300">
              The {results.recommendation} is recommended for you.
              {results.savings > 0 && (
                <span className="text-green-400 font-medium">
                  {" "}
                  It would save you {formatCurrency(results.savings)} in taxes.
                </span>
              )}
            </p>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ITR filing due date: July 31, 2026 (subject to change)
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

TaxResults.propTypes = {
  results: PropTypes.shape({
    recommendation: PropTypes.string.isRequired,
    savings: PropTypes.number,
    newRegime: PropTypes.shape({
      taxableIncome: PropTypes.number.isRequired,
      baseTax: PropTypes.number.isRequired,
      cess: PropTypes.number.isRequired,
      totalTax: PropTypes.number.isRequired,
      effectiveTaxRate: PropTypes.number.isRequired,
    }).isRequired,
    oldRegime: PropTypes.shape({
      taxableIncome: PropTypes.number.isRequired,
      baseTax: PropTypes.number.isRequired,
      cess: PropTypes.number.isRequired,
      totalTax: PropTypes.number.isRequired,
      effectiveTaxRate: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

//
// Parent TaxCalculator Component
//
export default function TaxCalculator() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    // Calculate gross income
    const grossIncome = data.totalIncome + data.otherIncome;

    // Calculate taxable income for New Tax Regime
    const newTaxableIncome =
      grossIncome - (data.hra + data.housingLoanInterest);

    // Calculate taxable income for Old Tax Regime (including all deductions)
    const oldTaxableIncome =
      grossIncome -
      (data.hra +
        data.housingLoanInterest +
        data.section80C +
        data.section80CCD +
        data.section80CCD1B +
        data.section80D +
        data.section80E +
        data.section80EEA +
        data.section80EEB +
        data.section80G);

    // Calculate tax values using simple percentages (for demonstration)
    const newBaseTax = newTaxableIncome * 0.1; // 10% base tax for new regime
    const newCess = newBaseTax * 0.04; // 4% cess
    const newTotalTax = newBaseTax + newCess;
    const newEffectiveTaxRate =
      grossIncome > 0 ? (newTotalTax / grossIncome) * 100 : 0;

    const oldBaseTax = oldTaxableIncome * 0.12; // 12% base tax for old regime
    const oldCess = oldBaseTax * 0.04; // 4% cess
    const oldTotalTax = oldBaseTax + oldCess;
    const oldEffectiveTaxRate =
      grossIncome > 0 ? (oldTotalTax / grossIncome) * 100 : 0;

    // Recommendation based on lower total tax
    const recommendation =
      newTotalTax < oldTotalTax ? "New Tax Regime" : "Old Tax Regime";
    const savings = Math.abs(oldTotalTax - newTotalTax);

    // Simulate an API call delay; replace with actual API call as needed
    setTimeout(() => {
      setResults({
        recommendation,
        savings,
        newRegime: {
          taxableIncome: newTaxableIncome,
          baseTax: newBaseTax,
          cess: newCess,
          totalTax: newTotalTax,
          effectiveTaxRate: newEffectiveTaxRate,
        },
        oldRegime: {
          taxableIncome: oldTaxableIncome,
          baseTax: oldBaseTax,
          cess: oldCess,
          totalTax: oldTotalTax,
          effectiveTaxRate: oldEffectiveTaxRate,
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tax Calculator</h1>
          <p className="text-gray-300">
            Calculate and compare your tax liability under the Old and New Tax
            Regimes.
          </p>
        </header>
        <TaxForm onSubmit={handleSubmit} isLoading={isLoading} />
        <TaxResults results={results} />
      </div>
    </div>
  );
}
