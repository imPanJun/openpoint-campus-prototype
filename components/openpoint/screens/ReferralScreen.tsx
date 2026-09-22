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

export function ReferralScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 border-b bg-white shadow-sm flex items-center">
        <BackButton onClick={onBack} />
        <h1 className="w-full pr-8 text-lg font-bold text-center text-slate-800">老拉新送泡麵</h1>
      </div>
      <div className="flex-1 p-4 flex flex-col items-center justify-center overflow-auto pb-20">
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mb-8">
          <QrCode className="h-40 w-40 text-slate-800" />
        </div>
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-600">目前進度</span>
            <span className="text-sm font-black text-[#F26722]">1 / 3 已邀請</span>
          </div>
          <Progress value={33} className="h-2.5 bg-slate-200 [&>div]:bg-[#F26722]" />
        </div>
        <Button onClick={handleCopy} className={`w-full mt-8 font-bold py-6 rounded-2xl text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-[#F26722] text-white'}`}>
          {copied ? "已複製連結！" : "複製專屬邀請連結"}
        </Button>
      </div>
    </div>
  )
}

// ==========================================
// 全部功能 (All Features Menu)
// ==========================================
