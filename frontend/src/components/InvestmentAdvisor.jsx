import { useState } from "react";

function InvestmentAdvisor() {
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg">
      {!showRecommendations ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Investment Advisor</h2>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Annual Income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your annual income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your age"
            />
          </div>

          <button
            onClick={getRecommendations}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Get Investment Advice
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Investment Recommendations</h2>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Section 80C (₹1.5 Lakh Limit)
              </h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-medium">PPF (Public Provident Fund)</h4>
                  <p className="text-gray-400">
                    Long-term savings with tax-free returns. Recommended
                    investment: 30% of limit.
                  </p>
                </li>
                <li>
                  <h4 className="font-medium">ELSS Mutual Funds</h4>
                  <p className="text-gray-400">
                    Equity-linked savings scheme with potential for high
                    returns. Recommended: 40% of limit.
                  </p>
                </li>
                <li>
                  <h4 className="font-medium">Term Insurance</h4>
                  <p className="text-gray-400">
                    Essential life coverage. Recommended based on income: ₹1
                    crore coverage.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Section 80D (Health Insurance)
              </h3>
              <ul>
                <li>
                  <h4 className="font-medium">Health Insurance Premium</h4>
                  <p className="text-gray-400">
                    Recommended coverage: ₹5 lakhs for self and family.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Additional Investments
              </h3>
              <ul>
                <li>
                  <h4 className="font-medium">National Pension System (NPS)</h4>
                  <p className="text-gray-400">
                    Additional tax benefit under Section 80CCD(1B) up to ₹50,000.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowRecommendations(false)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default InvestmentAdvisor;
