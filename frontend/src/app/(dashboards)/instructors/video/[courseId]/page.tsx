"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Video, RotateCcw, CheckCircle2, 
  SwitchCamera, Save, Info, Radio, Settings2,
  AlertCircle, CloudUpload
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoCreationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseId = resolvedParams?.courseId;
  const courseCode = (courseId || "").toUpperCase();

  // Content State
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  
  // Media State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Camera & Audio
  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: true
      });
      setStream(newStream);
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  useEffect(() => {
    if (!videoUrl) startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [facingMode, videoUrl]);

  // Recording Logic
  const handleStartRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setRecordedBlob(blob);
      setVideoUrl(url);
      setRecordingTime(0);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);

    // Start Timer
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    stream?.getTracks().forEach(track => track.stop());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setVideoUrl(null);
    setRecordedBlob(null);
    startCamera();
  };

  const clearForm = () => {
    setTopic("");
    setSubTopic("");
    setVideoUrl(null);
    setRecordedBlob(null);
    setIsSuccessModalOpen(false);
    startCamera();
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructors/material" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#035b77] mb-10 group transition-colors">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Section 1: Info & Context (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <header className="border-l-4 border-blue-600 pl-6">
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                Video <span className="text-blue-600">Studio</span>
              </h1>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-2 uppercase">
                Recording for {courseCode}
              </p>
            </header>

            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest">Lecture Topic</label>
                <input 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Fundamental Laws of Motion" 
                  className="w-full bg-gray-900/50 border border-gray-800 p-5 rounded-3xl outline-none focus:border-blue-600 transition-all font-bold text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest">Specific Sub-Topic</label>
                <textarea 
                  value={subTopic} 
                  onChange={(e) => setSubTopic(e.target.value)}
                  placeholder="Briefly describe what this clip covers..." 
                  className="w-full bg-gray-900/50 border border-gray-800 p-5 rounded-3xl outline-none focus:border-blue-600 transition-all font-bold text-sm h-32 resize-none"
                />
              </div>
            </div>

            <div className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-4xl flex gap-4">
              <Info className="text-blue-600 shrink-0" size={20} />
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
                Standard clips should be between <span className="text-white">30-45 minutes</span>. 
                Ensure you are in a well-lit area with minimal background noise for the best student experience.
              </p>
            </div>
          </div>

          {/* Section 2: Camera & Preview (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden border border-gray-800 shadow-2xl group">
              
              {videoUrl ? (
                /* REVIEW MODE */
                <div className="relative w-full h-full">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                  <div className="absolute top-6 right-6 bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Ready for Review</span>
                  </div>
                </div>
              ) : (
                /* RECORDING MODE */
                <>
                  <video 
                    ref={videoPreviewRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className={`w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`} 
                  />
                  
                  {/* Overlay UI */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
                    <div className="flex justify-between items-start">
                      {isRecording ? (
                        <div className="flex items-center gap-3 bg-red-600 text-white px-5 py-2 rounded-full animate-pulse pointer-events-auto">
                          <Radio size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest leading-none">REC {formatTime(recordingTime)}</span>
                        </div>
                      ) : (
                        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Live Preview</span>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => setFacingMode(prev => prev === "user" ? "environment" : "user")} 
                        className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-all pointer-events-auto"
                      >
                        <SwitchCamera size={20} />
                      </button>
                    </div>

                    <div className="flex justify-center">
                      {!isRecording ? (
                        <button 
                          onClick={handleStartRecording} 
                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform border-[6px] border-white/20 shadow-2xl pointer-events-auto"
                        >
                          <div className="w-6 h-6 bg-red-600 rounded-full" />
                        </button>
                      ) : (
                        <button 
                          onClick={handleStopRecording} 
                          className="px-10 py-4 bg-white text-black font-black uppercase text-xs rounded-full hover:bg-gray-200 transition-all shadow-2xl pointer-events-auto"
                        >
                          Finish Recording
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4">
              <div className="flex gap-4">
                {videoUrl && (
                  <button onClick={handleReset} className="flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all">
                    <RotateCcw size={16} /> Discard & Re-take
                  </button>
                )}
              </div>
              
              <button 
                disabled={!videoUrl || !topic || !subTopic}
                onClick={() => setIsSuccessModalOpen(true)}
                className={`flex items-center gap-3 px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl
                  ${videoUrl && topic && subTopic 
                    ? 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 shadow-blue-600/20' 
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'}`}
              >
                <CloudUpload size={18} /> Submit Lesson
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-2xl p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-gray-950 rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl overflow-hidden relative"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">Lesson <br/>Uploaded</h2>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-10 leading-relaxed">
                Topic: {topic} <br/>
                Status: Awaiting Verification
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={clearForm} className="w-full py-5 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                  Create Another Video
                </button>
                <button onClick={() => router.push('/instructors/material')} className="w-full py-5 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-black">
                  Go to Hub
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}