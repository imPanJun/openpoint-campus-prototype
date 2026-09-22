"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Coffee, Bike, Salad, Clock, ChevronRight, Percent,
  Cloud, Zap, BatteryCharging, ShoppingBag, Box, Utensils, Ticket, MoreHorizontal,
  Settings, Search, Target, Gift, ArrowLeft, Check, Upload, QrCode, CreditCard, Copy,
  X, Barcode, Plus, Minus, Phone, CheckCircle, Map, MapPin, Fingerprint, Sun, ChevronDown, Crown,
  ShoppingCart, Receipt, TicketCheck, Heart, Star, History, Send, Loader2, ShieldCheck, Info, FileText,
  Store, Smartphone, Navigation, Users, User, CheckCircle2, UserPlus, LogIn, ExternalLink, UserMinus,
  Bell, ScanLine, CircleDollarSign, Menu, Home, Grid, LayoutGrid, AlertTriangle
} from "lucide-react"
import { Input } from "@/components/ui/input"



import { ScreenType } from '../types';
import { BackButton } from '../common/BackButton';
import { CouponModal } from '../common/CouponModal';
import { PitchBox } from '../common/PitchBox';

export function OPPrintScreen({ setActiveScreen }: { setActiveScreen: (screen: ScreenType) => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const handleBack = () => {
    if (step > 1 && step < 4) setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    else setActiveScreen('home');
  };
  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden">
      {step === 1 && <PrintUploadScreen onNext={() => setStep(2)} onBack={handleBack} />}
      {step === 2 && <PrintPaymentScreen onNext={() => { setStep(3); setTimeout(() => setStep(4), 1500); }} onBack={handleBack} />}
      {step === 3 && <PrintProcessingScreen />}
      {step === 4 && <PrintQRCodeScreen onBack={() => setActiveScreen('home')} />}
    </div>
  );
}


export function PrintUploadScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="p-4 border-b bg-white flex items-center relative shadow-sm">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-700" /></button>
        <h1 className="w-full text-lg font-bold text-center text-slate-800">雲端無感列印</h1>
      </div>
      <PitchBox text="鎖定學生期中/期末考的高頻列印剛需，將『列印痛點』轉化為學生必定踏入 7-11 實體門市的絕對理由。" />
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div onClick={onNext} className="w-full border-2 border-dashed border-slate-300 bg-white rounded-3xl p-10 flex flex-col items-center gap-4 hover:border-[#F26722]/50 hover:bg-orange-50 transition-all cursor-pointer active:scale-95 group shadow-sm">
          <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            <Upload className="h-8 w-8 text-[#F26722]" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800 text-lg">點擊選擇檔案上傳</p>
            <p className="text-sm text-slate-500 mt-1">支援 PDF / Word 格式</p>
          </div>
        </div>
        <div className="mt-6 w-full p-4 bg-white rounded-2xl flex flex-col items-center text-center border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-700">檔案上傳後將暫存於統一雲端</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1 text-green-500" /> 傳輸過程採用 AES-256 高階加密，請於 24 小時內列印
          </p>
        </div>
      </div>
    </div>
  );
}


