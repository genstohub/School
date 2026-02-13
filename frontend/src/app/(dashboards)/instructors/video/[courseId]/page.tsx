"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Video, RotateCcw, CheckCircle2, 
  SwitchCamera, Info, Radio, CloudUpload, Scissors, Play, Pause,
  Volume2, MonitorPlay, Wand2, Type
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

  // Studio Tools State
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [audioBoost, setAudioBoost] = useState(1); // 1 = normal, 2 = 2x
  const [filter, setFilter] = useState("none"); // none, grayscale, sepia

  // Editor State (Trimming)
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    return () => {
      stream?.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [facingMode, videoUrl]);

  const toggleRecording = () => {
    if (!isRecording) {
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream!, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoUrl(URL.createObjectURL(blob));
        setRecordedBlob(blob);
        setRecordingTime(0);
      };
      
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
      
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTime(videoRef.current.duration);
    }
  };

  const resetAll = () => {
    setTopic("");
    setSubTopic("");
    setVideoUrl(null);
    setRecordedBlob(null);
    setIsSuccess(false);
    setFilter("none");
    setIsFlipped(false);
    startCamera();
  };

  const handleSubmit = async () => {
    if (!recordedBlob) return;
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("video", recordedBlob);
    formData.append("courseId", courseId);
    formData.append("topic", topic);
    formData.append("subTopic", subTopic);
    formData.append("settings", JSON.stringify({ filter, isFlipped, audioBoost }));

    try {
      const res = await fetch('/api/videos/upload', { method: 'POST', body: formData });
      if (res.ok) setIsSuccess(true);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/instructors/material" className="flex items-center gap-2 text-gray-500 mb-6 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
          <ChevronLeft size={16}/> Return to Dashboard
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Stage */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
              <video 
                ref={videoRef} 
                src={videoUrl || undefined} 
                autoPlay={!videoUrl}
                muted={!videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ 
                    filter: filter === 'grayscale' ? 'grayscale(1)' : filter === 'sepia' ? 'sepia(1)' : 'none',
                    transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)'
                }}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Recording Overlay */}
              {!videoUrl && (
                <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <div className={`px-5 py-2 rounded-full flex items-center gap-3 backdrop-blur-xl border border-white/10 ${isRecording ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-black/40'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-green-500'}`}/>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">{isRecording ? `REC ${formatTime(recordingTime)}` : 'Standby'}</span>
                    </div>
                    <button onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')} className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto hover:bg-white/20 transition-all">
                      <SwitchCamera size={20}/>
                    </button>
                  </div>
                  
                  <div className="flex justify-center">
                    <button onClick={toggleRecording} className="group pointer-events-auto relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                        <div className="relative w-24 h-24 rounded-full border-[8px] border-white/10 bg-white flex items-center justify-center active:scale-90 transition-transform">
                            <div className={`transition-all duration-300 ${isRecording ? 'w-8 h-8 bg-red-600 rounded-lg' : 'w-8 h-8 bg-red-600 rounded-full'}`}/>
                        </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Tools Bar (CapCut Style) */}
            <div className="grid grid-cols-4 gap-4">
               {[
                 { icon: <Wand2 size={18}/>, label: "Filters", active: filter !== 'none', onClick: () => setFilter(filter === 'none' ? 'grayscale' : 'none') },
                 { icon: <MonitorPlay size={18}/>, label: "Flip", active: isFlipped, onClick: () => setIsFlipped(!isFlipped) },
                 { icon: <Volume2 size={18}/>, label: "Audio Boost", active: audioBoost > 1, onClick: () => setAudioBoost(audioBoost === 1 ? 2 : 1) },
                 { icon: <Type size={18}/>, label: "Subtitles", active: false, onClick: () => {} }
               ].map((tool, i) => (
                 <button key={i} onClick={tool.onClick} className={`flex flex-col items-center gap-2 p-4 rounded-[2rem] border transition-all ${tool.active ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-900/40 border-white/5 text-gray-400 hover:border-white/20'}`}>
                   {tool.icon}
                   <span className="text-[9px] font-black uppercase tracking-tighter">{tool.label}</span>
                 </button>
               ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[3rem] space-y-8">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Publish <br/><span className="text-blue-600 text-xl tracking-normal">Video Lesson</span></h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{courseCode} • {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Topic</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter lecture title..." className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-sm font-bold focus:border-blue-500 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Notes for Workers</label>
                    <textarea value={subTopic} onChange={e => setSubTopic(e.target.value)} placeholder="Explain specific points covered..." className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl text-sm font-medium h-32 resize-none outline-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                   <button 
                    disabled={!videoUrl || !topic || isSubmitting}
                    onClick={handleSubmit}
                    className="w-full py-6 bg-blue-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-500 disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-blue-600/20"
                   >
                     {isSubmitting ? "Processing..." : "Submit to Workers"}
                   </button>
                   {videoUrl && (
                     <button onClick={() => setVideoUrl(null)} className="w-full py-4 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">
                       <RotateCcw size={14} className="inline mr-2"/> Discard & Try Again
                     </button>
                   )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white text-gray-950 p-12 rounded-[4rem] text-center max-w-md shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">Lesson <br/>Sent</h3>
                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-10 leading-relaxed">The workers will review your content. <br/>Check your dashboard for status updates.</p>
                <button onClick={resetAll} className="w-full py-6 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all">
                  Create New Video
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}