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

export function CampusPayScreen({ onBack }: { onBack: () => void }) {
  // ★ 加入 report_success 狀態
  const [payState, setPayState] = useState<'paying' | 'processing' | 'success' | 'report' | 'report_success'>('paying');
  const [storeName, setStoreName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulatePay = () => {
    setPayState('processing');
    setTimeout(() => setPayState('success'), 1500);
  };

  const handleInternalBack = () => {
    if (payState === 'report') setPayState('success');
    else if (payState === 'report_success') onBack(); // 申報完成後點擊返回，回到首頁
    else onBack();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shrink-0 shadow-sm">
        <BackButton onClick={handleInternalBack} />
        <h1 className="text-lg font-bold text-slate-800">
          {payState === 'report' || payState === 'report_success' ? '店家申報與補領' : '學餐支付 (掃碼)'}
        </h1>
        <div className="w-16"></div>
      </div>

      <PitchBox text="以 icash Pay / OPEN WALLET 深入校園封閉金流，掌握學生每日三餐的真實消費數據與金流入口。" />

      {payState === 'paying' && (
        <div className="flex-1 p-6 flex flex-col items-center overflow-auto pb-10 animate-in fade-in duration-300">
          <div className="w-full bg-green-50 text-green-700 px-4 py-3 rounded-xl font-bold text-sm mb-8 flex items-center justify-center border border-green-200 shadow-sm shrink-0">
            <Utensils className="h-4 w-4 mr-2" />現在買學餐，筆筆送 OP 折價券！
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full mb-8">
            <div className="w-60 h-60 border-[3px] border-slate-200 rounded-3xl relative overflow-hidden bg-slate-100 shadow-inner shrink-0">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#4CAF50] rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#4CAF50] rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#4CAF50] rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#4CAF50] rounded-br-3xl"></div>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#4CAF50] shadow-[0_0_10px_2px_rgba(76,175,80,0.6)] animate-pulse"></div>
            </div>
            <p className="mt-8 text-sm font-bold text-slate-600 text-center">請將鏡頭對準店家收款碼</p>
          </div>

          <div className="mt-auto w-full shrink-0">
            <Button onClick={handleSimulatePay} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg">
              模擬掃描完成 ($85)
            </Button>
          </div>
        </div>
      )}

      {payState === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <Loader2 className="h-12 w-12 text-[#4CAF50] animate-spin mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">處理付款中</h2>
          <p className="text-sm text-slate-500">正在與學餐系統連線...</p>
        </div>
      )}

      {payState === 'success' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-start animate-in zoom-in-95 duration-500 pb-8 overflow-y-auto">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-inner mt-2 shrink-0">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-1 shrink-0">付款成功！</h2>
          <p className="text-slate-500 mb-5 font-medium shrink-0">已扣款 $85</p>

          <div className="w-full bg-white rounded-3xl p-1.5 shadow-lg border border-orange-100 relative overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-700 shrink-0">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">限時發送</div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[26px] p-5 border border-dashed border-orange-200">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Coffee className="h-7 w-7 text-[#F26722]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#F26722] text-lg mb-0.5">美式咖啡 8 折券</h3>
                  <p className="text-xs text-slate-500 font-medium">指定 CITY CAFE 品項適用</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-orange-200 flex justify-between items-center">
                <div className="flex items-center text-xs text-red-500 font-bold bg-red-50 px-2.5 py-1.5 rounded-md">
                  <Clock className="h-3.5 w-3.5 mr-1" />限 8 小時內至門市使用完畢
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-center mb-6 shrink-0">
            <button onClick={() => setPayState('report')} className="text-[13px] text-slate-500 hover:text-[#F26722] underline decoration-slate-300 hover:decoration-[#F26722] underline-offset-4 transition-colors font-bold">
              沒有領取到優惠券？點此申報
            </button>
          </div>

          <div className="w-full mt-auto shrink-0 pb-2">
            <Button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg mb-4">
              返回首頁查看票券
            </Button>
          </div>
        </div>
      )}

      {payState === 'report' && (
        <div className="flex-1 p-6 flex flex-col animate-in slide-in-from-right-4 duration-300 pb-20 overflow-y-auto">
          <div className="w-full text-left mb-8 mt-2">
            <h2 className="text-2xl font-black text-slate-800 mb-3">店家申報與補領</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              若您消費的店家尚未加入學餐名單，請輸入店名申請。<br/>經人工審核通過後，我們將為您補發專屬優惠券！
            </p>
          </div>
          
          <div className="w-full mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-3">商家店名</label>
            <Input 
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="請輸入完整商家名稱 (例: 大一餐-八方雲集)" 
              className="w-full bg-white border-2 border-slate-200 h-14 text-sm rounded-xl focus-visible:ring-[#F26722]"
            />
          </div>
          
          <div className="w-full bg-orange-50 p-4 rounded-xl border border-orange-100 mb-8 flex items-start">
            <Info className="h-5 w-5 mr-2 shrink-0 text-[#F26722] mt-0.5" />
            <p className="text-xs text-orange-800 leading-relaxed">
              此申請過程將交由人工審核，作業約需 1-3 個工作天，審核結果將透過推播通知您。
            </p>
          </div>

          <div className="mt-auto w-full pt-4">
            <Button 
              disabled={!storeName.trim() || isSubmitting}
              onClick={() => {
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  setStoreName('');
                  // ★ 這裡從 'success' 改成跳轉到 'report_success'
                  setPayState('report_success'); 
                }, 1500);
              }} 
              className="w-full bg-[#F26722] hover:bg-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "送出審核申請"}
            </Button>
          </div>
        </div>
      )}

      {/* ★ 新增：專屬的申報完成頁面 */}
      {payState === 'report_success' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 pb-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
            <CheckCircle2 className="h-12 w-12 text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">申報已送出！</h2>
          <p className="text-slate-500 text-center mb-8 font-medium">感謝您的回報！<br/>審核通過後，我們將立即為您補發專屬優惠券。</p>

          <Button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
            回首頁
          </Button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// ★ Foodomo 外送揪團 (加入真實 GPS 地圖定位與外送地址設定)
// ==========================================
