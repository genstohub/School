"use client";

import React, { useState, use, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, RotateCcw, CheckCircle2, 
  SwitchCamera, Radio, CloudUpload, Scissors, Play, Pause,
  Volume2, MonitorPlay, Wand2, Type, RefreshCcw
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoStudioPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { courseId } = use(params);
  const courseCode = courseId.toUpperCase();

  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [audioBoost, setAudioBoost] = useState(1); 
  const [filter, setFilter] = useState("none"); 
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 1280, height: 720 }, 
        audio: true 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { console.error("Camera error:", err); }
  };

  useEffect(() => { if (!isPreviewMode) startCamera(); }, [isPreviewMode]);

  const toggleRecording = () => {
    if (!isRecording) {
      const stream = videoRef.current?.srcObject as MediaStream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        setVideoUrl(URL.createObjectURL(blob));
        setIsPreviewMode(true);
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } else {
      mediaRecorderRef.current?.stop();
      clearInterval(timerRef.current!);
      setIsRecording(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!recordedBlob) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("video", recordedBlob, `lesson-${Date.now()}.webm`);
    formData.append("courseId", courseId);
    formData.append("topic", topic);
    formData.append("subTopic", subTopic);
    formData.append("metadata", JSON.stringify({ filter, isFlipped, audioBoost }));

    try {
      const response = await fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAndReturn = () => {
    // Refresh browser and return to selector page
    window.location.href = '/instructors/material';
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Link href="/instructors/material" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="text-xs font-black uppercase tracking-widest">Exit Studio</span>
          </Link>
          <div className="text-right">
             <h1 className="text-xl font-black uppercase tracking-tighter">Instructor <span className="text-blue-600">Pro-Cam</span></h1>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{courseCode} SESSION</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
              <video 
                ref={videoRef} 
                src={videoUrl || undefined} 
                autoPlay={!isPreviewMode}
                muted={!isPreviewMode}
                loop
                style={{ 
                  filter: filter === 'grayscale' ? 'grayscale(1)' : filter === 'sepia' ? 'sepia(1)' : 'none',
                  transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
                }}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {!isPreviewMode && (
                <div className="absolute inset-0 flex flex-col justify-between p-10 pointer-events-none">
                  <div className={`self-start px-5 py-2 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-3 ${isRecording ? 'bg-red-600' : 'bg-black/40'}`}>
                    <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-green-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{isRecording ? `RECORDING ${formatTime(recordingTime)}` : 'READY'}</span>
                  </div>
                  <div className="flex justify-center">
                    <button onClick={toggleRecording} className="pointer-events-auto w-24 h-24 rounded-full border-[8px] border-white/10 bg-white flex items-center justify-center active:scale-90 transition-transform shadow-2xl">
                      <div className={`transition-all duration-300 ${isRecording ? 'w-8 h-8 bg-red-600 rounded-md' : 'w-8 h-8 bg-red-600 rounded-full'}`} />
                    </button>
                  </div>
                </div>
              )}

              {isPreviewMode && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
                  <button onClick={togglePlay} className="p-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:scale-110 transition-all">
                    {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" className="ml-2"/>}
                  </button>
                </div>
              )}
            </div>

            <div className={`grid grid-cols-4 gap-4 transition-all duration-500 ${isPreviewMode ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none translate-y-4'}`}>
               {[
                 { icon: <Wand2 size={20}/>, label: "Filters", active: filter !== 'none', onClick: () => setFilter(filter === 'none' ? 'grayscale' : 'none') },
                 { icon: <MonitorPlay size={20}/>, label: "Mirror", active: isFlipped, onClick: () => setIsFlipped(!isFlipped) },
                 { icon: <Volume2 size={20}/>, label: "Audio Boost", active: audioBoost > 1, onClick: () => setAudioBoost(audioBoost === 1 ? 2 : 1) },
                 { icon: <RotateCcw size={20}/>, label: "Re-Record", active: false, onClick: () => setIsPreviewMode(false) }
               ].map((tool, i) => (
                 <button key={i} onClick={tool.onClick} className={`flex flex-col items-center gap-3 p-6 rounded-[2.5rem] border transition-all ${tool.active ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-600/20' : 'bg-gray-900/50 border-white/5 hover:border-white/20'}`}>
                   {tool.icon}
                   <span className="text-[9px] font-black uppercase tracking-widest">{tool.label}</span>
                 </button>
               ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[3.5rem] sticky top-10">
              <h2 className="text-2xl font-black uppercase mb-8 leading-none">Lesson <br/><span className="text-gray-600">Manifest</span></h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Lecture Topic</label>
                  <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g. Quantum Physics" className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-blue-600 font-bold transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Worker Directives</label>
                  <textarea value={subTopic} onChange={e=>setSubTopic(e.target.value)} placeholder="Specific instructions..." className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-blue-600 font-medium h-32 resize-none transition-all" />
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button 
                    disabled={!isPreviewMode || !topic || isSubmitting}
                    onClick={handleSubmit}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-900 disabled:text-gray-700 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20"
                  >
                    {isSubmitting ? <RefreshCcw className="animate-spin" size={18}/> : <CloudUpload size={18}/>}
                    {isSubmitting ? "UPLOADING..." : "SUBMIT FOR REVIEW"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white text-gray-950 p-12 rounded-[4rem] text-center max-w-md shadow-2xl">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={50} />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Transfer <br/>Complete</h3>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-10">Your footage has been sent to the worker queue.</p>
              <button onClick={handleClearAndReturn} className="w-full py-6 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all">
                Finish & Exit
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}