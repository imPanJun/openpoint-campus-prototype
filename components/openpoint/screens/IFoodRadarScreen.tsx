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

export function IFoodRadarScreen({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const filters = [
    { id: "all", label: "全部" },
    { id: "bento", label: "便當麵食" },
    { id: "onigiri", label: "飯糰手卷" },
    { id: "dessert", label: "甜點飲料" },
  ]
  const stores = [
    { id: 1, name: "台科大一餐門市", distance: "50m", items: [{ name: "奮起湖軟排便當", stock: 2, price: 58, originalPrice: 89 }, { name: "鮪魚明太子飯糰", stock: 5, price: 25, originalPrice: 39 }] },
    { id: 2, name: "台科大第三宿舍門市", distance: "200m", items: [{ name: "北海道生乳捲", stock: 3, price: 45, originalPrice: 69 }, { name: "真飽涼麵", stock: 4, price: 35, originalPrice: 55 }] }
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 border-b bg-gradient-to-r from-[#4CAF50] to-green-600 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-1 text-white/90 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" /><span className="text-sm">返回</span>
        </button>
        <h1 className="mt-2 text-lg font-bold text-center text-white">校園 i珍食雷達</h1>
      </div>
      <div className="mx-4 mt-3 rounded-xl bg-green-100 p-3 flex items-center justify-between border border-green-200">
        <span className="text-green-800 font-bold text-sm">65% OFF 珍食時段進行中</span>
        <div className="animate-pulse"><Clock className="h-5 w-5 text-green-600" /></div>
      </div>
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filters.map((filter) => (
            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeFilter === filter.id ? "bg-[#4CAF50] text-white" : "bg-white text-slate-500 border border-slate-200"}`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 pb-24 space-y-4 overflow-auto">
        {stores.map((store) => (
          <Card key={store.id} className="border-0 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">{store.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-[#F26722]" />
                  <span>距離 {store.distance}</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {store.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-green-600 font-black">${item.price}</span>
                        <span className="text-xs text-slate-400 line-through">${item.originalPrice}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`text-xs border-0 ${item.stock <= 2 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>剩 {item.stock} 份</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// 我的 OPENPOINT (點數頁面)
// ==========================================
