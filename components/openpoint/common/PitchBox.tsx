import { Lightbulb } from "lucide-react"

export function PitchBox({ text }: { text: string }) {
  return (
    <div className="mx-4 my-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 shadow-sm relative overflow-hidden animate-in slide-in-from-top-4 fade-in duration-500 shrink-0">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 p-2.5 rounded-xl shrink-0 shadow-sm border border-indigo-200/50">
          <Lightbulb className="h-6 w-6 text-indigo-600 drop-shadow-sm" />
        </div>
        <p className="text-[13px] text-indigo-900 font-bold leading-relaxed flex-1">{text}</p>
      </div>
    </div>
  )
}
