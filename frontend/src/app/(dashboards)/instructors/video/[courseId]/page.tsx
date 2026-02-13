"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Video, RotateCcw, CheckCircle2, 
  SwitchCamera, Info, Radio, CloudUpload, Scissors, Play, Pause
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoStudioPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { courseId } = use(params);
  const courseCode = courseId.toUpperCase();

  // Form State
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  
  // Media State
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Editor State (Trimming)
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode, width: 1280, height: 720 }, 
        audio: true 
      });
      setStream(newStream);
      if (videoRef.current) videoRef.current.srcObject = newStream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  useEffect(() => {
    if (!videoUrl) startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [facingMode, videoUrl]);

  const toggleRecording = () => {
    if (!isRecording) {
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream!, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecordedBlob(blob);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTime(videoRef.current.duration);
    }
  };

  const handleSubmit = async () => {
    if (!recordedBlob) return;
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("video", recordedBlob);
    formData.append("courseId", courseId);
    formData.append("topic", topic);
    formData.append("subTopic", subTopic);
    formData.append("startTrim", startTime.toString());
    formData.append("endTrim", endTime.toString());

    try {
      const res = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData, // Browser sets Content-Type to multipart/form-data
      });
      if (res.ok) setIsSuccess(true);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/instructors/material" className="flex items-center gap-2 text-gray-500 mb-8 font-black uppercase text-[10px]">
          <ChevronLeft size={16}/> Return
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Editor Left */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden border border-gray-800 shadow-2xl">
              <video 
                ref={videoRef} 
                src={videoUrl || undefined} 
                autoPlay={!videoUrl}
                muted={!videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                className={`w-full h-full object-cover ${!videoUrl && facingMode === 'user' ? '-scale-x-100' : ''}`}
              />
              
              {!videoUrl && (
                <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md border border-white/10 ${isRecording ? 'bg-red-600' : 'bg-black/40'}`}>
                      <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-green-500'}`}/>
                      <span className="text-[10px] font-black uppercase tracking-widest">{isRecording ? 'Recording' : 'Standby'}</span>
                    </div>
                    <button onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')} className="p-4 bg-black/40 rounded-full border border-white/10 pointer-events-auto hover:bg-white/10 transition-colors">
                      <SwitchCamera size={20}/>
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button onClick={toggleRecording} className="w-20 h-20 rounded-full border-[6px] border-white/20 bg-white flex items-center justify-center pointer-events-auto active:scale-90 transition-transform">
                      <div className={`transition-all ${isRecording ? 'w-6 h-6 bg-red-600 rounded-sm' : 'w-6 h-6 bg-red-600 rounded-full'}`}/>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trimming Tool */}
            {videoUrl && (
              <div className="bg-gray-900/50 p-6 rounded-[2rem] border border-gray-800">
                <div className="flex items-center gap-3 mb-6 text-blue-500">
                  <Scissors size={18}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">Precision Trimming</span>
                </div>
                <div className="space-y-8 px-4">
                  <div className="relative h-2 bg-gray-800 rounded-full">
                    <div className="absolute top-0 h-full bg-blue-600 rounded-full" style={{ left: `${(startTime/duration)*100}%`, right: `${100 - (endTime/duration)*100}%` }} />
                    <input type="range" min="0" max={duration} step="0.1" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} className="absolute w-full -top-1 accent-white" />
                    <input type="range" min="0" max={duration} step="0.1" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} className="absolute w-full -top-1 accent-blue-500" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-500">
                    <span>START: {startTime.toFixed(2)}s</span>
                    <span>TOTAL: {(endTime - startTime).toFixed(2)}s</span>
                    <span>END: {endTime.toFixed(2)}s</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings Right */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#0A0A0A] border border-gray-800 p-8 rounded-[2.5rem] space-y-6">
                <header>
                  <h2 className="text-2xl font-black uppercase">Lesson Details</h2>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Awaiting Instructor Input</p>
                </header>

                <div className="space-y-4">
                  <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Lesson Title..." className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                  <textarea value={subTopic} onChange={e => setSubTopic(e.target.value)} placeholder="Lesson Description..." className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl text-sm font-medium outline-none h-32 resize-none" />
                </div>

                <div className="pt-4 border-t border-gray-800 flex gap-4">
                   {videoUrl && (
                     <button onClick={() => setVideoUrl(null)} className="flex-1 py-4 bg-gray-950 border border-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">
                       <RotateCcw size={14} className="inline mr-2"/> Re-record
                     </button>
                   )}
                   <button 
                    disabled={!videoUrl || !topic || isSubmitting}
                    onClick={handleSubmit}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 disabled:opacity-50 transition-all"
                   >
                     {isSubmitting ? "Uploading..." : <><CloudUpload size={14} className="inline mr-2"/> Submit for Review</>}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white text-gray-950 p-12 rounded-[4rem] text-center max-w-sm">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-2">Submitted</h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-10">Your video is now in the review queue.</p>
              <button onClick={() => router.push('/instructors/material')} className="w-full py-5 bg-gray-950 text-white rounded-3xl font-black uppercase text-xs tracking-widest">Return to Hub</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}