export default function DraftModal({
  onRestore,
  onDiscard,
}: {
  onRestore: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[500] p-4">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full shadow-2xl text-center border-t-4 border-indigo-600">
        <h3 className="text-xl font-black uppercase tracking-tight mb-2">
          Unsaved Work Found
        </h3>
        <p className="text-slate-500 mb-6 leading-relaxed">
          We found an unsaved manuscript draft. Would you like to resume where
          you left off?
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestore}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
          >
            Resume Manuscript
          </button>
          <button
            onClick={onDiscard}
            className="w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition"
          >
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  );
}
