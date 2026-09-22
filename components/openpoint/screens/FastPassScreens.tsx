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

export function FastPassUnlockScreen({ onUnlock, onBack }: { onUnlock: () => void; onBack: () => void }) {
  return (
    <div className="relative flex flex-col h-screen max-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4"><button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"><X className="h-6 w-6" /></button></div>
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative mb-8">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#F26722]/20 to-orange-500/20 flex items-center justify-center animate-pulse"><div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#F26722]/30 to-orange-500/30 flex items-center justify-center"><Fingerprint className="h-16 w-16 text-[#F26722]" /></div></div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">開啟 Fast-Pass 前</h2><p className="text-white/60 text-center text-sm mb-10">請進行生物辨識驗證</p>
          <Button onClick={onUnlock} className="bg-gradient-to-r from-[#F26722] to-orange-500 hover:from-[#F26722]/90 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95"><Fingerprint className="mr-2 h-6 w-6" /> 點擊模擬解鎖成功</Button>
        </div>
        <div className="p-6 text-center"><p className="text-white/40 text-xs">支援 Face ID / Touch ID / 指紋辨識</p></div>
      </div>
    </div>
  )
}


export function FastPassScannerScreen({ onNext, onBack }: { onNext: (amount: number) => void; onBack: () => void }) {
  const [cart, setCart] = useState([
    { id: '1', name: "鮪魚御飯糰", price: 30, tag: "OP" },
    { id: '2', name: "奮起湖軟燒肉便當", price: 89, tag: "OP" }
  ]);
  const [showAlert, setShowAlert] = useState(false);

  const mockItems = [
    { name: "CITY CAFE 大杯拿鐵", price: 55, tag: "OP" },
    { name: "所長茶葉蛋", price: 18, tag: "OP" },
    { name: "純喫茶 無糖綠茶", price: 25, tag: "OP" },
    { name: "科學麵", price: 10, tag: "OP" }
  ];

  const handleScanItem = () => {
    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    const newItem = { ...randomItem, id: `item-${Date.now()}-${Math.random()}` };
    setCart(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-[#0B1015] relative">
      <div className="p-4 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="flex items-center text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"><ArrowLeft className="h-4 w-4 mr-1" /><span className="text-xs font-bold">返回</span></button>
        <h1 className="text-base font-bold text-white">OP Fast-Pass 極速結帳</h1>
        <div className="w-16"></div>
      </div>
      
      {showAlert && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300 w-[90%] max-w-[320px]">
          <div className="bg-red-500/95 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold border border-red-400">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            提醒：請記得將取消購買的商品放回原貨架！
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center relative p-4 min-h-0 shrink-0">
        <div className="w-52 h-52 sm:w-56 sm:h-56 border-[3px] border-slate-700/50 rounded-3xl relative mb-4 overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-3xl"></div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-green-400 shadow-[0_0_10px_2px_rgba(74,222,128,0.5)] animate-pulse"></div>
        </div>
        <Button onClick={handleScanItem} variant="outline" className="bg-transparent border border-green-900/50 text-green-400 font-bold rounded-full px-6 hover:bg-green-950/30 active:scale-95 transition-transform">
          點擊此處模擬掃描商品
        </Button>
      </div>

      <div className="bg-slate-50 rounded-t-[32px] p-5 pb-6 shadow-[0_-10px_25px_rgba(0,0,0,0.2)] flex flex-col shrink-0 max-h-[40vh] sm:max-h-[45vh]">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-lg font-bold text-slate-800">雲端購物車</h2>
          <Badge className="bg-slate-200 text-slate-600 border-0">共 {cart.length} 件</Badge>
        </div>
        <div className="space-y-3 mb-4 overflow-y-auto flex-1 pr-1">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 animate-in slide-in-from-right-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-100 text-[#F26722] flex items-center justify-center font-bold text-xs">{item.tag}</div>
                <span className="font-medium text-slate-700 text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">${item.price}</span>
                <button onClick={() => handleRemoveItem(item.id)} className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm">購物車目前是空的<br/>請掃描商品</div>
          )}
        </div>
        <div className="flex items-end justify-between shrink-0 pt-2 border-t border-slate-200">
          <div><p className="text-xs text-slate-500 font-medium mb-1 mt-1">總金額</p><p className="text-3xl font-black text-[#F26722]">${totalPrice}</p></div>
          <Button onClick={() => onNext(totalPrice)} disabled={cart.length === 0} className="bg-[#F26722] hover:bg-orange-600 text-white font-bold py-6 px-6 rounded-2xl shadow-lg active:scale-95 text-base disabled:opacity-50">
            <QrCode className="mr-2 h-5 w-5" /> 一鍵生成結帳碼
          </Button>
        </div>
      </div>
    </div>
  )
}


export function FastPassGeneratedQRScreen({ amount, onBack }: { amount: number; onBack: () => void }) {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-[#0B1015]">
      <div className="p-4 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="flex items-center text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"><ArrowLeft className="h-4 w-4 mr-1" /><span className="text-xs font-bold">返回</span></button>
        <h1 className="text-base font-bold text-white">付款結帳碼</h1>
        <div className="w-16"></div>
      </div>
      <div className="flex-1 bg-slate-50 rounded-t-[32px] p-6 flex flex-col items-center mt-2 overflow-y-auto pb-12">
        <div className="text-center mt-6 mb-8">
          <h2 className="text-2xl font-black text-slate-800 mb-2">整合結帳碼已生成</h2>
          <p className="text-sm text-slate-500">包含商品明細與 icash Pay 授權</p>
        </div>
        <div className="w-full bg-orange-50 border border-orange-100 rounded-3xl p-6 text-center mb-8 shadow-sm">
          <p className="text-sm font-bold text-[#F26722] mb-2">本次付款總金額</p>
          <p className="text-5xl font-black text-[#F26722]"><span className="text-2xl mr-1">$</span>{amount}</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-6 flex items-center justify-center">
          <QrCode className="h-48 w-48 text-slate-800" />
        </div>
        <h3 className="text-2xl font-black text-[#F26722] tracking-wide mb-4">請至機台完成結帳</h3>
        <div className="bg-slate-100 px-6 py-2.5 rounded-full"><p className="text-xs text-slate-500 font-medium">將此條碼對準門市出口機台掃描器</p></div>
      </div>
    </div>
  )
}

// ==========================================
// 行動隨時取
// ==========================================
