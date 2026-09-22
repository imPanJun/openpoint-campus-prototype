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
import { PitchBox } from './common/PitchBox';
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
  
  // 新增狀態
  const [hasUnlocked, setHasUnlocked] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [commuteProgress, setCommuteProgress] = useState(4)
  
  const [showMoodleLogin, setShowMoodleLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

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
                      
                      {/* Phase 3 未來擴充版位 */}
                      <button disabled className="w-[68px] flex flex-col items-center justify-center py-2 opacity-60 relative cursor-not-allowed">
                        <div className="absolute -top-1 -right-1 bg-slate-200 text-slate-600 text-[8px] font-black px-1 rounded-sm shadow-sm scale-90 whitespace-nowrap">Phase 3</div>
                        <Fingerprint className="h-7 w-7 text-slate-400 mb-1" />
                        <span className="text-slate-500 text-[10px] font-bold whitespace-nowrap">校園通行證</span>
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
                <div className="-mx-1 mb-3"><PitchBox text="利用校園內高密度的社交網絡，透過點數與商品誘因引發病毒式行銷，打造爆發式的會員增長引擎。" /></div>
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

              {/* 我的通勤任務 */}
              <div className="mt-5 px-3">
                <div className="flex justify-between items-end mb-2 px-1">
                  <h2 className="text-base font-black text-slate-800">我的通勤任務</h2>
                  <span className="text-xs text-[#1CA2D8] font-bold">本週進度 {commuteProgress} / 5</span>
                </div>
                <div className="-mx-1 mb-3"><PitchBox text="將每日高頻的通勤剛需，轉化為統一實體門市的精準導流。完成『搭車賺點 ➔ 門市消費』的生態圈閉環。" /></div>
                <Card className="border border-blue-100 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-white flex items-center gap-3">
                      <div className="rounded-xl bg-[#1CA2D8] p-2.5 text-white shadow-md flex-shrink-0"><Bike className="h-5 w-5" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm mb-1">icash Pay 乘車任務</h3>
                        <Progress value={(commuteProgress / 5) * 100} className="h-2 bg-slate-200 [&>div]:bg-[#1CA2D8]" />
                      </div>
                    </div>
                    {commuteProgress < 5 ? (
                      <div className="p-3 border-t border-slate-50">
                        <Button 
                          onClick={() => setCommuteProgress(5)}
                          variant="outline" 
                          className="w-full border-[#1CA2D8] text-[#1CA2D8] hover:bg-blue-50 font-bold active:scale-95 transition-transform"
                        >
                          [Demo] 模擬使用 icash Pay 搭公車
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 border-t border-slate-50 bg-green-50 flex flex-col gap-2 animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-bold text-sm">恭喜解鎖：早八補給 咖啡買一送一券！</span>
                        </div>
                        <Button 
                          onClick={() => setActiveScreen('coupons')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-md active:scale-95 transition-transform"
                        >
                          立即前往 7-11 兌換
                        </Button>
                      </div>
                    )}
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

  if (!hasUnlocked) {
    return (
      <div className={`mx-auto min-h-screen max-w-[400px] flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-1000 ${isUnlocking ? 'bg-slate-50 opacity-0 scale-110' : 'bg-slate-900 shadow-2xl'}`}>
        <div className={`w-full transition-all duration-500 delay-100 ${isUnlocking ? 'scale-110 blur-xl opacity-0' : 'opacity-100'}`}>
          <div className="-mt-2 mb-4 mx-2"><PitchBox text="無縫串接校務系統，以極低獲客成本 (CAC) 取得『實名制、高含金量』的學生會員，免去繁瑣註冊流程。" /></div>
          <div className="text-center mb-8">
            <div className={`w-28 h-28 bg-white rounded-[32px] mx-auto mb-10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden border-4 border-orange-500/20 transition-all ${isUnlocking ? 'scale-110 border-orange-500 shadow-[0_0_40px_rgba(242,103,34,0.6)]' : ''}`}>
               {isUnlocking && <div className="absolute inset-0 bg-orange-500/20 animate-pulse"></div>}
               <img src="/moodle.png" alt="Moodle" className={`w-16 h-16 object-contain transition-all duration-300 ${isUnlocking ? 'scale-110' : ''}`} />
            </div>
            
            <h1 className="text-3xl font-black text-white mb-3 tracking-widest flex items-center justify-center">
              OPEN<span className="text-[#1CA2D8]">POINT</span><span className="text-slate-400 font-medium text-xl ml-1">.edu</span>
            </h1>
            <p className="text-slate-400 text-sm tracking-widest">解鎖校園生活專屬生態圈</p>
          </div>

          {!showMoodleLogin ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <Button 
                onClick={() => {
                  setIsUnlocking(true)
                  setTimeout(() => setHasUnlocked(true), 1800)
                }}
                disabled={isUnlocking}
                className="w-full bg-[#1CA2D8] hover:bg-[#158bba] text-white font-bold py-7 rounded-2xl shadow-lg text-lg mb-6"
              >
                <ScanLine className="mr-3 h-6 w-6" /> 快速綁定數位學生證
              </Button>
              <button 
                onClick={() => setShowMoodleLogin(true)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-bold cursor-pointer inline-flex items-center gap-2 border border-slate-700 bg-slate-800/50 px-6 py-3 rounded-full active:scale-95"
              >
                <LogIn className="h-4 w-4" /> 使用 @edu.tw 學校信箱登入
              </button>
            </div>
          ) : (
            <div className="bg-slate-800/80 p-6 rounded-[32px] border border-slate-700 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white font-bold text-lg">Moodle 系統授權</h2>
                <button onClick={() => setShowMoodleLogin(false)} className="text-slate-500 hover:text-white p-1 bg-slate-700/50 rounded-full"><X className="h-4 w-4" /></button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block">學校信箱 / 學號</label>
                  <Input 
                    placeholder="例如: b11000000@edu.tw" 
                    className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-600 rounded-xl h-12 px-4 focus-visible:ring-orange-500"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block">Moodle 密碼</label>
                  <Input 
                    type="password"
                    placeholder="請輸入密碼" 
                    className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-600 rounded-xl h-12 px-4 focus-visible:ring-orange-500"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={() => {
                  if(!loginEmail) return alert('請輸入帳號')
                  setIsUnlocking(true)
                  setTimeout(() => setHasUnlocked(true), 1500)
                }}
                disabled={isUnlocking}
                className={`w-full bg-[#F26722] hover:bg-[#e05b18] text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300 text-lg ${isUnlocking ? 'opacity-80 scale-95' : ''}`}
              >
                {isUnlocking ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-3 h-5 w-5" />}
                {isUnlocking ? '正在驗證身分...' : '登入並授權綁定'}
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-[400px] bg-slate-50 relative shadow-2xl animate-in fade-in duration-1000">
      {renderScreenContent()}
    </div>
  )
}