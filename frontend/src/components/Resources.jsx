function Resources() {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Resources</h2>
      <p className="text-gray-300 mb-4">
        Explore our collection of guides, articles, and tools designed to help
        you understand tax laws and filing requirements.
      </p>
      <ul className="space-y-3">
        <li>
          <a
            href="https://www.incometax.gov.in/iec/foportal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Income Tax Portal (Government of India)
          </a>
        </li>
        <li>
          <a
            href="https://incometaxindia.gov.in/Pages/tax-services/file-income-tax-return.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            File Income Tax Return (Government of India)
          </a>
        </li>
        <li>
          <a
            href="https://cleartax.in/income-tax-efiling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            ClearTax eFiling
          </a>
        </li>
        <li>
          <a
            href="https://sewasetu.assam.gov.in/site/service-apply/e-filing-of-income-tax-return-itr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Assam Sewasetu e-Filing
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Resources;
