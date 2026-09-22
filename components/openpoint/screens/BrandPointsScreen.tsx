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

export function BrandPointsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <BackButton onClick={onBack} />
        <h1 className="text-lg font-bold text-slate-800">品牌專用點</h1>
        <div className="w-16" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Star className="h-16 w-16 text-slate-300 mb-4" />
        <p className="text-slate-500 font-bold">目前無可用的品牌專用點</p>
      </div>
    </div>
  )
}

