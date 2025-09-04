import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useInterview } from "../context/InterviewContext";
import CustomModal from "./CustomModal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  Eye,
  Pencil,
  Info,
  Trash2,
  Loader2 as Spinner,
} from "lucide-react";
import { sendAnalytics } from "../utils/firebase";
import PDFViewer from "./PDFViewer";

const ResumeUpload = ({
  updateResumes,
  uploadModalOpen,
  setUploadModalOpen,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const { apiUrl, token } = useAuth();

  const validateFile = (selectedFile) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return false;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return false;
    }
    setFile(selectedFile);
    return true;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(`${apiUrl}/resumes/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        },
      });

      if (response.status === 201) {
        const { data } = response.data;
        sendAnalytics("resume_uploaded", {
          file_name: data.name,
          resume_id: data.id,
        });
        updateResumes(data);
        toast.success("Resume uploaded successfully");
      }

      setFile(null);
      setUploadModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <CustomModal isOpen={uploadModalOpen} setIsOpen={setUploadModalOpen}>
      <h4 className="text-lg font-semibold mb-4">Upload Resume</h4>
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 cursor-pointer transition hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <p className="text-gray-600">
          Drag & Drop or <span className="text-blue-600">Click to Select</span>{" "}
          your resume (PDF, max 5MB)
        </p>
      </div>

      {file && (
        <motion.div
          className="mt-4 space-y-3"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <p className="text-sm text-gray-600">Selected: {file.name}</p>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={uploading || !file}
              className="mt-2 sathi-btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="mt-2 sathi-btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Spinner className="animate-spin w-4 h-4" /> Uploading…
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </CustomModal>
  );
};

const ResumeManager = () => {
  const [loading, setLoading] = useState(true);

  const { resumes, getResumes, setResumes } = useInterview();
  const { apiUrl, token } = useAuth();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [previewResume, setPreviewResume] = useState(null);

  const [newName, setNewName] = useState("");
  const selectedResume = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    const handleScroll = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addResume = (resume) => {
    const updatedResume = [resume, ...resumes];
    setResumes(updatedResume);
    secureLocalStorage.setItem("resumes", JSON.stringify(updatedResume));
  };

  const removeResume = (id) => {
    const updatedResume = resumes.filter((resume) => resume.id !== id);
    setResumes(updatedResume);
    secureLocalStorage.setItem("resumes", JSON.stringify(updatedResume));
  };

  const fetchResumes = async () => {
    try {
      setLoading(true);
      await getResumes();
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to load your resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleRenameResume = async (resume_id, name) => {
    try {
      const response = await axios.put(
        `${apiUrl}/resumes/${resume_id}/`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 202) {
        toast.success("Resume renamed successfully");
        sendAnalytics("resume_renamed", { resume_id, new_name: name });

        const updated = resumes.map((resume) =>
          resume.id === resume_id ? response.data?.data : resume
        );
        setResumes(updated);
        secureLocalStorage.setItem("resumes", JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Error renaming resume:", error);
      toast.error("Failed to rename resume");
    } finally {
      setRenameModalOpen(false);
      selectedResume.current = null;
    }
  };

  const handleDeleteResume = async (resume_id) => {
    try {
      const response = await axios.delete(`${apiUrl}/resumes/${resume_id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        toast.success("Resume deleted");
        sendAnalytics("resume_deleted", { resume_id });

        removeResume(resume_id);
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="sathi-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Manage Your Resumes
        </h3>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="sathi-btn-primary"
        >
          Upload Resume
        </button>
      </div>

      {/* Resume List */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <p className="text-sm text-gray-500 py-3">No resumes uploaded yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {resumes.map((resume) => (
            <motion.div
              key={resume.id}
              whileHover={{
                background:
                  "linear-gradient(86deg, #F0F8FF 1.71%, #FFFCEF 99.56%)",
              }}
              transition={{ duration: 0.25 }}
               className={`relative p-5 rounded-2xl shadow-sm border bg-white  border-[#dcdcdc] group ${
    openMenuId === resume.id ? "z-50" : "z-0"
  }`}
            >
              {/* Resume Info */}
              <div
                className="relative"
                onClick={() => {
                  setPreviewResume(resume);
                  sendAnalytics("resume_viewed", {
                    resume_id: resume.id,
                  });
                }}
              >
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold flex-shrink-0">
                    PDF
                  </span>
                  <span className="truncate lg:max-w-[300px] md:max-w-[150px] sm:max-w-[200px]">
                    {resume.name}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Uploaded: {new Date(resume.uploaded_at).toLocaleDateString()}
                </p>
              </div>

              {/* 3-dot menu */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === resume.id ? null : resume.id);
                  }}
                >
                  <MoreVertical size={18} />
                </button>

                <AnimatePresence>
                  {openMenuId === resume.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-[1000] right-0 mt-2 bg-white border rounded-lg shadow-md text-sm w-36"
                    >
                      <button
                        onClick={() => {
                          setPreviewResume(resume);
                          sendAnalytics("resume_viewed", {
                            resume_id: resume.id,
                          });
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        <Eye size={16} /> Open
                      </button>

                      <button
                        onClick={() => {
                          setRenameModalOpen(true);
                          selectedResume.current = resume;
                          setNewName(resume.name);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        <Pencil size={16} /> Rename
                      </button>

                      <button
                        onClick={() => {
                          toast.info(`File Info: ${resume.name}`);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        <Info size={16} /> Info
                      </button>

                      <button
                        onClick={() => {
                          handleDeleteResume(resume.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <ResumeUpload
            updateResumes={addResume}
            uploadModalOpen={uploadModalOpen}
            setUploadModalOpen={setUploadModalOpen}
          />
        )}
      </AnimatePresence>

      {/* Rename Modal */}
      <AnimatePresence>
        {renameModalOpen && (
          <CustomModal isOpen={renameModalOpen} setIsOpen={setRenameModalOpen}>
            <h4 className="text-lg font-semibold mb-4">Rename Resume</h4>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="sathi-input"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setRenameModalOpen(false)}
                className="sathi-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleRenameResume(selectedResume.current?.id, newName)
                }
                className="sathi-btn-primary"
              >
                Save
              </button>
            </div>
          </CustomModal>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewResume && (
          <PDFViewer
            fileUrl={apiUrl + previewResume.file}
            onClose={() => setPreviewResume(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeManager;

