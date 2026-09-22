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

export function OPPointsScreen({ onBack }: { onBack: () => void }) {
  const quickActions = [
    { icon: Send, label: "點數轉贈" },
    { icon: History, label: "點數紀錄" },
    { icon: Heart, label: "愛心捐點" },
  ]
  const exchangeItems = [
    { id: 1, name: "所長茶葉蛋 1 顆", points: 10 },
    { id: 2, name: "統一布丁 (小)", points: 15 },
    { id: 3, name: "CITY CAFE 中杯美式", points: 35 },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">我的 OPENPOINT</h1>
        <div className="w-10" />
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-auto pb-24">
        <Card className="border-0 bg-gradient-to-br from-amber-400 via-orange-500 to-[#F26722] shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-white/90 text-sm mb-1 font-medium">可用點數</p>
            <p className="text-5xl font-black text-white mb-2 tracking-tight">1,250</p>
            <p className="text-white/80 text-xs">年底將到期：50 點</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button key={index} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition-all active:scale-95">
                <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[#F26722]" />
                </div>
                <span className="text-xs font-bold text-slate-700">{action.label}</span>
              </button>
            )
          })}
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 mt-2">校園熱門兌換</h2>
          <div className="space-y-2">
            {exchangeItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm bg-white">
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-sm">{item.name}</span>
                  <Button size="sm" className="bg-[#F26722] hover:bg-orange-600 text-white text-xs font-bold shadow-sm">
                    {item.points} 點兌換
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 老拉新送泡麵 (Referral)
// ==========================================