export function PrintPaymentScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selectedPay, setSelectedPay] = useState<'op' | 'icash'>('op');
  const [colorMode, setColorMode] = useState<'bw' | 'color'>('bw');
  const [printMode, setPrintMode] = useState<'single' | 'double'>('single');
  const [rangeType, setRangeType] = useState<'all' | 'custom'>('all');
  const [customRange, setCustomRange] = useState('1-3');
  const totalFilePages = 8; 

  const getActualPages = () => {
    if (rangeType === 'all') return totalFilePages;
    if (!customRange.trim()) return 0;
    let count = 0;
    if (customRange.includes('-')) {
      const nums = customRange.split('-').map(n => parseInt(n.trim()));
      if (!isNaN(nums[0]) && !isNaN(nums[1]) && nums[1] >= nums[0]) count = nums[1] - nums[0] + 1;
      else if (!isNaN(nums[0])) count = 1;
    } else count = customRange.split(',').filter(x => x.trim() !== '').length;
    return Math.max(0, Math.min(count, totalFilePages));
  };
  const actualPages = getActualPages();
  const pricePerPage = colorMode === 'bw' ? (selectedPay === 'op' ? 1 : 3) : (selectedPay === 'op' ? 10 : 10);
  const totalPrice = actualPages * pricePerPage;

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="p-4 border-b bg-white flex items-center relative shrink-0 z-10 shadow-sm">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-700" /></button>
        <h1 className="w-full text-lg font-bold text-center text-slate-800">設定與付款</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center mb-6">
          <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mr-4 shrink-0"><FileText className="h-5 w-5" /></div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-slate-800 truncate">企業管理_期末報告_Final.pdf</p>
            <p className="text-xs text-slate-500 mt-0.5">共 {totalFilePages} 頁 • A4 尺寸</p>
          </div>
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">列印範圍</h2>
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setRangeType('all')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'all' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>全部 ({totalFilePages}頁)</button>
            <button onClick={() => setRangeType('custom')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${rangeType === 'custom' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>自訂範圍</button>
          </div>
          {rangeType === 'custom' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <Input value={customRange} onChange={(e) => setCustomRange(e.target.value)} placeholder="例: 1-3 或 2,4,5" className="bg-slate-50 border-slate-200 h-10" />
              <div className="whitespace-nowrap shrink-0">
                <span className="text-xs text-slate-500">共包含 </span><span className="text-sm font-bold text-[#F26722]">{actualPages}</span><span className="text-xs text-slate-500"> 頁</span>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">列印規格</h2>
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setColorMode('bw')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'bw' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>黑白</button>
            <button onClick={() => setColorMode('color')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${colorMode === 'color' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>彩色</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPrintMode('single')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'single' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>單面列印</button>
            <button onClick={() => setPrintMode('double')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-colors ${printMode === 'double' ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'}`}>雙面列印</button>
          </div>
        </div>
        <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">選擇付款方式</h2>
        <div className="space-y-3">
          <button onClick={() => setSelectedPay('op')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'op' ? 'border-[#F26722] bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'op' ? 'bg-[#F26722]' : 'bg-slate-200'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'op' ? 'text-white' : 'text-slate-500'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-slate-800">OP 點數全額扣抵</p><p className="text-xs text-slate-500 mt-0.5">可用點數：1,250 點</p>
            </div>
            {selectedPay === 'op' && <div className="h-6 w-6 rounded-full bg-[#F26722] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
          <button onClick={() => setSelectedPay('icash')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'icash' ? 'border-[#F26722] bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'icash' ? 'bg-[#1CA2D8]' : 'bg-slate-200'}`}><CreditCard className={`h-5 w-5 ${selectedPay === 'icash' ? 'text-white' : 'text-slate-500'}`} /></div>
            <div className="text-left flex-1">
              <p className="font-medium text-slate-800">icash Pay</p><p className="text-xs text-slate-500 mt-0.5">餘額 $840</p>
            </div>
            {selectedPay === 'icash' && <div className="h-6 w-6 rounded-full bg-[#1CA2D8] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-sm font-medium text-slate-500">預估費用 ({actualPages} 頁)</span>
          <span className="text-2xl font-black text-[#F26722]">{actualPages === 0 ? '--' : (selectedPay === 'op' ? `${totalPrice} 點` : `NT$ ${totalPrice}`)}</span>
        </div>
        <button onClick={onNext} disabled={actualPages === 0} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center transition-all ${actualPages > 0 ? 'bg-[#F26722] hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
          確認付款並產出條碼<ChevronRight className="ml-1 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}


export function PrintProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 animate-in fade-in duration-300">
      <Loader2 className="h-12 w-12 text-[#F26722] animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-800 mb-2">安全連線中</h2>
      <p className="text-sm text-slate-500">系統正在進行列印資金預先圈存...</p>
    </div>
  );
}


export function PrintQRCodeScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-bottom-8 fade-in duration-500 overflow-y-auto">
      <div className="p-4 flex items-center relative shrink-0">
        <button onClick={onBack} className="absolute left-4 p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors"><ArrowLeft className="h-5 w-5 text-slate-800" /></button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start p-6 pb-12">
        <div className="bg-green-100/50 border border-green-200 text-green-700 px-4 py-2 rounded-full font-bold text-xs mb-6 flex items-center">
          <ShieldCheck className="h-4 w-4 mr-1.5" /> 已完成預先授權圈存
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-8 w-full max-w-[280px] flex flex-col items-center relative">
          <QrCode className="h-40 w-40 text-slate-900 mb-5" />
          <div className="text-center w-full pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-[#F26722] mb-1">請至 ibon 掃描出紙</h2>
            <p className="text-xs font-medium text-slate-500">免經店員解鎖，免排隊結帳</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 w-full max-w-[280px] border border-slate-200 shadow-sm">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-slate-400 mr-2.5 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-1.5">自動退款防呆機制</h4>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-3 leading-relaxed">
                <li>取件條碼有效期限為 <span className="font-bold text-[#F26722]">72 小時</span>。</li>
                <li>若逾時未印，或遇機台卡紙、斷網等異常，系統將自動取消圈存並全額退還款項。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 兌換券與預約取貨 (雙選擇介面)
// ==========================================
