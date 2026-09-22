"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, Camera, Loader2, Users, User,
  CheckCircle, QrCode, Smartphone, Info, Share2, AlertTriangle, Receipt, CreditCard, Link,
  RefreshCw, Check, Plus
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { BackButton } from "../common/BackButton"

type SplitBillState = 
  | 'upload' 
  | 'scanning' 
  | 'mode_select'
  | 'host_assign'
  | 'confirm'
  | 'success'
  | 'host_pick_shared'
  | 'share_link'
  | 'claim_room'
  | 'payment'

const MOCK_ITEMS = [
  { id: '1', name: '番茄肉醬義大利麵', price: 180 },
  { id: '2', name: '青醬海鮮燉飯', price: 220 },
  { id: '3', name: '松露薯條', price: 120 },
  { id: '4', name: '冰拿鐵', price: 80 },
  { id: '5', name: '熱伯爵茶', price: 60 },
  { id: '6', name: '10% 服務費', price: 66 },
]

const MOCK_OTHERS = ['小智', '大頭', '阿美']

export function SplitBillScreen({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<SplitBillState>('upload')
  
  // Flow A state
  const [people, setPeople] = useState<{id: string, name: string}[]>([{ id: 'p1', name: '我 (房主)' }, { id: 'p2', name: '小智' }])
  const [newPersonName, setNewPersonName] = useState('')
  const [assignments, setAssignments] = useState<Record<string, string>>({}) // itemId -> personId | 'shared'
  const [selectedItemForAssign, setSelectedItemForAssign] = useState<string | null>(null)

  // Flow B state
  const [sharedItems, setSharedItems] = useState<string[]>([]) // array of itemIds
  const [claimedItems, setClaimedItems] = useState<Record<string, string>>({}) // itemId -> userId (mock users)
  const [isSimulating, setIsSimulating] = useState(false)
  
  // For Flow B Claim Room
  const currentUser = 'p1' // me (host)
  
  const handleInternalBack = () => {
    setIsSimulating(false)
    if (view === 'scanning') setView('upload')
    else if (view === 'mode_select') setView('upload')
    else if (view === 'host_assign') setView('mode_select')
    else if (view === 'confirm') setView('host_assign')
    else if (view === 'host_pick_shared') setView('mode_select')
    else if (view === 'share_link') setView('host_pick_shared')
    else if (view === 'claim_room') setView('share_link')
    else if (view === 'payment') setView('claim_room')
    else if (view === 'success') onBack()
    else onBack()
  }

  const handleScan = () => {
    setView('scanning')
    setTimeout(() => {
      setView('mode_select')
    }, 2000)
  }

  // Flow A Logic
  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      setPeople([...people, { id: `p${Date.now()}`, name: newPersonName.trim() }])
      setNewPersonName('')
    }
  }

  const assignItem = (itemId: string, personId: string) => {
    setAssignments(prev => ({ ...prev, [itemId]: personId }))
    setSelectedItemForAssign(null)
  }

  const allAssigned = MOCK_ITEMS.every(item => assignments[item.id])

  // Flow B Logic
  const toggleSharedItem = (id: string) => {
    setSharedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const claimItem = (itemId: string) => {
    setClaimedItems(prev => {
      if (prev[itemId] === currentUser) {
        const next = { ...prev }
        delete next[itemId]
        return next
      }
      return { ...prev, [itemId]: currentUser }
    })
  }
  
  const unassignedFlowBItems = MOCK_ITEMS.filter(item => !sharedItems.includes(item.id) && !claimedItems[item.id])
  const flowBAllClaimed = unassignedFlowBItems.length === 0
  const hasClaimedAnything = Object.values(claimedItems).includes(currentUser) || sharedItems.length > 0

  // Real-time Simulation Logic
  useEffect(() => {
    if (!isSimulating) return
    if (flowBAllClaimed) {
      setIsSimulating(false)
      return
    }

    const timer = setTimeout(() => {
      if (unassignedFlowBItems.length > 0) {
        const randomItem = unassignedFlowBItems[Math.floor(Math.random() * unassignedFlowBItems.length)]
        const randomUser = MOCK_OTHERS[Math.floor(Math.random() * MOCK_OTHERS.length)]
        setClaimedItems(prev => ({ ...prev, [randomItem.id]: randomUser }))
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [isSimulating, flowBAllClaimed, unassignedFlowBItems])

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Fixed Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between shrink-0 shadow-sm z-10">
        <BackButton onClick={handleInternalBack} />
        <h1 className="text-lg font-bold text-slate-800">
          {view === 'upload' || view === 'scanning' ? 'AI 收據分帳' : 
           view === 'mode_select' ? '選擇分帳模式' : 
           view === 'host_assign' ? '分配品項' :
           view === 'host_pick_shared' ? '選擇平分項目' :
           view === 'share_link' ? '邀請好友' :
           view === 'claim_room' ? '認領大廳' :
           '確認與結算'}
        </h1>
        <div className="w-16"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        
        {/* State: upload */}
        {view === 'upload' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <Receipt className="h-12 w-12 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">AI 智慧分帳</h2>
            <p className="text-slate-500 text-sm mb-10 text-center px-4">拍下收據或發票，AI 自動辨識品項金額，輕鬆完成拆帳轉帳！</p>
            
            <div className="w-full space-y-4">
              <button onClick={handleScan} className="w-full bg-indigo-500 text-white rounded-2xl p-5 flex items-center justify-center gap-3 shadow-md hover:bg-indigo-600 transition-all active:scale-95">
                <Camera className="h-6 w-6" />
                <span className="font-bold text-lg">拍照掃描</span>
              </button>
              <button onClick={handleScan} className="w-full bg-white border-2 border-indigo-100 text-indigo-500 rounded-2xl p-5 flex items-center justify-center gap-3 shadow-sm hover:bg-indigo-50 transition-all active:scale-95">
                <Upload className="h-6 w-6" />
                <span className="font-bold text-lg">從相簿選擇</span>
              </button>
            </div>
          </div>
        )}

        {/* State: scanning */}
        {view === 'scanning' && (
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative mb-6">
              <Receipt className="h-20 w-20 text-slate-300" />
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.6)] animate-[scan_1.5s_ease-in-out_infinite]" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">AI 辨識中...</h2>
            <p className="text-sm text-slate-500">正在萃取品項與金額資料</p>
          </div>
        )}

        {/* State: mode_select */}
        {view === 'mode_select' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center animate-in slide-in-from-right-4 duration-300">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">辨識成功！</h2>
              <p className="text-sm text-slate-500">共掃描出 {MOCK_ITEMS.length} 個品項，總金額 ${MOCK_ITEMS.reduce((sum, item) => sum + item.price, 0)}</p>
            </div>

            <h3 className="font-bold text-slate-700 mb-4 text-center">請選擇分帳模式</h3>
            <div className="space-y-4 w-full">
              <button onClick={() => setView('host_assign')} className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 group shadow-sm text-left">
                <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 shrink-0 transition-colors">
                  <User className="h-7 w-7 text-slate-600 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700 mb-1">模式 A：房主統一分配</h3>
                  <p className="text-xs text-slate-500">由您負責勾選誰吃了什麼，最後一次發送收款。<br/>(適合朋友沒有下載 App 或不方便手機操作時)</p>
                </div>
              </button>

              <button onClick={() => setView('host_pick_shared')} className="w-full bg-white border-2 border-indigo-500 rounded-3xl p-6 flex items-center gap-4 bg-gradient-to-b from-indigo-50 to-white hover:from-indigo-100 hover:to-indigo-50 transition-all active:scale-95 group shadow-md text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">大家自己選</div>
                <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 shrink-0 transition-colors">
                  <Users className="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigo-800 mb-1">模式 B：邀請大家一起來</h3>
                  <p className="text-xs text-slate-500">發送連結，讓大家自己進來點選認領。<br/>您只需先挑出「要平分」的項目！</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* State: host_assign (Flow A) */}
        {view === 'host_assign' && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-1 snap-x [&::-webkit-scrollbar]:hidden">
                {people.map(p => (
                  <div key={p.id} className="snap-start shrink-0 bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center shadow-sm">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <User className="h-3 w-3 text-slate-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{p.name}</span>
                  </div>
                ))}
                <div className="snap-start shrink-0 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 flex items-center shadow-sm">
                  <Input 
                    value={newPersonName} 
                    onChange={e => setNewPersonName(e.target.value)} 
                    placeholder="新增成員..." 
                    className="h-7 w-20 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 placeholder:text-indigo-300 text-indigo-700 font-bold"
                    onKeyDown={e => e.key === 'Enter' && handleAddPerson()}
                  />
                  <button onClick={handleAddPerson} className="ml-1 text-indigo-500"><Plus className="h-4 w-4" /></button>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-500 mb-3 px-1">點擊品項分配給成員或設為大家平分</h2>
                <div className="space-y-3">
                  {MOCK_ITEMS.map(item => {
                    const assignedPerson = people.find(p => p.id === assignments[item.id])
                    const isShared = assignments[item.id] === 'shared'
                    
                    return (
                      <div key={item.id}>
                        <div 
                          onClick={() => setSelectedItemForAssign(selectedItemForAssign === item.id ? null : item.id)}
                          className={`w-full bg-white p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all shadow-sm ${isShared ? 'border-orange-400 bg-orange-50/30' : assignments[item.id] ? 'border-green-500' : selectedItemForAssign === item.id ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                          <div>
                            <h3 className={`font-bold ${isShared ? 'text-orange-800' : 'text-slate-800'}`}>{item.name}</h3>
                            <p className="text-slate-500 text-sm">${item.price}</p>
                          </div>
                          <div>
                            {isShared ? (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">👥 大家平分</Badge>
                            ) : assignedPerson ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">{assignedPerson.name}</Badge>
                            ) : (
                              <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-50">未分配</Badge>
                            )}
                          </div>
                        </div>
                        
                        {selectedItemForAssign === item.id && (
                          <div className="bg-slate-50 p-3 rounded-b-xl border-x-2 border-b-2 border-indigo-400 -mt-2 pt-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2">
                            {people.map(p => (
                              <button key={p.id} onClick={() => assignItem(item.id, p.id)} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                🙋 {p.name}
                              </button>
                            ))}
                            <button onClick={() => assignItem(item.id, 'shared')} className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg text-sm font-bold text-orange-700 hover:bg-orange-100 transition-colors">
                              👥 大家平分
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-20">
              {!allAssigned && (
                 <div className="bg-amber-50 text-amber-700 text-xs font-bold p-2 mb-3 rounded-lg flex items-center justify-center border border-amber-200">
                   <AlertTriangle className="h-4 w-4 mr-1.5" /> 還有未分配的項目！請確保全部分配完畢。
                 </div>
              )}
              <Button onClick={() => setView('confirm')} disabled={!allAssigned} className={`w-full font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg ${allAssigned ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                下一步：確認金額
              </Button>
            </div>
          </div>
        )}

        {/* State: confirm (Flow A) */}
        {view === 'confirm' && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <h2 className="text-xl font-black text-slate-800 mb-2">確認分帳明細</h2>
              
              {/* Calculate Shared Item Cost */}
              {(() => {
                const sharedFlowAItems = MOCK_ITEMS.filter(item => assignments[item.id] === 'shared')
                const sharedTotal = sharedFlowAItems.reduce((sum, item) => sum + item.price, 0)
                const sharedPerPerson = sharedTotal > 0 ? Math.round(sharedTotal / people.length) : 0

                return (
                  <div className="space-y-4">
                    {sharedFlowAItems.length > 0 && (
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="text-xs font-bold text-orange-800 mb-2 flex items-center justify-between">
                          👥 公費平分項目 ({people.length}人平分)
                        </h4>
                        {sharedFlowAItems.map(i => (
                          <div key={i.id} className="flex justify-between text-sm text-orange-700 mt-1"><span>{i.name}</span><span>${i.price}</span></div>
                        ))}
                        <div className="mt-3 pt-3 border-t border-orange-200 flex justify-between font-bold text-orange-900">
                          <span>每人分攤</span>
                          <span>+${sharedPerPerson}</span>
                        </div>
                      </div>
                    )}

                    {people.map(p => {
                      const pItems = MOCK_ITEMS.filter(item => assignments[item.id] === p.id)
                      const pTotal = pItems.reduce((sum, item) => sum + item.price, 0)
                      const finalTotal = pTotal + sharedPerPerson
                      
                      return (
                        <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-2"><User className="h-4 w-4 text-slate-600" /></div>
                              <span className="font-bold text-slate-800 text-lg">{p.name}</span>
                            </div>
                            <span className="font-black text-indigo-600 text-xl">${finalTotal}</span>
                          </div>
                          {pItems.length > 0 && (
                            <div className="text-sm text-slate-500 pl-10 border-l-2 border-slate-100 ml-4 py-1">
                              {pItems.map(item => (
                                <div key={item.id} className="flex justify-between text-xs"><span>{item.name}</span><span>${item.price}</span></div>
                              ))}
                            </div>
                          )}
                          {sharedPerPerson > 0 && (
                            <div className="text-sm text-orange-500 pl-10 mt-1 border-l-2 border-orange-100 ml-4 py-1 text-xs flex justify-between">
                              <span>大家平分項目分攤</span><span>+${sharedPerPerson}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </div>
            
            <div className="p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-20">
              <Button onClick={() => setView('success')} className="w-full bg-[#1CA2D8] hover:bg-[#158bba] text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg flex items-center justify-center">
                <CreditCard className="mr-2 h-5 w-5" /> 發送 icash Pay 收款通知
              </Button>
            </div>
          </div>
        )}

        {/* State: success */}
        {view === 'success' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">處理完成！</h2>
            <p className="text-slate-500 text-center mb-8">大家將會收到推播與收款連結，點擊即可用 icash Pay 轉帳給您。</p>
            <Button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              完成並返回
            </Button>
          </div>
        )}

        {/* State: host_pick_shared (Flow B) */}
        {view === 'host_pick_shared' && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start shadow-sm">
                <Info className="h-5 w-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-800 font-medium">在邀請大家前，請先勾選哪些項目是**「公費支付」**或**「大家平分」**的（例如：服務費、共用的小菜）。</p>
              </div>
              
              <div className="space-y-3">
                {MOCK_ITEMS.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => toggleSharedItem(item.id)}
                    className={`w-full bg-white p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all shadow-sm ${sharedItems.includes(item.id) ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div>
                      <h3 className={`font-bold ${sharedItems.includes(item.id) ? 'text-indigo-800' : 'text-slate-800'}`}>{item.name}</h3>
                      <p className="text-slate-500 text-sm">${item.price}</p>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${sharedItems.includes(item.id) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'}`}>
                      {sharedItems.includes(item.id) && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-20">
              <Button onClick={() => setView('share_link')} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg">
                下一步，產生邀請連結
              </Button>
            </div>
          </div>
        )}

        {/* State: share_link (Flow B) */}
        {view === 'share_link' && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-6 mt-4">邀請大家來認領</h2>
            <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 mb-8 w-full max-w-[280px] flex flex-col items-center">
              <QrCode className="h-40 w-40 text-slate-900 mb-4" />
              <p className="text-xs text-slate-400 font-bold tracking-widest bg-slate-100 px-4 py-1.5 rounded-full">ROOM: 883921</p>
            </div>
            
            <div className="flex gap-4 w-full mb-8">
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-300 text-slate-700 font-bold shadow-sm">
                <Link className="h-4 w-4 mr-2" /> 複製連結
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-green-500 text-green-600 hover:bg-green-50 font-bold shadow-sm">
                <Share2 className="h-4 w-4 mr-2" /> LINE 分享
              </Button>
            </div>

            <Button onClick={() => setView('claim_room')} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-2xl shadow-md active:scale-95 transition-all text-lg">
              我也要進去選我的
            </Button>
          </div>
        )}

        {/* State: claim_room (Flow B) */}
        {view === 'claim_room' && (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Simulation Toggle for Demo Purposes */}
              <div className="bg-indigo-600 rounded-xl p-4 shadow-lg text-white flex flex-col items-center text-center">
                <h3 className="font-bold mb-1 flex items-center"><Smartphone className="h-5 w-5 mr-2" /> 展示 Demo 用工具</h3>
                <p className="text-xs text-indigo-200 mb-3">點擊下方按鈕，模擬其他朋友正在他們的手機上點選品項的情境</p>
                <Button 
                  onClick={startSimulation} 
                  disabled={isSimulating || flowBAllClaimed}
                  variant="secondary" 
                  className="w-full font-bold bg-white text-indigo-600 hover:bg-indigo-50"
                >
                  {isSimulating ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> 模擬即時連線中...</>
                  ) : flowBAllClaimed ? (
                    <><CheckCircle className="h-4 w-4 mr-2" /> 模擬完畢</>
                  ) : (
                    <><RefreshCw className="h-4 w-4 mr-2" /> 🔄 模擬親友即時連線認領</>
                  )}
                </Button>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-500 mb-2">大家平分項目 (已自動分攤)</h2>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 shadow-sm flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {sharedItems.map(id => {
                    const item = MOCK_ITEMS.find(i => i.id === id)
                    return (
                      <Badge key={id} variant="outline" className="bg-white text-orange-700 border-orange-200 shrink-0 py-1">{item?.name} (${item?.price})</Badge>
                    )
                  })}
                  {sharedItems.length === 0 && <span className="text-xs text-slate-400">無平分項目</span>}
                </div>
              </div>

              <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span>點擊認領你吃的品項</span>
                {flowBAllClaimed && <Badge className="bg-green-500 hover:bg-green-500">已全數認領完畢</Badge>}
              </h2>
              
              <div className="space-y-3">
                {MOCK_ITEMS.filter(i => !sharedItems.includes(i.id)).map(item => {
                  const isMine = claimedItems[item.id] === currentUser
                  const isOthers = claimedItems[item.id] && claimedItems[item.id] !== currentUser
                  
                  return (
                    <div 
                      key={item.id}
                      onClick={() => { if (!isOthers) claimItem(item.id) }}
                      className={`w-full bg-white p-4 rounded-xl border-2 flex items-center justify-between transition-all shadow-sm 
                        ${isMine ? 'border-indigo-500 bg-indigo-50/30' : isOthers ? 'border-slate-100 opacity-60 grayscale' : 'border-slate-200 cursor-pointer hover:border-slate-300'}
                        ${isOthers && isSimulating ? 'animate-in zoom-in duration-500' : ''}`}
                    >
                      <div>
                        <h3 className={`font-bold ${isMine ? 'text-indigo-800' : 'text-slate-800'}`}>{item.name}</h3>
                        <p className="text-slate-500 text-sm">${item.price}</p>
                      </div>
                      <div>
                        {isMine ? (
                          <Badge className="bg-indigo-500">我的</Badge>
                        ) : isOthers ? (
                          <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-50 shadow-sm">{claimedItems[item.id]} 已領</Badge> 
                        ) : (
                          <Badge variant="outline" className="text-slate-400 border-slate-300 bg-slate-50">未認領</Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-20">
              {!flowBAllClaimed && (
                 <div className="bg-amber-50 text-amber-700 text-xs font-bold p-2 mb-3 rounded-lg flex items-center justify-center border border-amber-200">
                   <AlertTriangle className="h-4 w-4 mr-1.5" /> 還有 {unassignedFlowBItems.length} 個品項未被認領！您仍可先結算自己的部分。
                 </div>
              )}
              <Button onClick={() => setView('payment')} disabled={!hasClaimedAnything} className={`w-full font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg ${hasClaimedAnything ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                確認結算我的帳單
              </Button>
            </div>
          </div>
        )}

        {/* State: payment (Flow B Final) */}
        {view === 'payment' && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <h2 className="text-xl font-black text-slate-800 mb-6">我的結算明細</h2>
              
              {(() => {
                const myItems = MOCK_ITEMS.filter(i => claimedItems[i.id] === currentUser)
                const myTotal = myItems.reduce((sum, i) => sum + i.price, 0)
                
                const sharedFlowBItems = MOCK_ITEMS.filter(i => sharedItems.includes(i.id))
                const sharedTotal = sharedFlowBItems.reduce((sum, i) => sum + i.price, 0)
                // In demo, we assume 4 people total for Flow B split
                const numPeople = 4 
                const sharedPerPerson = sharedTotal > 0 ? Math.round(sharedTotal / numPeople) : 0

                const finalTotal = myTotal + sharedPerPerson

                return (
                  <>
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-6">
                      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                        <span className="font-bold text-indigo-800">應付總額</span>
                        <span className="text-3xl font-black text-indigo-600">${finalTotal}</span>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 mb-2">我的個人餐點</h4>
                          {myItems.map(i => (
                            <div key={i.id} className="flex justify-between text-sm font-bold text-slate-700 mt-1"><span>{i.name}</span><span>${i.price}</span></div>
                          ))}
                          {myItems.length === 0 && <div className="text-sm text-slate-400">無</div>}
                        </div>
                        
                        {sharedPerPerson > 0 && (
                          <>
                            <div className="h-px bg-slate-100 w-full"></div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">公費平分項目 ({numPeople}人平分) <span className="text-slate-500">+${sharedPerPerson}</span></h4>
                              {sharedFlowBItems.map(i => (
                                <div key={i.id} className="flex justify-between text-sm text-slate-500 mt-1"><span>{i.name} (${i.price})</span></div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 flex items-center shadow-sm">
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-3 shrink-0 text-[#F26722] font-black">OP</div>
                      <div className="flex-1">
                        <p className="font-bold text-orange-900 text-sm mb-0.5">使用 OP 點數折抵</p>
                        <p className="text-xs text-orange-700">可用 50 點，折抵後只需付 ${Math.max(0, finalTotal - 50)}</p>
                      </div>
                      <div className="h-6 w-6 rounded-full border-2 border-[#F26722] bg-[#F26722] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
            
            <div className="p-4 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] shrink-0 z-20">
              <Button onClick={() => setView('success')} className="w-full bg-[#1CA2D8] hover:bg-[#158bba] text-white font-bold py-6 rounded-2xl shadow-lg active:scale-95 transition-all text-lg flex items-center justify-center">
                <CreditCard className="mr-2 h-5 w-5" /> 使用 icash Pay 轉帳給房主
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
