"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, StopCircle, RefreshCcw, Send, Video, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VideoOrderPage() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState("Initializing camera...");

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      setStream(mediaStream);
      streamRef.current = mediaStream;
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = mediaStream;
      }
      setStatus("Camera ready. Describe your cake dream!");
    } catch (err) {
      console.error("Camera access error:", err);
      setStatus("Error: Permission denied. Please enable camera/mic.");
    }
  }, []);

  useEffect(() => {
    const startCapture = async () => {
      await initCamera();
    };
    startCapture();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initCamera]);

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob);
      setRecording(false);
      setStatus("Recording captured! Review and send via WhatsApp.");
    };

    recorder.start();
    setRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    setStatus("Recording in progress... explain flavor, size, and design.");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setTimer(0);
    initCamera();
  };

  const sendToWhatsApp = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cake-order-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const message = encodeURIComponent("Hi! I've recorded a video for a custom cake order. I'm attaching it now.");
    window.open(`https://wa.me/919822316064?text=${message}`, "_blank");
    setStatus("Video downloaded! Please attach it to the WhatsApp chat.");
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-warm-cream min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-black text-espresso mb-6">
              Video Call Order
            </h1>
            <p className="text-espresso/60 max-w-2xl mx-auto mb-12">
              Sometimes words aren&apos;t enough. Record a quick video describing your dream cake, 
              and we&apos;ll bring it to life!
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-2xl aspect-video rounded-3xl overflow-hidden bg-espresso shadow-2xl premium-shadow">
            {!recordedBlob ? (
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={URL.createObjectURL(recordedBlob)}
                controls
                className="w-full h-full object-cover"
              />
            )}

            {/* Recording HUD */}
            <AnimatePresence>
              {recording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse"
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                  REC {formatTime(timer)}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/20 pointer-events-none">
                <p className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                    {status}
                </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {!recordedBlob ? (
              recording ? (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-espresso text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
                >
                  <StopCircle /> Stop Recording
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
                >
                  <Camera /> Start Recording
                </button>
              )
            ) : (
              <>
                <button
                  onClick={resetRecording}
                  className="flex items-center gap-2 bg-white text-espresso px-10 py-4 rounded-full font-bold shadow-md hover:bg-espresso hover:text-white transition-all"
                >
                  <RefreshCcw /> Record Again
                </button>
                <button
                  onClick={sendToWhatsApp}
                  className="flex items-center gap-2 bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-all"
                >
                  <Send /> Send to WhatsApp
                </button>
              </>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/50 premium-shadow">
                <Video className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-espresso">Visual Details</h3>
                <p className="text-xs text-espresso/60 mt-2">Show us sketches or reference photos in the video.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 premium-shadow">
                <Mic className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-espresso">Voice Notes</h3>
                <p className="text-xs text-espresso/60 mt-2">Explain the flavors and textures you desire.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 premium-shadow">
                <Send className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold text-espresso">Direct Chat</h3>
                <p className="text-xs text-espresso/60 mt-2">We&apos;ll reply with a quote and timeframe instantly.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
