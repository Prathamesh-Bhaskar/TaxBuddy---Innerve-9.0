import React from "react";
import PropTypes from "prop-types";
import {
  MessageSquare,
  FileText,
  PiggyBank,
  Shield,
  PlayCircle,
  BookOpen,
  Calculator,
} from "lucide-react";
import Header from "./components/Header";
import TabContent from "./components/TabContent";
import FloatingChatButton from "./components/FloatingButton";
import Footer from "./components/Footer";

function App() {
  // Set default active tab to "education"
  const [activeTab, setActiveTab] = React.useState("education");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative">
      {/* Main Content Container */}
      <div className="flex-1 overflow-auto w-full">
        <Header />

        {/* Hero Section */}
        <main className="w-full px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Smart Tax Filing Assistant
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get personalized ITR form recommendations and tax-saving insights
              with <span className="text-blue-400">TaxBuddy.AI</span>.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <FeatureCard
              icon={<MessageSquare size={26} className="text-blue-400" />}
              title="Interactive Chat"
              description="AI-powered assistant for seamless tax discussions."
            />
            <FeatureCard
              icon={<FileText size={26} className="text-green-400" />}
              title="Form Recommendation"
              description="Get accurate ITR form suggestions."
            />
            <FeatureCard
              icon={<PiggyBank size={26} className="text-yellow-400" />}
              title="Investment Advice"
              description="Save taxes with smart investment strategies."
            />
            <FeatureCard
              icon={<Shield size={26} className="text-red-400" />}
              title="Secure & Private"
              description="No storage of sensitive data."
            />
          </div>

          {/* Tabs Section */}
          <div className="mb-16">
            <div className="flex justify-center overflow-x-auto space-x-4 mb-8 pb-2 border-b border-gray-700">
              {[
                {
                  id: "calculator",
                  icon: <Calculator size={20} />,
                  label: "Tax Calculator",
                },
                {
                  id: "education",
                  icon: <PlayCircle size={20} />,
                  label: "Educational Videos",
                },
                {
                  id: "resources",
                  icon: <BookOpen size={20} />,
                  label: "Resources",
                },
              ].map((tab) => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon} {tab.label}
                </TabButton>
              ))}
            </div>
            <TabContent activeTab={activeTab} />
          </div>

          {/* Offer Section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-md text-center mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎉 Tax Season Offer!
            </h2>
            <p className="text-gray-300 mb-4">
              Get <span className="text-green-400">20% off</span> on our premium
              tax consultation services. Limited time offer!
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition">
              Learn More
            </button>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Chat Button */}
        <FloatingChatButton className="fixed bottom-4 right-4 z-50" />
      </div>
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// TabButton Component
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg whitespace-nowrap transition-all ${
        active
          ? "bg-blue-500 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
TabButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default App;
