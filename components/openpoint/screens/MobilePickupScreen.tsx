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

export function MobilePickupScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("cafe")
  const [cartCount, setCartCount] = useState(2)
  const tabs = [
    { id: "all", label: "全部" },
    { id: "cafe", label: "CITY CAFE" },
    { id: "tea", label: "現萃茶" },
    { id: "snack", label: "零食泡麵" },
  ]
  const products = [
    { id: 1, name: "CITY CAFE 大杯冰美式 10 杯", price: 450, originalPrice: 600, discount: "半價", image: "coffee" },
    { id: 2, name: "抹茶拿鐵 5 杯組合", price: 275, originalPrice: 400, discount: "67折", image: "matcha" },
    { id: 3, name: "茶葉蛋 10 顆優惠組", price: 80, originalPrice: 100, discount: "8折", image: "egg" },
  ]
  const addToCart = () => setCartCount(prev => prev + 1)
  
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">行動隨時取</h1>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><Receipt className="h-5 w-5" /></button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><TicketCheck className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[#4CAF50] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto pb-24 px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-slate-100 flex items-center justify-center">
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs">{product.discount}</Badge>
                  <Coffee className="h-12 w-12 text-slate-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-500 font-bold">${product.price}</span>
                      <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                    </div>
                    <button onClick={addToCart} className="h-7 w-7 rounded-full bg-[#F26722] flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-24 right-6 max-w-[400px]">
        <button className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#4CAF50] text-white shadow-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">{cartCount}</span>}
        </button>
      </div>
    </div>
  )
}

// ==========================================
// 小7集點卡
// ==========================================
