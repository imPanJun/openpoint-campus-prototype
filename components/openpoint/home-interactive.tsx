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


import { ScreenType } from './types';
import { BackButton } from './common/BackButton';
import { CouponModal } from './common/CouponModal';
import { OPPrintScreen } from './screens/OPPrintScreen';
import { PrintUploadScreen } from './screens/OPPrintScreen';
import { PrintPaymentScreen } from './screens/OPPrintScreen';
import { PrintProcessingScreen } from './screens/OPPrintScreen';
import { PrintQRCodeScreen } from './screens/OPPrintScreen';
import { CouponsScreen } from './screens/CouponsScreen';
import { CampusPayScreen } from './screens/CampusPayScreen';
import { FoodomoGroupScreen } from './screens/FoodomoGroupScreen';
import { FastPassUnlockScreen } from './screens/FastPassScreens';
import { FastPassScannerScreen } from './screens/FastPassScreens';
import { FastPassGeneratedQRScreen } from './screens/FastPassScreens';
import { MobilePickupScreen } from './screens/MobilePickupScreen';
import { SevenPointsScreen } from './screens/SevenPointsScreen';
import { IFoodRadarScreen } from './screens/IFoodRadarScreen';
import { OPPointsScreen } from './screens/OPPointsScreen';
import { ReferralScreen } from './screens/ReferralScreen';
import { AllFeaturesScreen } from './screens/AllFeaturesScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { MyBarcodeScreen } from './screens/MyBarcodeScreen';
import { BrandPointsScreen } from './screens/BrandPointsScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SplitBillScreen } from './screens/SplitBillScreen';

