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

export function SevenPointsScreen({ onBack }: { onBack: () => void }) {
  const campaigns = [
    { id: 1, title: "哈利波特 25 周年集點活動", period: "2026/02/25 ~ 2026/05/04", points: 5, hasPoints: true },
    { id: 2, title: "安心取件帳單繳費集點GO", period: "2026/03/18 ~ 2026/05/26", hasPoints: false },
  ]
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">小7集點卡</h1>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><History className="h-5 w-5" /></button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><Ticket className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-auto pb-32">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-semibold text-slate-800 text-sm">{campaign.title}</h3>
                </div>
                <p className="text-xs text-slate-500">{campaign.period}</p>
              </div>
              {campaign.hasPoints ? (
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-50 text-red-600 border border-red-200 font-bold px-2 py-1">點 x {campaign.points}</Badge>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="text-xs text-slate-500 border-slate-200 hover:bg-slate-50">開始集點</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ==========================================
// i珍食雷達
// ==========================================
