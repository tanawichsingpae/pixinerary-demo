'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, CalendarDays, Check, CloudSun, Compass, Download, GripVertical, ImagePlus, LocateFixed, Map, MapPin, Navigation, Pause, Plane, Play, ScanLine, Sparkles, Utensils, WalletCards, WandSparkles, Waves, Zap } from 'lucide-react'

export type PixineraryDemoModalProps = { onLaunchSampleTrip?: () => void }
export type DemoButtonProps = PixineraryDemoModalProps & { className?: string }

type Step = { number: string; eyebrow: string; title: string; description: string; icon: typeof ImagePlus }
const steps: Step[] = [
  { number: '01', eyebrow: 'SEE THE WORLD DIFFERENTLY', title: 'อัปโหลดรูป แล้วให้ AI รู้จักสถานที่', description: 'Vision AI และ CLIP scanner จะสกัดรายละเอียดจากภาพในไม่กี่วินาที', icon: ImagePlus },
  { number: '02', eyebrow: 'UNDERSTAND YOUR PLACE', title: 'ค้นพบแลนด์มาร์กที่ใช่', description: 'รับพิกัด ความมั่นใจ และสภาพอากาศแบบเรียลไทม์', icon: LocateFixed },
  { number: '03', eyebrow: 'MAKE IT YOURS', title: 'ปรับทริปให้เป็นสไตล์คุณ', description: 'เลือกจำนวนวัน งบประมาณ และจังหวะการเดินทางที่พอดี', icon: WandSparkles },
  { number: '04', eyebrow: 'YOUR TRIP, ILLUMINATED', title: 'ได้แผนเที่ยวพร้อมออกเดินทาง', description: 'จัดลำดับกิจกรรม ดูเส้นทาง และส่งออกแพลนได้ทันที', icon: Map },
]

function DemoButton({ onLaunchSampleTrip, className }: DemoButtonProps) {
  return <PixineraryDemoModal onLaunchSampleTrip={onLaunchSampleTrip}>
    <Button className={cn('group relative h-12 overflow-hidden rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:bg-slate-800', className)}>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <Sparkles data-icon="inline-start" className="text-sky-300" /> ชมตัวอย่างระบบ <span className="hidden text-slate-400 sm:inline">(Interactive Demo)</span>
    </Button>
  </PixineraryDemoModal>
}

export { DemoButton }

export function PixineraryDemoModal({ onLaunchSampleTrip, children }: PixineraryDemoModalProps & { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!open || !autoPlay) return
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps.length), 4000)
    return () => window.clearInterval(timer)
  }, [open, autoPlay])

  const current = steps[step]
  const goNext = () => setStep((value) => Math.min(value + 1, steps.length - 1))
  const goPrevious = () => setStep((value) => Math.max(value - 1, 0))

  return <Dialog open={open} onOpenChange={setOpen}>
    {children ? <DialogTrigger asChild>{children}</DialogTrigger> : <DialogTrigger asChild><DemoButton onLaunchSampleTrip={onLaunchSampleTrip} /></DialogTrigger>}
    <DialogContent className="max-h-[94vh] overflow-y-auto border-white/60 bg-white/90 p-0 shadow-2xl shadow-sky-950/20 backdrop-blur-xl sm:max-w-5xl dark:border-white/10 dark:bg-slate-950/90">
      <div className="relative overflow-hidden rounded-[inherit]">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-violet-300/20 blur-3xl" />
        <DialogHeader className="relative flex-row items-center justify-between gap-4 border-b border-slate-200/70 px-5 py-5 text-left sm:px-8 dark:border-white/10">
          <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-lg shadow-sky-500/25"><Plane className="size-5 -rotate-12" /></div><div><DialogTitle className="text-lg font-bold tracking-tight">Pixinerary <span className="font-normal text-muted-foreground">/ Vision Trip Planner</span></DialogTitle><DialogDescription className="mt-0.5 text-xs">ค้นพบโลกใบใหม่ ในแบบของคุณ</DialogDescription></div></div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/5"><span className="hidden text-xs font-medium text-muted-foreground sm:inline">Auto-play</span><Switch checked={autoPlay} onCheckedChange={setAutoPlay} aria-label="Toggle auto-play" />{autoPlay ? <Pause className="size-3.5 text-muted-foreground" /> : <Play className="size-3.5 text-muted-foreground" />}</div>
        </DialogHeader>

        <div className="relative px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          <div className="mb-7 grid grid-cols-4 gap-2">{steps.map((item, index) => <button key={item.number} onClick={() => setStep(index)} className="group text-left" aria-label={`Go to step ${index + 1}`}><div className="mb-2 flex items-center gap-2"><span className={cn('grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors', index <= step ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'bg-slate-100 text-slate-400 dark:bg-white/10')}>{index < step ? <Check className="size-3.5" /> : item.number}</span><span className="hidden truncate text-xs font-semibold text-muted-foreground sm:block">{item.title.split(' ').slice(0, 3).join(' ')}</span></div><Progress value={index <= step ? 100 : 0} className="h-1" /></button>)}</div>
          <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="mb-5 max-w-2xl"><p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-sky-600">{current.eyebrow}</p><h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">{current.title}</h2><p className="mt-2 text-sm text-muted-foreground">{current.description}</p></div>
            <Preview step={step} />
          </motion.div></AnimatePresence>
          <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:items-center dark:border-white/10"><div className="flex items-center justify-between gap-3 sm:justify-start"><Button variant="ghost" onClick={goPrevious} disabled={step === 0}><ArrowLeft data-icon="inline-start" /> ย้อนกลับ</Button><div className="flex gap-1.5 px-2">{steps.map((_, index) => <button key={index} onClick={() => setStep(index)} aria-label={`Step ${index + 1}`} className={cn('size-1.5 rounded-full transition-all', index === step ? 'w-5 bg-sky-500' : 'bg-slate-300 dark:bg-slate-700')} />)}</div><Button variant="ghost" onClick={goNext} disabled={step === steps.length - 1}>ถัดไป <ArrowRight data-icon="inline-end" /></Button></div><Button onClick={() => { setOpen(false); onLaunchSampleTrip?.() }} className="h-11 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-5 text-white shadow-lg shadow-sky-500/20 hover:from-sky-600 hover:to-violet-700"><Zap data-icon="inline-start" /> ทดลองเล่นทริปตัวอย่างทันที</Button></div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
}

