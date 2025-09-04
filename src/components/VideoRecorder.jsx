import React, { useEffect, useRef } from "react";
import logger from "../utils/logger";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const startRecording = async () => {
      // If stream already exists, don't create a new one
      if (streamRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cancelled) {
          // If cleanup already ran, stop immediately
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          logger("Download your video here:", url);

          setTimeout(() => URL.revokeObjectURL(url), 1000);
          recordedChunks.current = [];
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.load();
      }

      recordedChunks.current = [];
    };

    startRecording();

    return () => {
      cancelled = true;
      stopRecording();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ borderRadius: "9px 9px 0px 0px" }}
    />
  );
};

export default VideoRecorder;
