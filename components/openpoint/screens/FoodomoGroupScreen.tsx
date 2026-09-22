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

export function FoodomoGroupScreen({ setActiveScreen }: { setActiveScreen: (screen: ScreenType) => void }) {
  const [view, setView] = useState<'init' | 'host_select_store' | 'host_room_created' | 'member_enter_code' | 'menu' | 'payment' | 'status' | 'address' | 'success'>('init');
  const [role, setRole] = useState<'host' | 'member'>('host');
  const [roomCode, setRoomCode] = useState('');
  
  const [selectedPay, setSelectedPay] = useState<'icash' | 'op'>('icash');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // ★ 餐廳選擇地圖狀態
  const [storeViewMode, setStoreViewMode] = useState<'list' | 'map'>('list');
  const [isLocatingMap, setIsLocatingMap] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);

  // ★ 外送地址地圖狀態
  const [isLocatingAddress, setIsLocatingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressCoords, setAddressCoords] = useState<{lat: number, lng: number} | null>(null);

  const restaurants = [
    { id: 'starbucks', name: "星巴克 (台科大店)", min: 200, fee: 45, items: [{ id: "sb1", name: "大杯美式咖啡", price: 110 }, { id: "sb2", name: "大杯那堤", price: 135 }, { id: "sb3", name: "焦糖瑪奇朵", price: 155 }] },
    { id: 'formosa', name: "鬍鬚張 (台北公館店)", min: 150, fee: 39, items: [{ id: "fm1", name: "招牌魯肉飯", price: 65 }, { id: "fm2", name: "雞肉飯", price: 65 }, { id: "fm3", name: "苦瓜排骨湯", price: 85 }] },
    { id: 'fatdaddy', name: "胖老爹 (公館店)", min: 300, fee: 60, items: [{ id: "fd1", name: "5號全家餐", price: 329 }, { id: "fd2", name: "無骨雞腿排", price: 75 }, { id: "fd3", name: "波霸薯條", price: 40 }] }
  ];

  const [selectedStoreId, setSelectedStoreId] = useState('starbucks');
  const currentStore = restaurants.find(r => r.id === selectedStoreId) || restaurants[0];
  const [copied, setCopied] = useState(false);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  
  const addItem = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id: string) => setCart(prev => {
    const newCart = { ...prev };
    if (newCart[id] > 1) newCart[id] -= 1;
    else delete newCart[id];
    return newCart;
  });
  
  const totalFoodPrice = currentStore.items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const [members, setMembers] = useState<any[]>([]);
  const deliveryFee = currentStore.fee; 
  const feePerPerson = members.length > 0 ? Math.round(deliveryFee / members.length) : 0;

  const handleKick = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));
  const handleCover = (id: number) => setMembers(prev => prev.map(m => m.id === id ? { ...m, isPaid: true, statusText: '主揪已代墊' } : m));
  const handleSimulateAllPaid = () => setMembers(prev => prev.map(m => ({ ...m, isPaid: true, statusText: '已付款' })));

  const handlePayment = () => {
    if (role === 'host') {
      setMembers([
        { id: 1, name: "我 (主揪)", amount: totalFoodPrice, isPaid: true, isHost: true, statusText: '已付款' },
        { id: 2, name: "小智", amount: 120, isPaid: false, isHost: false, statusText: '未付款' },
        { id: 3, name: "大頭", amount: 85, isPaid: false, isHost: false, statusText: '未付款' },
      ]);
    } else {
      setMembers([
        { id: 1, name: "伯恩 (主揪)", amount: 150, isPaid: true, isHost: true, statusText: '已付款' },
        { id: 2, name: "我", amount: totalFoodPrice, isPaid: true, isHost: false, statusText: '已付款' },
        { id: 3, name: "大頭", amount: 85, isPaid: false, isHost: false, statusText: '未付款' },
      ]);
    }
    setView('status');
  };

  const handleBack = () => {
    if (view === 'host_select_store' || view === 'member_enter_code') setView('init');
    else if (view === 'host_room_created') setView('host_select_store');
    else if (view === 'menu') {
      if (role === 'host') setView('host_room_created');
      else setView('member_enter_code');
    }
    else if (view === 'payment') setView('menu');
    else if (view === 'address') setView('status'); 
    else setActiveScreen('home'); 
  };

  const allPaid = members.length > 0 && members.every(m => m.isPaid);

  // ★ 新增功能：要求 GPS 權限尋找餐廳
  const handleLocateRestaurants = () => {
    setIsLocatingMap(true);
    setMapError(null);
    setStoreViewMode('map');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocatingMap(false);
        },
        (err) => {
          setIsLocatingMap(false);
          setMapError("無法取得您的定位，請確認已授權 GPS 權限");
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocatingMap(false);
      setMapError("您的裝置或瀏覽器不支援定位功能");
    }
  };

  // ★ 新增功能：要求 GPS 權限設定外送地址
  const handleLocateAddress = () => {
    setIsLocatingAddress(true);
    setAddressError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setAddressCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocatingAddress(false);
          setDeliveryAddress("已取得精確 GPS 定位座標");
        },
        (err) => {
          setIsLocatingAddress(false);
          setAddressError("無法取得定位，請手動選擇下方地址");
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocatingAddress(false);
      setAddressError("您的裝置或瀏覽器不支援定位功能");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-[#4CAF50] flex items-center shrink-0 shadow-sm z-10">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-green-600 transition-colors">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="w-full text-lg font-bold text-center text-white pr-8">Foodomo 校園揪團</h1>
      </div>

      <PitchBox text="發揮學生同儕的社群擴散效應，以極低的單筆物流成本達成高客單價，強勢提升校園外送市佔率。" />

      <div className="flex-1 overflow-y-auto">
        {view === 'init' && (
          <div className="p-6 flex flex-col items-center justify-center h-full animate-in fade-in duration-300 pb-20">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <ShoppingBag className="h-12 w-12 text-[#4CAF50]" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">無痛分帳揪團</h2>
            <p className="text-slate-500 text-sm mb-10 text-center px-4">主揪免代墊免催款，團員各自結帳，自動拆分外送費！</p>
            
            <div className="w-full space-y-4">
              <button onClick={() => { setRole('host'); setView('host_select_store'); setCart({}); }} className="w-full bg-white border-2 border-[#4CAF50] rounded-2xl p-5 flex items-center justify-between hover:bg-green-50 transition-all active:scale-95 shadow-sm group">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors"><UserPlus className="h-6 w-6 text-[#4CAF50]" /></div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">發起揪團 (主揪)</h3><p className="text-xs text-slate-500 mt-1">選擇餐廳並建立房間代碼</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[#4CAF50]" />
              </button>
              <button onClick={() => { setRole('member'); setView('member_enter_code'); setCart({}); setSelectedStoreId('starbucks'); }} className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 flex items-center justify-between hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 group shadow-sm">
                <div className="flex items-center">
                  <div className="bg-slate-100 p-3 rounded-full mr-4 group-hover:bg-slate-200 transition-colors"><LogIn className="h-6 w-6 text-slate-600" /></div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-lg">加入揪團 (團員)</h3><p className="text-xs text-slate-500 mt-1">輸入房號一起點餐</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {view === 'host_select_store' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 px-1 shrink-0">
              <h2 className="text-sm font-bold text-slate-700">請選擇附近可外送餐廳</h2>
              <div className="bg-slate-200 p-1 rounded-lg flex text-xs font-bold shadow-inner">
                <button 
                  onClick={() => setStoreViewMode('list')} 
                  className={`px-3 py-1.5 rounded-md transition-all ${storeViewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  列表
                </button>
                <button 
                  onClick={handleLocateRestaurants} 
                  className={`px-3 py-1.5 rounded-md transition-all ${storeViewMode === 'map' ? 'bg-[#4CAF50] shadow-sm text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  地圖
                </button>
              </div>
            </div>

            {storeViewMode === 'list' ? (
              <div className="space-y-3 flex-1 overflow-y-auto pb-6">
                {restaurants.map((store) => (
                  <Card key={store.id} onClick={() => { setSelectedStoreId(store.id); setView('host_room_created'); }} className="border-0 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#4CAF50] transition-all active:scale-95 bg-white">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800">{store.name}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 text-[10px]">滿 ${store.min} 外送</Badge>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">外送費 ${store.fee}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-300" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : isLocatingMap ? (
              <div className="flex-1 bg-[#E8F0FE] rounded-3xl border-2 border-slate-200 flex flex-col items-center justify-center shadow-inner mb-6">
                 <Loader2 className="h-10 w-10 text-[#4CAF50] animate-spin mb-4" />
                 <p className="font-bold text-slate-700 text-sm">正在取得真實定位，搜尋附近商家...</p>
              </div>
            ) : mapError ? (
              <div className="flex-1 bg-slate-100 rounded-3xl border-2 border-slate-200 flex flex-col items-center justify-center p-6 text-center shadow-inner mb-6">
                 <MapPin className="h-10 w-10 text-slate-400 mb-3" />
                 <p className="font-bold text-red-500 mb-2">{mapError}</p>
                 <Button variant="outline" onClick={() => setStoreViewMode('list')} className="mt-3">返回列表模式</Button>
              </div>
            ) : (
              <div className="flex-1 bg-[#E8F0FE] rounded-3xl border-2 border-slate-200 relative overflow-hidden shadow-inner mb-6 animate-in zoom-in-95 duration-300">
                <div className="w-full h-full overflow-auto touch-pan-x touch-pan-y cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="w-[600px] h-[600px] relative" style={{ backgroundImage: 'radial-gradient(#4CAF50 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
                    
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                      <div className="h-6 w-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 mt-1 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">您的真實位置</span>
                    </div>
                    
                    {restaurants.map((store, idx) => {
                      const positions = [{ top: '25%', left: '20%' }, { top: '65%', left: '65%' }, { top: '35%', left: '75%' }];
                      return (
                        <button key={store.id} onClick={() => { setSelectedStoreId(store.id); setView('host_room_created'); }} className="absolute flex flex-col items-center group active:scale-95 transition-transform z-20" style={positions[idx]}>
                          <div className="bg-white p-2 rounded-xl shadow-md border border-slate-200 group-hover:border-[#4CAF50] group-hover:shadow-xl transition-all mb-1">
                            <p className="text-xs font-bold text-slate-800 whitespace-nowrap">{store.name}</p>
                            <p className="text-[10px] text-[#4CAF50] font-bold mt-0.5">外送費 ${store.fee}</p>
                          </div>
                          <div className="h-8 w-8 bg-[#4CAF50] text-white rounded-full flex items-center justify-center shadow-md"><Store className="h-4 w-4" /></div>
                          <div className="w-1 h-3 bg-[#4CAF50]"></div>
                          <div className="w-3 h-1.5 bg-black/20 rounded-full blur-[1px]"></div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-4 py-2.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-2 w-max pointer-events-none">
                  <Target className="h-4 w-4 text-[#F26722]" />
                  <span className="text-xs font-bold text-slate-700">已根據您的 GPS 篩選</span>
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'host_room_created' && (
          <div className="p-6 flex flex-col items-center h-full animate-in zoom-in-95 duration-300">
            <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center mb-6">
              <h2 className="text-slate-500 text-sm font-bold mb-4">房間建立成功！請邀請團員進房</h2>
              <div className="bg-green-50 text-green-700 text-4xl font-black tracking-widest py-5 rounded-xl border-2 border-dashed border-green-200 mb-6 font-mono">
                FD-9527
              </div>
              <Button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} variant="outline" className={`w-full font-bold mb-3 transition-colors ${copied ? 'bg-[#4CAF50] text-white border-[#4CAF50] hover:bg-green-600' : 'border-[#4CAF50] text-[#4CAF50] hover:bg-green-50'}`}>
                {copied ? <><Check className="mr-2 h-4 w-4" /> 連結已複製！</> : <><Copy className="mr-2 h-4 w-4" /> 複製邀請代碼</>}
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                <ExternalLink className="mr-2 h-4 w-4" /> 分享至 LINE
              </Button>
            </div>
            <div className="mt-auto pt-4 w-full pb-6">
              <Button onClick={() => setView('menu')} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg">
                下一步：主揪開始點餐
              </Button>
            </div>
          </div>
        )}

        {view === 'member_enter_code' && (
          <div className="p-6 flex flex-col items-center h-full animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-2 mt-4">加入揪團</h2>
            <p className="text-sm text-slate-500 mb-8 text-center">請輸入主揪提供的 6 碼房間代號<br/>或貼上邀請連結</p>
            <div className="w-full mb-8">
              <Input 
                value={roomCode} 
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="例如: FD-9527" 
                className="text-center text-2xl font-black tracking-widest uppercase h-16 border-2 border-slate-200 focus-visible:ring-[#4CAF50] bg-white shadow-sm rounded-xl"
                maxLength={7}
              />
            </div>
            <Button onClick={() => setView('menu')} disabled={roomCode.length < 5} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
              確認並加入房間
            </Button>
          </div>
        )}

        {view === 'menu' && (
          <div className="animate-in fade-in duration-300 pb-28">
            <div className="bg-white p-4 mb-3 shadow-sm border-b border-slate-200 flex justify-between items-center">
              <div>
                <div className="flex items-center text-xs text-slate-500 mb-1"><Store className="h-3 w-3 mr-1" /> 台科大周邊餐廳</div>
                <h2 className="text-lg font-black text-slate-800">{currentStore.name}</h2>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 mb-1">房號 FD-9527</Badge>
                <div className="text-xs text-slate-500 flex items-center justify-end"><Users className="h-3 w-3 mr-1"/> 已有 3 人在房內</div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {currentStore.items.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{item.name}</h3><p className="text-sm text-[#F26722] font-bold mt-0.5">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {cart[item.id] ? (
                        <>
                          <button onClick={() => removeItem(item.id)} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"><Minus className="h-4 w-4 text-slate-600" /></button>
                          <span className="w-4 text-center font-bold text-slate-700">{cart[item.id]}</span>
                          <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-green-600"><Plus className="h-4 w-4 text-white" /></button>
                        </>
                      ) : (
                        <button onClick={() => addItem(item.id)} className="h-8 w-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-green-600"><Plus className="h-4 w-4 text-white" /></button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
              <Button onClick={() => setView('payment')} disabled={totalItems === 0} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50">
                選好餐點，結帳 ({totalItems}項 / ${totalFoodPrice})
              </Button>
            </div>
          </div>
        )}

        {view === 'payment' && (
          <div className="p-4 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
            <h2 className="font-bold text-slate-800 mb-3 px-1">您的餐點明細</h2>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
              <div className="space-y-3 text-sm text-slate-600 mb-4 border-b border-slate-100 pb-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = currentStore.items.find(m => m.id === id);
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <span>{item?.name} x{qty}</span><span>${(item?.price || 0) * qty}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-slate-800">您的餐點小計</span><span className="text-xl font-black text-slate-800">${totalFoodPrice}</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 flex items-start">
              <Info className="h-5 w-5 mr-2 shrink-0 text-green-600" />
              <p className="text-xs text-green-800 leading-relaxed">外送費將於所有人結帳完畢後，由系統自動均分。<br/>請先完成授權圈存，<strong className="text-[#4CAF50]">目前暫不扣款</strong>。</p>
            </div>

            <h2 className="font-bold text-slate-800 mb-3 px-1">選擇付款方式</h2>
            <div className="space-y-3 mb-6">
              <button onClick={() => setSelectedPay('icash')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 relative overflow-hidden ${selectedPay === 'icash' ? 'border-[#4CAF50] bg-green-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">限時活動</div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'icash' ? 'bg-[#1CA2D8]' : 'bg-slate-200'}`}>
                  <CreditCard className={`h-5 w-5 ${selectedPay === 'icash' ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-slate-800">icash Pay (授權圈存)</p>
                  <p className="text-xs text-slate-500 mt-0.5">餘額 $840</p>
                </div>
                {selectedPay === 'icash' && <div className="h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
              </button>

              <button onClick={() => setSelectedPay('op')} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${selectedPay === 'op' ? 'border-[#4CAF50] bg-green-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${selectedPay === 'op' ? 'bg-[#F26722]' : 'bg-slate-200'}`}>
                  <CreditCard className={`h-5 w-5 ${selectedPay === 'op' ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-slate-800">OPEN POINT 全額扣抵</p>
                  <p className="text-xs text-slate-500 mt-0.5">可用點數：1,250 點</p>
                </div>
                {selectedPay === 'op' && <div className="h-6 w-6 rounded-full bg-[#4CAF50] flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-white" /></div>}
              </button>
            </div>

            <div className="mt-auto pt-4">
              <Button onClick={handlePayment} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-7 rounded-xl text-xl shadow-lg active:scale-95 transition-transform">
                確認授權圈存 ({selectedPay === 'op' ? `${totalFoodPrice} 點` : `$${totalFoodPrice}`})
              </Button>
            </div>
          </div>
        )}

        {view === 'status' && (
          <div className="p-4 pb-32 animate-in fade-in duration-500">
            {role === 'host' ? (
              <div className="text-center mb-6 mt-2">
                <h2 className="text-xl font-black text-slate-800">等待團員付款中...</h2><p className="text-sm text-slate-500 mt-1">若有人未付款，您可踢除或幫他代墊</p>
              </div>
            ) : (
              <div className="text-center mb-6 mt-2">
                <h2 className="text-xl font-black text-slate-800">您已完成付款！</h2><p className="text-sm text-slate-500 mt-1">請等待主揪送出訂單</p>
              </div>
            )}

            <div className="flex justify-between items-end mb-3 px-1">
              <h3 className="font-bold text-slate-800">團員付款狀態 ({members.filter(m=>m.isPaid).length}/{members.length})</h3>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">目前外送費: ${feePerPerson} / 人</span>
            </div>

            <div className="space-y-3 mb-8">
              {members.map(m => (
                <div key={m.id} className={`bg-white p-4 rounded-2xl shadow-sm border transition-all duration-300 ${m.isPaid ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"><User className="h-5 w-5 text-slate-500" /></div>
                        <div className={`absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${m.isPaid ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-sm flex items-center">{m.name} {m.isHost && <Crown className="h-3 w-3 text-[#F26722] ml-1" />}</span>
                        <span className={`text-xs font-bold ${m.isPaid ? 'text-green-600' : 'text-red-500'}`}>{m.statusText}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">${m.amount + feePerPerson}</p><p className="text-[10px] text-slate-400">含外送費 ${feePerPerson}</p>
                    </div>
                  </div>
                  {role === 'host' && !m.isPaid && !m.isHost && (
                    <div className="flex gap-2 border-t border-slate-100 pt-3 mt-1">
                      <Button size="sm" variant="outline" onClick={() => handleKick(m.id)} className="flex-1 h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"><UserMinus className="h-3 w-3 mr-1" /> 踢除</Button>
                      <Button size="sm" onClick={() => handleCover(m.id)} className="flex-1 h-8 text-xs bg-slate-800 text-white hover:bg-slate-700 font-bold">幫他代墊</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              {role === 'host' ? (
                <>
                  {!allPaid && <Button onClick={handleSimulateAllPaid} variant="outline" className="w-full mb-3 border-[#4CAF50] text-[#4CAF50] font-bold hover:bg-green-50">展示按鈕：模擬所有人已付款</Button>}
                  {/* ★ 這裡跳轉到 address 設定地址頁面，並觸發 GPS 定位 */}
                  <Button onClick={() => { setView('address'); handleLocateAddress(); }} disabled={!allPaid} className={`w-full font-bold py-6 rounded-xl text-lg transition-all ${!allPaid ? 'bg-slate-200 text-slate-400' : 'bg-[#4CAF50] hover:bg-green-600 text-white shadow-lg shadow-green-500/30'}`}>全員確認完畢，選擇外送地址</Button>
                </>
              ) : (
                <Button onClick={() => setView('success')} variant="outline" className="w-full border-slate-300 text-slate-600 font-bold hover:bg-slate-50">展示按鈕：模擬主揪送出訂單</Button>
              )}
            </div>
          </div>
        )}

        {/* ★ 設定外送地址 */}
        {view === 'address' && (
          <div className="p-4 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col pb-20">
            <h2 className="text-sm font-bold text-slate-700 mb-3 px-1 mt-2">請設定外送地址</h2>
            
            {/* GPS 地圖定位區塊 */}
            <div className="w-full h-[250px] bg-[#E8F0FE] rounded-2xl border-2 border-slate-200 relative overflow-hidden mb-4 shadow-inner shrink-0">
                {isLocatingAddress ? (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                        <Loader2 className="h-8 w-8 text-[#4CAF50] animate-spin mb-2" />
                        <p className="font-bold text-slate-700 text-sm">正在獲取精確 GPS 定位...</p>
                    </div>
                ) : addressError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50">
                        <MapPin className="h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-red-500 font-bold text-sm mb-1">{addressError}</p>
                        <Button variant="outline" size="sm" onClick={handleLocateAddress} className="mt-2 text-[#4CAF50] border-[#4CAF50]">重新定位</Button>
                    </div>
                ) : (
                    <div className="w-full h-full overflow-auto touch-pan-x touch-pan-y cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="w-[600px] h-[600px] relative" style={{ backgroundImage: 'radial-gradient(#4CAF50 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
                            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                                <div className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg mb-1 whitespace-nowrap relative">
                                    預設外送至此地點
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                </div>
                                <div className="h-6 w-6 bg-red-500 rounded-full border-4 border-white shadow-lg animate-bounce flex items-center justify-center">
                                    <div className="h-2 w-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {!isLocatingAddress && !addressError && (
                    <div className="absolute bottom-3 right-3 z-20">
                        <button onClick={handleLocateAddress} className="h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-[#4CAF50] active:scale-95 transition-transform">
                            <MapPin className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* 輸入框 */}
            <div className="mb-4">
                <Input 
                  value={deliveryAddress} 
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="請輸入詳細地址 (例: 台科大一餐)" 
                  className="h-12 font-bold text-slate-800 focus-visible:ring-[#4CAF50]"
                />
            </div>

            {/* 預設地點 */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {[
                { id: 'a1', name: '台科大 第一教學大樓', detail: '1F 大廳' },
                { id: 'a2', name: '台科大 第三學生宿舍', detail: '大門口交誼廳' },
                { id: 'a3', name: '台科大 研揚大樓', detail: '1F 側門' }
              ].map(addr => (
                <button 
                  key={addr.id} 
                  onClick={() => setDeliveryAddress(addr.name)} 
                  className={`w-full bg-white p-4 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-95 shadow-sm ${deliveryAddress === addr.name ? 'border-[#4CAF50] bg-green-50' : 'border-slate-200 hover:border-green-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`p-2.5 rounded-full mr-3 ${deliveryAddress === addr.name ? 'bg-[#4CAF50] text-white' : 'bg-green-50 text-[#4CAF50]'}`}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-800 text-sm">{addr.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{addr.detail}</p>
                    </div>
                  </div>
                  {deliveryAddress === addr.name && <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-4 pb-2 shrink-0 border-t border-slate-100">
              <Button onClick={() => setView('success')} disabled={!deliveryAddress} className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg disabled:opacity-50">
                確認地址，送出訂單
              </Button>
            </div>
          </div>
        )}

        {view === 'success' && (
          <div className="p-6 flex flex-col items-center justify-start h-full animate-in zoom-in-95 duration-500 overflow-y-auto pb-20">
            <div className="mb-6 mt-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner"><CheckCircle2 className="h-12 w-12 text-[#4CAF50]" /></div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">揪團訂單已送出！</h2>
            <p className="text-slate-500 text-center mb-8 font-medium">預計於 <span className="text-green-600 font-bold">12:30</span> 送達<br/><span className="font-bold text-slate-800 mt-1 block">{deliveryAddress || '台科大'}</span></p>

            <div className="w-full bg-white rounded-3xl p-5 shadow-xl border border-slate-100 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">商業防禦機制</div>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-red-500" /><h3 className="font-bold text-slate-800">意外防堵與退款</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-red-600 mb-1 flex items-center"><X className="h-3 w-3 mr-1"/> 餐廳拒單</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">若 foodomo 回報訂單失效，系統將呼叫 icash Pay API <strong className="text-slate-700">自動解除全員資金圈存</strong>，並發送 APP 通知。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-orange-600 mb-1 flex items-center"><Clock className="h-3 w-3 mr-1"/> 逾時未送出</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pl-4 border-l-2 border-slate-100">若房間超過 20 分鐘未送出訂單，背景排程將<strong className="text-slate-700">強制關閉房間</strong>並自動退還所有已付款團員之款項。</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setActiveScreen('home')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              回首頁
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// OP Fast-Pass (動態掃描與結帳碼)
// ==========================================