export function HomeInteractive() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [fastPassAmount, setFastPassAmount] = useState(119) 

  const goHome = () => setActiveScreen('home')
  
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'print': return <OPPrintScreen setActiveScreen={setActiveScreen} />
      case 'coupons': return <CouponsScreen onBack={goHome} />
      case 'campus_pay': return <CampusPayScreen onBack={goHome} />
      case 'foodomo': return <FoodomoGroupScreen setActiveScreen={setActiveScreen} />
      
      // Fast-Pass 三步驟
      case 'fast_pass_unlock': return <FastPassUnlockScreen onUnlock={() => setActiveScreen('fast_pass_scanner')} onBack={goHome} />
      case 'fast_pass_scanner': return <FastPassScannerScreen onNext={(amount) => { setFastPassAmount(amount); setActiveScreen('fast_pass_generated_qr'); }} onBack={goHome} />
      case 'fast_pass_generated_qr': return <FastPassGeneratedQRScreen amount={fastPassAmount} onBack={goHome} />
      
      // 原有功能
      case 'seven_points': return <SevenPointsScreen onBack={goHome} />
      case 'mobile_pickup': return <MobilePickupScreen onBack={goHome} />
      case 'ifood_radar': return <IFoodRadarScreen onBack={goHome} />
      case 'op_points': return <OPPointsScreen onBack={goHome} />
      case 'referral': return <ReferralScreen onBack={goHome} />
      
      // 新補上的全功能路徑
      case 'all_features': return <AllFeaturesScreen setActiveScreen={setActiveScreen} onBack={goHome} />
      case 'notifications': return <NotificationsScreen onBack={goHome} />
      case 'my_barcode': return <MyBarcodeScreen onBack={goHome} />
      case 'brand_points': return <BrandPointsScreen onBack={goHome} />
      case 'services': return <ServicesScreen onBack={goHome} />
      case 'profile': return <ProfileScreen onBack={goHome} />
      case 'split_bill': return <SplitBillScreen onBack={goHome} />

      case 'home':
      default:
        return (
          <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
            {/* 頂部經典 Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
              <button onClick={() => setActiveScreen('notifications')} className="relative p-2 rounded-full hover:bg-slate-50">
                <Bell className="h-6 w-6 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              </button>
              
              <div className="flex-1 mx-3 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full py-2 px-4 text-center cursor-pointer">
                <span className="text-sm font-bold text-slate-700">Hi,披薩 ！台科大專屬優惠</span>
              </div>
              
              <button onClick={() => setActiveScreen('my_barcode')} className="flex flex-col items-center justify-center p-1 hover:opacity-80">
                <Barcode className="h-6 w-6 text-slate-700" />
                <span className="text-[10px] font-bold text-slate-600 mt-0.5">我的條碼</span>
              </button>
            </div>

            <main className="flex-1">
              {/* 經典點數看板 */}
              <div className="px-3 pt-3">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <span className="font-black text-xl tracking-wider text-slate-800">OPEN<span className="text-green-600">POINT</span></span>
                      <span className="text-slate-500 text-sm ml-2 font-medium">價值</span>
                    </div>
                    <div className="flex items-baseline cursor-pointer hover:opacity-80" onClick={() => setActiveScreen('op_points')}>
                      <span className="text-[#F26722] text-3xl font-black mr-1">1,250</span>
                      <span className="text-slate-500 text-sm font-medium">元</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-100 w-full mb-3"></div>
                  
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    <div onClick={() => setActiveScreen('seven_points')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">小7集點卡</p>
                      <p className="text-red-500 font-bold text-lg">5 <span className="text-xs text-slate-500 font-normal">點</span></p>
                    </div>
                    <div onClick={() => setActiveScreen('brand_points')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">品牌專用點</p>
                      <p className="text-red-500 font-bold text-lg">0 <span className="text-xs text-slate-500 font-normal">點</span></p>
                    </div>
                    <div onClick={() => setActiveScreen('mobile_pickup')} className="text-center px-2 cursor-pointer hover:bg-slate-50 rounded-lg py-1">
                      <p className="text-xs text-slate-600 mb-1 font-bold">行動隨時取</p>
                      <p className="text-slate-800 font-bold text-lg">12 <span className="text-xs text-slate-500 font-normal">張</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 我的常用功能 */}
              <div className="mt-5 px-3">
                <div className="flex justify-between items-end mb-2 px-1">
                  <h2 className="text-base font-black text-slate-800">我的常用功能</h2>
                  <span className="text-xs text-slate-400 font-medium">設定/搜尋</span>
                </div>
                
                <div className="flex gap-2 h-[88px]">
                  <div className="w-[38%] bg-gradient-to-br from-green-500 to-[#4CAF50] rounded-2xl p-1.5 flex gap-1.5 shadow-sm">
                    <button onClick={() => setActiveScreen('foodomo')} className="flex-1 flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                      <ShoppingBag className="h-7 w-7 text-white mb-1" />
                      <span className="text-white text-[11px] font-bold">foodomo</span>
                    </button>
                    <button onClick={() => setActiveScreen('campus_pay')} className="flex-1 flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                      <Utensils className="h-7 w-7 text-white mb-1" />
                      <span className="text-white text-[11px] font-bold">學餐支付 (掃碼)</span>
                    </button>
                  </div>
                  
                  <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden px-1">
                    <div className="flex min-w-max px-1">
                      <button onClick={() => setActiveScreen('print')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Cloud className="h-7 w-7 text-blue-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">雲端列印</span>
                      </button>
                      <button onClick={() => setActiveScreen('coupons')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Ticket className="h-7 w-7 text-amber-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">兌換券</span>
                      </button>
                      <button onClick={() => setActiveScreen('split_bill')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Receipt className="h-7 w-7 text-indigo-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">AI 分帳</span>
                      </button>
                      <button onClick={() => setActiveScreen('fast_pass_unlock')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Zap className="h-7 w-7 text-amber-400 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">Fast-Pass</span>
                      </button>
                      <button onClick={() => setActiveScreen('ifood_radar')} className="w-[68px] flex flex-col items-center justify-center py-2 hover:bg-slate-50 rounded-xl">
                        <Salad className="h-7 w-7 text-green-500 mb-1" />
                        <span className="text-slate-700 text-[10px] font-bold">i珍食雷達</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 校園任務與獎勵 */}
              <div className="mt-5 px-3">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Target className="h-4 w-4 text-[#F26722]" />
                  <h2 className="text-sm font-bold text-slate-800">校園任務與獎勵</h2>
                </div>
                <Card className="border border-orange-100 bg-gradient-to-r from-orange-50 to-white transition-all hover:shadow-md active:scale-[0.99] cursor-pointer shadow-sm" onClick={() => setActiveScreen('referral')}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#F26722] p-2.5 text-white shadow-md flex-shrink-0"><Gift className="h-5 w-5" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-slate-800 text-sm">邀請朋友送優惠</h3>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Referral Noodle Challenge</p>
                        <div className="space-y-1.5">
                          <Progress value={33} className="h-1.5 bg-slate-200 [&>div]:bg-[#F26722]" />
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">1/3 已邀請</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-orange-100 text-[#F26722] border-0">+1 碗來一客</Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 早八打卡挑戰 */}
              <div className="mt-4 px-3">
                <div className="w-full aspect-[21/9] bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 rounded-2xl shadow-sm relative overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setShowCouponModal(true)}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="text-center z-10">
                    <Badge className="bg-white text-rose-500 hover:bg-white border-0 mb-2 shadow-sm font-black">早八打卡挑戰</Badge>
                    <h3 className="text-white font-black text-xl tracking-wide drop-shadow-md">點擊完成今日報到</h3>
                  </div>
                </div>
              </div>
            </main>

            {/* 經典底部導航 */}
            <div className="fixed bottom-0 w-full max-w-[400px] bg-white border-t border-slate-100 flex items-end justify-between px-2 pb-5 pt-2 z-50">
              <button onClick={() => setActiveScreen('home')} className="flex flex-col items-center w-1/5 pt-1">
                <Home className="h-6 w-6 text-[#F26722] mb-1" />
                <span className="text-[10px] font-bold text-[#F26722]">首頁</span>
              </button>
              
              <button onClick={() => setActiveScreen('all_features')} className="flex flex-col items-center w-1/5 pt-1">
                <LayoutGrid className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">全部功能</span>
              </button>
              
              {/* 正中間大按鈕 ➔ Fast-Pass */}
              <div className="w-1/5 flex flex-col items-center relative h-full justify-end">
                <button 
                  onClick={() => setActiveScreen('fast_pass_unlock')} 
                  className="absolute -top-10 w-16 h-16 bg-gradient-to-tr from-orange-500 to-[#F26722] rounded-full flex items-center justify-center border-4 border-white shadow-lg active:scale-95 transition-transform"
                >
                  <ScanLine className="h-8 w-8 text-white" />
                </button>
                <span className="text-[10px] font-bold text-slate-600 mt-1">極速結帳</span>
              </div>
              
              <button onClick={() => setActiveScreen('services')} className="flex flex-col items-center w-1/5 pt-1">
                <Grid className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">服務</span>
              </button>
              <button onClick={() => setActiveScreen('profile')} className="flex flex-col items-center w-1/5 pt-1">
                <User className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-500">會員中心</span>
              </button>
            </div>

            {showCouponModal && (
              <CouponModal onClose={() => setShowCouponModal(false)} onGoToCoupons={() => { setShowCouponModal(false); setActiveScreen('coupons'); }} />
            )}
          </div>
        )
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-slate-50 relative shadow-2xl">
      {renderScreenContent()}
    </div>
  )
}