import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function PDFViewer({ fileUrl, onClose }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!fileUrl) return;

    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      })
      .catch((err) => console.error("Error fetching PDF:", err));

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [fileUrl]);

  if (!fileUrl) return null;

  return (
    <motion.div
      className="fixed backdrop-blur-sm inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white w-[80%] h-[90%] rounded-lg shadow-lg relative overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm hover:bg-red-600"
        >
          ✕ Close
        </button>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-b-lg"
            title="Resume PDF"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PDFViewer;
