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

export function AllFeaturesScreen({ setActiveScreen, onBack }: { setActiveScreen: (s: ScreenType) => void, onBack: () => void }) {
  const features = [
    { icon: ShoppingBag, label: "foodomo", action: "foodomo", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: Utensils, label: "學餐支付", action: "campus_pay", color: "text-green-600", bg: "bg-green-50" },
    { icon: Zap, label: "Fast-Pass", action: "fast_pass_unlock", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Cloud, label: "雲端列印", action: "print", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Ticket, label: "兌換券", action: "coupons", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Salad, label: "i珍食雷達", action: "ifood_radar", color: "text-green-500", bg: "bg-green-50" },
    { icon: Receipt, label: "行動隨時取", action: "mobile_pickup", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: BatteryCharging, label: "行動電源", action: "home", color: "text-emerald-500", bg: "bg-emerald-50" },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">全部功能</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-auto">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <button key={i} onClick={() => setActiveScreen(f.action as ScreenType)} className="flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center shadow-sm active:scale-95 transition-transform`}><Icon className={`h-7 w-7 ${f.color}`} /></div>
              <span className="text-[11px] font-bold text-slate-700 text-center">{f.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// 通知中心 (Notifications)
// ==========================================
