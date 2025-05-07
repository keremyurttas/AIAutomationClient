import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function FullPageLoader() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <h4 className="text-white text-4xl">
        Senaryonuz, Chromium üzerinden çalıştırılıyor...
        </h4>
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    </div>
  )
}

