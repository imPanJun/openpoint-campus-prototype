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

export function ServicesScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">服務中心</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 p-4 grid grid-cols-3 gap-4 content-start">
        {['繳費中心', '交貨便', '寄件/收件', '保險服務', '遊戲點數', '交通票券'].map((t, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100">
            <Box className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-600">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

