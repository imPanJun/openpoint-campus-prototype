import { Lightbulb } from "lucide-react"

export function PitchBox({ text }: { text: string }) {
  return (
    <div className="mx-4 my-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 shadow-sm relative overflow-hidden animate-in slide-in-from-top-4 fade-in duration-500 shrink-0">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
      <div className="flex items-start gap-3">
        <div className="bg-indigo-100 p-2 rounded-xl shrink-0">
          <Lightbulb className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h4 className="text-xs font-black text-indigo-800 mb-1 tracking-wider">💡 商業觀點</h4>
          <p className="text-[13px] text-indigo-700 font-bold leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}