function Preview({ step }: { step: number }) {
  if (step === 0) return <Card className="relative min-h-[280px] overflow-hidden border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-violet-50 shadow-inner dark:border-sky-400/20 dark:from-sky-950/30 dark:via-slate-900 dark:to-violet-950/20"><CardContent className="relative flex min-h-[280px] items-center justify-center p-5"><div className="absolute inset-8 rounded-3xl border-2 border-dashed border-sky-300/70" /><div className="relative z-10 grid size-44 place-items-center rounded-3xl border border-white/80 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-md dark:border-white/10 dark:bg-white/10"><div className="grid size-14 place-items-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300"><ImagePlus className="size-7" /></div><p className="mt-3 text-center text-sm font-semibold">วางรูปภาพที่นี่</p><p className="mt-1 text-xs text-muted-foreground">หรือเลือกจากอุปกรณ์</p></div><motion.div animate={{ y: [0, 210, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-8 right-8 top-8 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_18px_4px_rgba(56,189,248,0.45)]" /><div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/90 px-3 py-2 text-[11px] text-white"><ScanLine className="size-3.5 text-sky-300" /> AI Vision scanner active</div></CardContent></Card>
  if (step === 1) return <Card className="border-slate-200/70 bg-white/70 shadow-inner dark:border-white/10 dark:bg-white/5"><CardContent className="grid gap-4 p-4 sm:grid-cols-[1.1fr_1fr] sm:p-5"><div className="relative flex min-h-[225px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-orange-200 via-amber-100 to-sky-200 p-4"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(155deg, transparent 35%, rgba(255,255,255,.65) 36%, transparent 37%), linear-gradient(25deg, transparent 55%, rgba(255,255,255,.5) 56%, transparent 57%)' }} /><div className="relative rounded-xl bg-white/85 p-3 shadow-lg backdrop-blur-sm"><p className="text-[10px] font-bold uppercase tracking-widest text-sky-600">Recognized place</p><p className="mt-1 font-bold text-slate-900">Wat Arun</p><p className="text-xs text-slate-600">Bangkok, Thailand</p></div><Badge className="absolute right-3 top-3 bg-white/85 text-slate-800 hover:bg-white"><MapPin className="mr-1 size-3" /> 13.7437° N</Badge></div><div className="flex flex-col justify-center gap-3"><div><p className="text-xs font-medium text-muted-foreground">AI confidence</p><div className="mt-2 flex items-end justify-between"><span className="text-3xl font-bold text-slate-950 dark:text-white">98%</span><Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">CLIP match</Badge></div></div><Progress value={98} className="h-2" /><div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"><div className="flex items-center gap-2"><CloudSun className="size-5 text-amber-500" /><span className="text-sm font-semibold">28°C sunny</span></div><span className="text-xs text-muted-foreground">Outlier detector: clear</span></div></div></CardContent></Card>
  if (step === 2) return <Card className="border-slate-200/70 bg-white/70 shadow-inner dark:border-white/10 dark:bg-white/5"><CardContent className="grid gap-5 p-5 sm:grid-cols-[1.2fr_.8fr] sm:p-7"><div><div className="mb-5 flex items-center justify-between"><span className="text-sm font-semibold">ระยะเวลาทริป</span><Badge className="bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">3 Days</Badge></div><div className="relative h-2 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full w-1/3 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" /><div className="absolute left-1/3 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-sky-500 shadow dark:border-slate-900" /></div><div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>1 day</span><span>7 days</span></div><div className="mt-7 grid grid-cols-2 gap-2"><div className="rounded-xl border border-sky-300 bg-sky-50 p-3 dark:border-sky-400/40 dark:bg-sky-500/10"><Waves className="size-5 text-sky-500" /><p className="mt-2 text-sm font-semibold">Chill</p><p className="text-xs text-muted-foreground">ชิล ๆ สบาย ๆ</p></div><div className="rounded-xl border border-violet-300 bg-violet-50 p-3 dark:border-violet-400/40 dark:bg-violet-500/10"><Utensils className="size-5 text-violet-500" /><p className="mt-2 text-sm font-semibold">Foodie</p><p className="text-xs text-muted-foreground">อร่อยทุกมื้อ</p></div></div></div><div className="rounded-2xl bg-slate-950 p-5 text-white"><p className="text-xs text-slate-400">Your trip mood</p><p className="mt-2 text-xl font-semibold">Curious & easygoing</p><div className="mt-10 flex items-center gap-2 text-xs text-slate-300"><WalletCards className="size-4 text-sky-300" /> Mid-range budget</div><div className="mt-3 flex items-center gap-2 text-xs text-slate-300"><Compass className="size-4 text-violet-300" /> Balanced pace</div></div></CardContent></Card>
  return <Card className="border-slate-200/70 bg-white/70 shadow-inner dark:border-white/10 dark:bg-white/5"><CardContent className="grid gap-4 p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5"><div className="space-y-2"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-sky-600">Day 01</p><p className="font-bold">Temples & local flavours</p></div><Button variant="ghost" size="icon" className="size-8"><Download /></Button></div>{[['09:00','Wat Arun sunrise'],['11:30','Tha Tien riverside walk'],['14:00','Bangkok street food']].map(([time, title], index) => <div key={time} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5"><span className="w-10 text-[11px] font-bold text-sky-600">{time}</span><div className="size-2 rounded-full bg-violet-400" /><p className="flex-1 text-sm font-medium">{title}</p><GripVertical className="size-4 text-slate-300" /></div>)}</div><div className="relative min-h-[230px] overflow-hidden rounded-2xl bg-[#dff1eb] dark:bg-emerald-950/30"><div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(30deg, transparent 48%, #76b9aa 49%, transparent 51%), linear-gradient(120deg, transparent 48%, #76b9aa 49%, transparent 51%)', backgroundSize: '56px 56px' }} /><svg viewBox="0 0 400 240" className="absolute inset-0 size-full" aria-label="Illustrative route map"><path d="M48 178 C 95 70, 155 170, 205 70 S 318 74, 350 45" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 8" /><circle cx="48" cy="178" r="9" fill="#0ea5e9" stroke="white" strokeWidth="4" /><circle cx="205" cy="70" r="9" fill="#8b5cf6" stroke="white" strokeWidth="4" /><circle cx="350" cy="45" r="9" fill="#f97316" stroke="white" strokeWidth="4" /></svg><div className="absolute bottom-3 left-3 rounded-lg bg-white/85 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur"><Navigation className="mr-1 inline size-3.5 text-violet-600" /> Smart route optimized</div></div></CardContent></Card>
}

export { steps }

export default DemoButton

export const demoIcons = { CalendarDays, Navigation }
export const demoVersion = '1.0'
export const demoTokens = { radius: '2xl', accent: 'sky-violet' }
export const demoStepCount = steps.length

export const PixineraryDemo = PixineraryDemoModal
export const DemoTrigger = DemoButton

export type DemoPreviewStep = typeof steps[number]
export type PixineraryDemoStep = DemoPreviewStep
export type LaunchSampleTripHandler = () => void
