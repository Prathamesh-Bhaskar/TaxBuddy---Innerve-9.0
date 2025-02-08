import { motion } from "framer-motion";

function EducationalVideos() {
  // Array of YouTube embed links
  const videos = [
    "https://www.youtube.com/embed/SNpjZ_wW7lQ?si=hfKI-40e1U9mz_fu",
    "https://www.youtube.com/embed/FQB-AI-Du8M?si=M_dqDrmPuMUZ-Ebq",
    "https://www.youtube.com/embed/sW6xO1me7Bw?si=DUUcJ_A_72BXux64",
    "https://www.youtube.com/embed/yt9OQrHjvRY?si=q9zGPdFt3t6YRkqS",
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">
          Educational Videos
        </h2>
        <p className="text-gray-300 mb-6">
          Watch these informative videos related to the ITR Filing Assistant.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }} // Maintains 16:9 aspect ratio
              >
                <iframe
                  src={src}
                  title={`YouTube video player ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EducationalVideos;
