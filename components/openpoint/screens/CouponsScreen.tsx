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

export function CouponsScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<'list' | 'options' | 'qr' | 'store' | 'time' | 'success'>('list');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const coupons = [
    { id: 1, title: "美式咖啡 8 折券", subtitle: "限時優惠 (早八打卡獎勵)", expiry: "今天 12:00 前有效", color: "bg-[#F26722]", highlight: true },
    { id: 2, title: "波霸珍珠奶茶", subtitle: "嘗鮮價 9 折 (學餐消費回饋)", expiry: "今天 22:00 前有效", color: "bg-orange-400" },
    { id: 3, title: "拿鐵咖啡 9 折券", subtitle: "全品項適用", expiry: "2026/06/01", color: "bg-green-600" },
  ];

  const nearbyStores = [
    { id: 's1', name: '台科大一餐門市', distance: '100m' },
    { id: 's2', name: '台科大第三宿舍門市', distance: '250m' },
    { id: 's3', name: '公館基隆路門市', distance: '400m' },
  ];

  const timeSlots = ["現在 (立即準備)", "14:30", "15:00", "15:30", "16:00", "16:30"];

  const handleUseCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setView('options');
  };

  const internalBack = () => {
    if (view === 'options') setView('list');
    else if (view === 'qr') setView('options');
    else if (view === 'store') setView('options'); 
    else if (view === 'time') setView('store'); 
    else if (view === 'success') { setView('list'); onBack(); } 
    else onBack();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center shrink-0 relative shadow-sm">
        <div className="absolute left-4 z-10">
          <BackButton onClick={view === 'list' ? onBack : internalBack} />
        </div>
        <h1 className="w-full text-lg font-bold text-center pr-8 text-slate-800">
          {view === 'list' ? '我的兌換券' : view === 'options' ? '選擇兌換方式' : view === 'qr' ? '櫃台兌換條碼' : view === 'success' ? '預約成功' : '預約自取'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'list' && (
          <div className="p-4 space-y-4 animate-in fade-in duration-300">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-0 shadow-sm overflow-hidden relative bg-white">
                {coupon.highlight && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10 animate-pulse">限時派發</div>
                )}
                <CardContent className="p-0 flex bg-white">
                  <div className={`w-2.5 ${coupon.color}`} />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-slate-800 mb-0.5">{coupon.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{coupon.subtitle}</p>
                    <div className="flex items-center text-xs text-slate-500 bg-slate-100 w-fit px-2 py-1 rounded">
                      <Clock className="h-3 w-3 mr-1" />有效期限：{coupon.expiry}
                    </div>
                  </div>
                  <div className="flex items-center pr-4">
                    <Button onClick={() => handleUseCoupon(coupon)} size="sm" className={`${coupon.color} hover:opacity-90 text-white shadow-sm active:scale-95`}>
                      使用
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {view === 'options' && (
          <div className="p-6 flex flex-col gap-5 animate-in slide-in-from-right-4 fade-in duration-300 h-full justify-center pb-20">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedCoupon?.title}</h2>
              <p className="text-sm text-slate-500">請選擇您偏好的兌換方式</p>
            </div>
            <button onClick={() => setView('qr')} className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col items-center gap-4 hover:border-[#F26722] hover:bg-orange-50 transition-all active:scale-95 group shadow-sm">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <QrCode className="h-8 w-8 text-slate-600 group-hover:text-[#F26722]" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-700">臨櫃出示條碼兌換</h3>
                <p className="text-sm text-slate-500 mt-1">適合剛好在門市的您，請由店員刷讀</p>
              </div>
            </button>
            <button onClick={() => setView('store')} className="w-full bg-white border-2 border-[#F26722] rounded-3xl p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-orange-50 to-white hover:from-orange-100 hover:to-orange-50 transition-all active:scale-95 group shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F26722] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">免排隊</div>
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Smartphone className="h-8 w-8 text-[#F26722]" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-orange-700">預約門市自取</h3>
                <p className="text-sm text-slate-500 mt-1">選好時間與門市，到店直接拿走超省時</p>
              </div>
            </button>
          </div>
        )}

        {view === 'qr' && (
          <div className="p-6 flex flex-col items-center h-full animate-in zoom-in-95 duration-300">
            <h2 className="text-lg font-bold text-slate-800 mb-6 mt-4">{selectedCoupon?.title}</h2>
            <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-8 w-full max-w-[280px] flex flex-col items-center">
              <QrCode className="h-40 w-40 text-slate-900 mb-4" />
              <div className="w-full h-16 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden mb-2">
                <div className="absolute inset-y-2 left-3 right-3 flex gap-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => <div key={i} className={`h-full ${Math.random() > 0.5 ? 'w-1' : 'w-[2px]'} bg-white`} />)}
                </div>
              </div>
              <p className="text-xs font-mono text-slate-400">AA123456789</p>
            </div>
            <p className="text-sm font-bold text-[#F26722] animate-bounce">請出示此畫面由店員掃描</p>
          </div>
        )}

        {view === 'store' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1">請選擇預約取貨門市</h2>
            <div className="space-y-3">
              {nearbyStores.map(store => (
                <button key={store.id} onClick={() => { setSelectedStore(store.name); setView('time'); }} className="w-full bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-[#F26722] hover:shadow-md transition-all active:scale-95 shadow-sm">
                  <div className="flex items-center">
                    <div className="bg-orange-50 p-2.5 rounded-full mr-3 text-[#F26722]"><Store className="h-5 w-5" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-800 text-sm">{store.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="h-3 w-3 mr-0.5" /> 距離您約 {store.distance}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'time' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 flex items-center shrink-0">
              <Store className="h-5 w-5 text-[#F26722] mr-2 shrink-0" />
              <p className="text-sm text-orange-800 font-medium">已選擇：{selectedStore}</p>
            </div>
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1 shrink-0">請選擇預計取貨時間</h2>
            <div className="grid grid-cols-2 gap-3 mb-8 flex-1 overflow-y-auto">
              {timeSlots.map(time => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`py-3.5 h-16 rounded-xl border-2 font-bold text-sm transition-all ${selectedTime === time ? 'border-[#F26722] bg-orange-50 text-[#F26722]' : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'}`}>
                  {time}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4 pb-2 shrink-0">
              <Button onClick={() => setView('success')} disabled={!selectedTime} className="w-full bg-[#F26722] hover:bg-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg disabled:opacity-50 disabled:active:scale-100">
                確認預約
              </Button>
            </div>
          </div>
        )}

        {view === 'success' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in zoom-in-95 duration-500 pb-20">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">預約成功！</h2>
            <p className="text-slate-500 text-center mb-8">門市已收到您的訂單<br/>請於 <span className="font-bold text-[#F26722]">{selectedTime}</span> 前往 <span className="font-bold text-[#F26722]">{selectedStore}</span> 領取。</p>
            <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{selectedCoupon?.title}</h3>
              <p className="text-xs text-slate-500 mb-4">預約編號：#OP883921</p>
              
              <div className="w-full bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                <p className="text-lg font-mono font-bold text-slate-700 tracking-widest">AB98-7654-3210</p>
              </div>
              <p className="text-xs text-center mt-3 text-slate-400">到店時請向店員出示此兌換序號</p>
            </div>
            <Button onClick={internalBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              回列表
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// ★ 學餐支付 Screen (掃碼付款，保留申報與申報完成頁面)
// ==========================================
