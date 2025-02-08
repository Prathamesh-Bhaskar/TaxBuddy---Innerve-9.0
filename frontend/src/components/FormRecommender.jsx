import { useState } from "react";

function FormRecommender() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    salary: 0,
    rental: 0,
    business: 0,
    capital: 0,
    interest: 0,
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  const getRecommendation = () => {
    if (formData.business > 0) {
      setRecommendation({
        form: "ITR-3",
        explanation:
          "ITR-3 is recommended as you have business income. This form is suitable for individuals and HUFs earning from a business or profession.",
      });
    } else if (formData.capital > 0 || formData.rental > 0) {
      setRecommendation({
        form: "ITR-2",
        explanation:
          "ITR-2 is recommended due to capital gains or rental income. It is meant for individuals without business income.",
      });
    } else if (formData.salary > 0 || formData.interest > 0) {
      setRecommendation({
        form: "ITR-1",
        explanation:
          "ITR-1 (Sahaj) is ideal as your income sources include only salary and interest. It is the simplest form for salaried individuals.",
      });
    }
    setStep(3);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 md:p-8 rounded-xl shadow-md space-y-6 text-white">
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Income Details</h2>
          <p className="text-gray-400">Enter your primary sources of income.</p>

          {["salary", "rental"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 capitalize">
                {field.replace("_", " ")} Income
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter amount"
              />
            </div>
          ))}

          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Additional Income</h2>
          <p className="text-gray-400">Include any other sources of income.</p>

          {["business", "capital", "interest"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 capitalize">
                {field.replace("_", " ")} Income
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter amount"
              />
            </div>
          ))}

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/2 bg-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Back
            </button>
            <button
              onClick={getRecommendation}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Get Recommendation
            </button>
          </div>
        </div>
      )}

      {step === 3 && recommendation && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Recommendation</h2>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Recommended Form: {recommendation.form}
            </h3>
            <p className="text-gray-400">{recommendation.explanation}</p>
          </div>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default FormRecommender;
