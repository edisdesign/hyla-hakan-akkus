import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X, LogOut, Settings, Inbox, Star, HelpCircle,
    Image as ImageIcon, Package, SlidersHorizontal,
    Plus, Trash2, Pencil, Save, CheckCircle, Clock, XCircle,
    Upload, ChevronDown, ChevronUp, Phone, Layout,
    BarChart2,
} from 'lucide-react';
import { supabase, Lead, Testimonial, FaqItem, GalleryImage, PricingConfig } from '@/app/lib/supabase';
import { useAdmin } from '@/app/context/AdminContext';
import { toast } from 'sonner';

type Tab = 'galerija' | 'faq' | 'leadovi' | 'recenzije' | 'ergebnisse' | 'cover' | 'proizvodi' | 'team' | 'podesavanja';

// ─── LEADOVI TAB ─────────────────────────────────────────────────────────────
function LeadoviTab() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        setLeads(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const updateStatus = async (id: number, status: Lead['status']) => {
        await supabase.from('leads').update({ status }).eq('id', id);
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        toast.success('Status ažuriran!');
    };

    const deleteLead = async (id: number) => {
        await supabase.from('leads').delete().eq('id', id);
        setLeads(prev => prev.filter(l => l.id !== id));
        toast.success('Upit obrisan!');
    };

    const statusBadge = (s: Lead['status']) => {
        if (s === 'new') return <span className="flex items-center gap-1 text-blue-500 text-[11px] font-bold"><Clock size={11} /> Neu</span>;
        if (s === 'contacted') return <span className="flex items-center gap-1 text-amber-500 text-[11px] font-bold"><CheckCircle size={11} /> Kontaktiert</span>;
        return <span className="flex items-center gap-1 text-gray-400 text-[11px] font-bold"><XCircle size={11} /> Abgeschlossen</span>;
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-blue-50">
                <div>
                    <p className="font-bold text-black text-[13px]">Kontaktanfragen</p>
                    <p className="text-gray-500 text-[11px]">Eingegangene Anfragen vom Kontaktformular</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Neue</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {leads.length === 0 && <p className="text-center text-gray-400 py-16 text-sm">Noch keine Anfragen.</p>}
                {leads.map(lead => (
                    <div key={lead.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${lead.status === 'new' ? 'border-l-2 border-blue-400' : ''}`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                                <p className="font-bold text-black text-[14px]">{lead.name}</p>
                                <p className="text-gray-400 text-[12px]">{lead.email} · {lead.phone}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">{statusBadge(lead.status)}</div>
                        </div>
                        {lead.message && <p className="text-gray-500 text-[13px] mb-3 leading-relaxed italic">"{lead.message}"</p>}
                        <div className="flex items-center gap-2 flex-wrap">
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-[11px] font-bold hover:bg-green-600 transition-colors">
                                <Phone size={11} /> Anrufen
                            </a>
                            {lead.status !== 'contacted' && (
                                <button onClick={() => updateStatus(lead.id, 'contacted')} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold hover:bg-amber-200 transition-colors cursor-pointer">
                                    Kontaktiert
                                </button>
                            )}
                            {lead.status !== 'closed' && (
                                <button onClick={() => updateStatus(lead.id, 'closed')} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold hover:bg-gray-200 transition-colors cursor-pointer">
                                    Abschließen
                                </button>
                            )}
                            <button onClick={() => deleteLead(lead.id)} className="px-3 py-1.5 bg-red-50 text-red-500 rounded-full text-[11px] font-bold hover:bg-red-100 transition-colors cursor-pointer ml-auto">
                                <Trash2 size={11} />
                            </button>
                        </div>
                        <p className="text-gray-300 text-[10px] mt-2">{new Date(lead.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── RECENZIJE TAB ───────────────────────────────────────────────────────────
function RecenzijeTab() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('testimonials').select('*').order('sort_order');
        setItems(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const save = async () => {
        if (!editing) return;
        if (editing.id) {
            await supabase.from('testimonials').update(editing).eq('id', editing.id);
        } else {
            const maxOrder = Math.max(0, ...items.map(i => i.sort_order));
            await supabase.from('testimonials').insert({ ...editing, sort_order: maxOrder + 1, active: true });
        }
        toast.success('Bewertung gespeichert!');
        setEditing(null);
        fetch();
    };

    const remove = async (id: number) => {
        await supabase.from('testimonials').delete().eq('id', id);
        setItems(prev => prev.filter(i => i.id !== id));
        toast.success('Bewertung gelöscht!');
    };

    const toggleActive = async (item: Testimonial) => {
        await supabase.from('testimonials').update({ active: !item.active }).eq('id', item.id);
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">{items.length} Bewertungen</p>
                <button onClick={() => setEditing({ name: '', text: '', rating: 5, location: '', image_url: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <Plus size={12} /> Neue Bewertung
                </button>
            </div>
            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-gray-100 bg-gray-50">
                        <div className="p-6 space-y-3">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4">{editing.id ? 'Bewertung bearbeiten' : 'Neue Bewertung'}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <input placeholder="Name" value={editing.name ?? ''} onChange={e => setEditing(p => ({ ...p!, name: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                <input placeholder="Ort (z.B. Frankfurt)" value={editing.location ?? ''} onChange={e => setEditing(p => ({ ...p!, location: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <textarea rows={3} placeholder="Bewertungstext..." value={editing.text ?? ''} onChange={e => setEditing(p => ({ ...p!, text: e.target.value }))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black resize-none" />
                            <div className="grid grid-cols-2 gap-3">
                                <select value={editing.rating ?? 5} onChange={e => setEditing(p => ({ ...p!, rating: Number(e.target.value) }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black cursor-pointer">
                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                                </select>
                                <input placeholder="Bild-URL (optional)" value={editing.image_url ?? ''} onChange={e => setEditing(p => ({ ...p!, image_url: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                    <Save size={12} /> Speichern
                                </button>
                                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {items.map(item => (
                    <div key={item.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!item.active ? 'opacity-50' : ''}`}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-bold text-black text-[14px]">{item.name}</p>
                                    <span className="text-yellow-400 text-[11px]">{'★'.repeat(item.rating)}</span>
                                </div>
                                <p className="text-gray-400 text-[11px] mb-1">{item.location}</p>
                                <p className="text-gray-600 text-[12px] italic leading-relaxed">"{item.text}"</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => toggleActive(item)} className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] cursor-pointer ${item.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {item.active ? '✓' : '○'}
                                </button>
                                <button onClick={() => setEditing(item)} className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    <Pencil size={12} />
                                </button>
                                <button onClick={() => remove(item.id)} className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors cursor-pointer">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── FAQ TAB (DE + TR only) ───────────────────────────────────────────────────
function FaqTab() {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<FaqItem> | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('faq').select('*').order('sort_order');
        setItems(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const save = async () => {
        if (!editing) return;
        if (editing.id) {
            await supabase.from('faq').update(editing).eq('id', editing.id);
        } else {
            const maxOrder = Math.max(0, ...items.map(i => i.sort_order));
            await supabase.from('faq').insert({ ...editing, sort_order: maxOrder + 1, active: true, question_sr: '', answer_sr: '' });
        }
        toast.success('FAQ gespeichert!');
        setEditing(null);
        fetch();
    };

    const remove = async (id: number) => {
        await supabase.from('faq').delete().eq('id', id);
        setItems(prev => prev.filter(i => i.id !== id));
        toast.success('FAQ gelöscht!');
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    const langs: { key: 'de' | 'tr'; label: string; flag: string }[] = [
        { key: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { key: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">{items.length} FAQ Einträge</p>
                <button onClick={() => setEditing({ question_de: '', question_tr: '', question_sr: '', answer_de: '', answer_tr: '', answer_sr: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <Plus size={12} /> Neue FAQ
                </button>
            </div>
            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-gray-100 bg-gray-50">
                        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{editing.id ? 'FAQ bearbeiten' : 'Neue FAQ'}</p>
                            {langs.map(({ key, label, flag }) => (
                                <div key={key} className="space-y-2 p-3 bg-white rounded-xl border border-gray-100">
                                    <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5">{flag} {label}</p>
                                    <input placeholder={`Frage (${label})`} value={(editing as any)[`question_${key}`] ?? ''}
                                        onChange={e => setEditing(p => ({ ...p!, [`question_${key}`]: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    <textarea rows={2} placeholder={`Antwort (${label})`} value={(editing as any)[`answer_${key}`] ?? ''}
                                        onChange={e => setEditing(p => ({ ...p!, [`answer_${key}`]: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black resize-none" />
                                </div>
                            ))}
                            <div className="flex gap-2">
                                <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                    <Save size={12} /> Speichern
                                </button>
                                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {items.map(item => (
                    <div key={item.id} className="px-6 py-3">
                        <div className="flex items-center justify-between gap-2 cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-black text-[13px] truncate">{item.question_de}</p>
                                {item.question_tr && <p className="text-gray-400 text-[11px] truncate">{item.question_tr}</p>}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={e => { e.stopPropagation(); setEditing(item); }} className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    <Pencil size={12} />
                                </button>
                                <button onClick={e => { e.stopPropagation(); remove(item.id); }} className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors cursor-pointer">
                                    <Trash2 size={12} />
                                </button>
                                {expandedId === item.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                            </div>
                        </div>
                        <AnimatePresence>
                            {expandedId === item.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="mt-2 space-y-2">
                                        <p className="text-gray-500 text-[12px] leading-relaxed">🇩🇪 {item.answer_de}</p>
                                        {item.answer_tr && <p className="text-gray-400 text-[12px] leading-relaxed">🇹🇷 {item.answer_tr}</p>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── GALERIJA TAB ────────────────────────────────────────────────────────────
function GalerijaTab() {
    const [items, setItems] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('gallery').select('*').order('sort_order');
        setItems(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const ext = file.name.split('.').pop();
            const filename = `gallery/${Date.now()}.${ext}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(filename, file);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filename);
            const maxOrder = Math.max(0, ...items.map(i => i.sort_order));
            await supabase.from('gallery').insert({ image_url: urlData.publicUrl, caption: file.name, sort_order: maxOrder + 1, active: true });
            toast.success('Bild hochgeladen!');
            window.dispatchEvent(new Event('hyla:gallery-updated'));
            fetch();
        } catch (err: any) {
            toast.error('Fehler: ' + err.message);
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const remove = async (item: GalleryImage) => {
        const path = item.image_url.split('/images/')[1];
        if (path) await supabase.storage.from('images').remove([path]);
        await supabase.from('gallery').delete().eq('id', item.id);
        setItems(prev => prev.filter(i => i.id !== item.id));
        window.dispatchEvent(new Event('hyla:gallery-updated'));
        toast.success('Bild gelöscht!');
    };

    const toggleActive = async (item: GalleryImage) => {
        await supabase.from('gallery').update({ active: !item.active }).eq('id', item.id);
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
        window.dispatchEvent(new Event('hyla:gallery-updated'));
    };

    if (loading) return <div className="p-6 grid grid-cols-3 gap-3">{[...Array(6)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">{items.length} Bilder · Montags-Treffen Galerie</p>
                </div>
                <label className={`flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                    <Upload size={12} /> {uploading ? 'Uploading...' : 'Bild hochladen'}
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-3 gap-3">
                    {items.map(item => (
                        <div key={item.id} className={`relative group rounded-xl overflow-hidden aspect-square ${!item.active ? 'opacity-50' : ''}`}>
                            <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => toggleActive(item)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[11px] cursor-pointer hover:bg-gray-100">
                                    {item.active ? '✓' : '○'}
                                </button>
                                <button onClick={() => remove(item)} className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                                    <Trash2 size={13} className="text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-3 flex flex-col items-center justify-center py-16 text-gray-300">
                            <ImageIcon size={40} className="mb-3" />
                            <p className="text-sm text-center">Noch keine Bilder. Lade das erste Foto hoch!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── ERGEBNISSE TAB ──────────────────────────────────────────────────────────
function ErgebnisseTab() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<'before' | 'after' | null>(null);
    const [editing, setEditing] = useState<any | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('results').select('*').order('sort_order');
        setItems(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after', itemId?: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(type);
        try {
            const ext = file.name.split('.').pop();
            const filename = `results/${type}_${Date.now()}.${ext}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(filename, file);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filename);
            if (itemId) {
                await supabase.from('results').update({ [`${type}_image`]: urlData.publicUrl }).eq('id', itemId);
                fetch();
            } else {
                setEditing((p: any) => ({ ...p, [`${type}_image`]: urlData.publicUrl }));
            }
            toast.success(`${type === 'before' ? 'Vorher' : 'Nachher'} Bild hochgeladen!`);
            window.dispatchEvent(new Event('hyla:results-updated'));
        } catch (err: any) {
            toast.error('Fehler: ' + err.message);
        } finally {
            setUploading(null);
            e.target.value = '';
        }
    };

    const save = async () => {
        if (!editing) return;
        if (editing.id) {
            await supabase.from('results').update(editing).eq('id', editing.id);
        } else {
            const maxOrder = Math.max(0, ...items.map(i => i.sort_order ?? 0));
            await supabase.from('results').insert({ ...editing, sort_order: maxOrder + 1, active: true });
        }
        toast.success('Ergebnis gespeichert!');
        window.dispatchEvent(new Event('hyla:results-updated'));
        setEditing(null);
        fetch();
    };

    const remove = async (id: number) => {
        await supabase.from('results').delete().eq('id', id);
        setItems(prev => prev.filter(i => i.id !== id));
        window.dispatchEvent(new Event('hyla:results-updated'));
        toast.success('Ergebnis gelöscht!');
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">{items.length} Ergebnisse (Vorher/Nachher)</p>
                <button onClick={() => setEditing({ title_de: '', title_tr: '', before_image: '', after_image: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <Plus size={12} /> Neues Ergebnis
                </button>
            </div>
            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-b border-gray-100 bg-gray-50">
                        <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{editing.id ? 'Bearbeiten' : 'Neues Ergebnis'}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <input placeholder="Titel (Deutsch)" value={editing.title_de ?? ''} onChange={e => setEditing((p: any) => ({ ...p, title_de: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                <input placeholder="Başlık (Türkçe)" value={editing.title_tr ?? ''} onChange={e => setEditing((p: any) => ({ ...p, title_tr: e.target.value }))}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-wider">VORHER Bild</p>
                                    {editing.before_image && <img src={editing.before_image} className="h-20 w-full object-cover rounded-lg mb-2" alt="before" />}
                                    <label className="block w-full py-2 px-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-bold text-center cursor-pointer hover:bg-red-100">
                                        {uploading === 'before' ? 'Uploading...' : '↑ Vorher hochladen'}
                                        <input type="file" accept="image/*" onChange={e => handleUpload(e, 'before')} className="hidden" disabled={!!uploading} />
                                    </label>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-green-600 mb-2 uppercase tracking-wider">NACHHER Bild</p>
                                    {editing.after_image && <img src={editing.after_image} className="h-20 w-full object-cover rounded-lg mb-2" alt="after" />}
                                    <label className="block w-full py-2 px-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-[11px] font-bold text-center cursor-pointer hover:bg-green-100">
                                        {uploading === 'after' ? 'Uploading...' : '↑ Nachher hochladen'}
                                        <input type="file" accept="image/*" onChange={e => handleUpload(e, 'after')} className="hidden" disabled={!!uploading} />
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                    <Save size={12} /> Speichern
                                </button>
                                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {items.map(item => (
                    <div key={item.id} className="px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-black text-[13px]">{item.title_de}</p>
                                {item.title_tr && <p className="text-gray-400 text-[11px]">{item.title_tr}</p>}
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => setEditing(item)} className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    <Pencil size={12} />
                                </button>
                                <button onClick={() => remove(item.id)} className="w-7 h-7 rounded-md bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors cursor-pointer">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                                <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Vorher</span>
                                {item.before_image ? <img src={item.before_image} className="h-24 w-full object-cover rounded-lg" alt="before" /> : (
                                    <label className="flex h-24 w-full items-center justify-center bg-red-50 border border-dashed border-red-200 rounded-lg text-[10px] text-red-400 cursor-pointer hover:bg-red-100">
                                        <Upload size={14} className="mr-1" /> Vorher
                                        <input type="file" accept="image/*" onChange={e => handleUpload(e, 'before', item.id)} className="hidden" />
                                    </label>
                                )}
                            </div>
                            <div className="relative">
                                <span className="absolute top-1 left-1 bg-white/80 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Nachher</span>
                                {item.after_image ? <img src={item.after_image} className="h-24 w-full object-cover rounded-lg" alt="after" /> : (
                                    <label className="flex h-24 w-full items-center justify-center bg-green-50 border border-dashed border-green-200 rounded-lg text-[10px] text-green-400 cursor-pointer hover:bg-green-100">
                                        <Upload size={14} className="mr-1" /> Nachher
                                        <input type="file" accept="image/*" onChange={e => handleUpload(e, 'after', item.id)} className="hidden" />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                        <BarChart2 size={40} className="mb-3" />
                        <p className="text-sm text-center">Noch keine Ergebnisse. Füge dein erstes Vorher/Nachher hinzu!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── COVER IMAGES TAB ────────────────────────────────────────────────────────
function CoverTab() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadingId, setUploadingId] = useState<number | 'new' | null>(null);
    const [dirtyLabels, setDirtyLabels] = useState<Record<number, string>>({}); // lokalne nepromjenene izmjene
    const [saving, setSaving] = useState(false);
    const hasDirty = Object.keys(dirtyLabels).length > 0;

    const fetchItems = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('cover_images').select('*').order('sort_order');
        setItems(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    // Upload za novokreirani slot (bez ID-a)
    const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingId('new');
        try {
            const ext = file.name.split('.').pop();
            const filename = `covers/${Date.now()}.${ext}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(filename, file);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filename);
            const maxOrder = Math.max(0, ...items.map(i => i.sort_order ?? 0));
            await supabase.from('cover_images').insert({ image_url: urlData.publicUrl, label: file.name, sort_order: maxOrder + 1, active: true });
            toast.success('Cover-Bild hinzugefügt!');
            window.dispatchEvent(new Event('hyla:covers-updated'));
            fetchItems();
        } catch (err: any) {
            toast.error('Fehler: ' + err.message);
        } finally {
            setUploadingId(null);
            e.target.value = '';
        }
    };

    // Zamjena slike za postojeći slot
    const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingId(item.id);
        try {
            // Obriši staru sliku iz Storage-a ako postoji
            if (item.image_url) {
                const oldPath = item.image_url.split('/images/')[1];
                if (oldPath) await supabase.storage.from('images').remove([oldPath]);
            }
            const ext = file.name.split('.').pop();
            const filename = `covers/${Date.now()}.${ext}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(filename, file);
            if (uploadError) throw uploadError;
            const { data: urlData } = supabase.storage.from('images').getPublicUrl(filename);
            await supabase.from('cover_images').update({ image_url: urlData.publicUrl, label: item.label || file.name }).eq('id', item.id);
            toast.success('Cover ersetzt!');
            window.dispatchEvent(new Event('hyla:covers-updated'));
            fetchItems();
        } catch (err: any) {
            toast.error('Fehler: ' + err.message);
        } finally {
            setUploadingId(null);
            e.target.value = '';
        }
    };

    // Lokalna izmjena labela — ne ide na Supabase odmah
    const changeLabel = (id: number, label: string) => {
        setDirtyLabels(prev => ({ ...prev, [id]: label }));
        setItems(prev => prev.map(i => i.id === id ? { ...i, label } : i));
    };

    // Spremi sve dirty labele odjednom
    const saveLabels = async () => {
        if (!hasDirty) return;
        setSaving(true);
        try {
            await Promise.all(
                Object.entries(dirtyLabels).map(([id, label]) =>
                    supabase.from('cover_images').update({ label }).eq('id', Number(id))
                )
            );
            setDirtyLabels({});
            toast.success('Bezeichnungen gespeichert!');
        } catch (err: any) {
            toast.error('Fehler: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const remove = async (item: any) => {
        if (item.image_url) {
            const path = item.image_url.split('/images/')[1];
            if (path) await supabase.storage.from('images').remove([path]);
        }
        await supabase.from('cover_images').delete().eq('id', item.id);
        setItems(prev => prev.filter(i => i.id !== item.id));
        window.dispatchEvent(new Event('hyla:covers-updated'));
        toast.success('Cover gelöscht!');
    };

    const toggleActive = async (item: any) => {
        await supabase.from('cover_images').update({ active: !item.active }).eq('id', item.id);
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
        window.dispatchEvent(new Event('hyla:covers-updated'));
    };

    if (loading) return <div className="p-6 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">{items.length} Cover Slots · Hero Slideshow</p>
                    <p className="text-gray-300 text-[10px] mt-0.5">Klicke auf einen Slot um das Bild zu ersetzen</p>
                </div>
                <label className={`flex items-center gap-1.5 px-4 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${uploadingId === 'new' ? 'opacity-50' : ''}`}>
                    <Plus size={12} /> {uploadingId === 'new' ? 'Uploading...' : 'Neu'}
                    <input type="file" accept="image/*" onChange={handleUploadNew} className="hidden" disabled={uploadingId !== null} />
                </label>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map(item => (
                    <div key={item.id} className={`border rounded-2xl overflow-hidden transition-all ${!item.active ? 'opacity-50 border-gray-200' : 'border-gray-200'}`}>
                        {/* Slika ili placeholder */}
                        <div className="relative h-44 bg-gray-100">
                            {item.image_url ? (
                                <>
                                    <img src={item.image_url} alt={item.label} className="w-full h-full object-cover" />
                                    {/* Hover overlay za zamjenu */}
                                    <label className={`absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer ${uploadingId === item.id ? 'opacity-100' : ''}`}>
                                        <Upload size={22} className="text-white mb-1" />
                                        <span className="text-white text-[11px] font-bold">{uploadingId === item.id ? 'Uploading...' : 'Bild ersetzen'}</span>
                                        <input type="file" accept="image/*" onChange={e => handleReplace(e, item)} className="hidden" disabled={uploadingId !== null} />
                                    </label>
                                </>
                            ) : (
                                /* Prazni slot — placeholder */
                                <label className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-black hover:bg-gray-50 transition-colors ${uploadingId === item.id ? 'opacity-50' : ''}`}>
                                    <ImageIcon size={30} className="text-gray-300 mb-2" />
                                    <span className="text-gray-400 text-[12px] font-bold">{uploadingId === item.id ? 'Uploading...' : 'Bild hochladen'}</span>
                                    <span className="text-gray-300 text-[10px] mt-1">Klicken zum Auswählen</span>
                                    <input type="file" accept="image/*" onChange={e => handleReplace(e, item)} className="hidden" disabled={uploadingId !== null} />
                                </label>
                            )}
                            {item.active && item.image_url && (
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Aktiv</span>
                            )}
                        </div>
                        {/* Controls */}
                        <div className="p-3 flex items-center gap-2 bg-white">
                            <input value={item.label} onChange={e => changeLabel(item.id, e.target.value)}
                                className={`flex-1 bg-transparent border-b pb-1 text-[13px] focus:outline-none text-gray-700 ${dirtyLabels[item.id] !== undefined ? 'border-amber-400 focus:border-amber-500' : 'border-gray-200 focus:border-black'}`} placeholder="Bezeichnung..." />
                            <button onClick={() => toggleActive(item)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] cursor-pointer font-bold flex-shrink-0 ${item.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                {item.active ? '✓' : '○'}
                            </button>
                            <button onClick={() => remove(item)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors cursor-pointer flex-shrink-0">
                                <Trash2 size={13} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {hasDirty && (
                <div className="p-4 border-t border-amber-100 bg-amber-50 flex items-center justify-between gap-3">
                    <p className="text-amber-700 text-[11px] font-bold">● Ungespeicherte Änderungen</p>
                    <button onClick={saveLabels} disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-[11px] font-bold rounded-lg hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50">
                        <Save size={12} /> {saving ? 'Speichern...' : 'Speichern'}
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── PROIZVODI TAB ───────────────────────────────────────────────────────────
const MODEL_COLORS: Record<string, string> = {
    black: 'bg-black',
    white: 'bg-gray-200 border border-gray-300',
    steamer: 'bg-orange-400',
};

function ProizvodiTab() {
    const [configs, setConfigs] = useState<PricingConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);

    const loadConfigs = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('pricing_config').select('*').order('id');
        const seen = new Set<string>();
        const deduped = (data ?? []).filter((c: PricingConfig) => {
            if (seen.has(c.model)) return false;
            seen.add(c.model);
            return true;
        });
        setConfigs(deduped);
        setLoading(false);
    }, []);

    useEffect(() => { loadConfigs(); }, [loadConfigs]);

    const update = (id: number, field: keyof PricingConfig, value: string | boolean) => {
        setConfigs(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const saveAll = async () => {
        setSaving(true);
        for (const config of configs) {
            await supabase.from('pricing_config').update(config).eq('id', config.id);
        }
        toast.success('Produkte gespeichert!');
        setSaving(false);
    };

    const deleteConfig = async (id: number) => {
        if (!confirm('Produkt wirklich löschen?')) return;
        await supabase.from('pricing_config').delete().eq('id', id);
        setConfigs(prev => prev.filter(c => c.id !== id));
        toast.success('Produkt gelöscht');
    };

    const addProduct = async () => {
        if (configs.length >= 3) return;
        setAdding(true);
        const newModel = `produkt_${Date.now()}`;
        const { data, error } = await supabase.from('pricing_config').insert({
            model: newModel,
            title: 'Neues Produkt',
            badge: 'NEU',
            financing_text: '',
            feature1: '',
            feature2: '',
            feature3: '',
            cta_text: 'Jetzt bestellen',
            action_label: '',
            action_extra: '',
            image_url: '',
            show_toggle: false,
        }).select().single();
        if (!error && data) setConfigs(prev => [...prev, data]);
        setAdding(false);
        toast.success('Produkt hinzugefügt');
    };

    const uploadImage = async (id: number, file: File) => {
        setUploading(id);
        const ext = file.name.split('.').pop();
        const path = `products/${id}-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('cover-images').upload(path, file, { upsert: true });
        if (error) { toast.error('Upload fehlgeschlagen'); setUploading(null); return; }
        const { data: { publicUrl } } = supabase.storage.from('cover-images').getPublicUrl(path);
        const url = `${publicUrl}?t=${Date.now()}`;
        await supabase.from('pricing_config').update({ image_url: url }).eq('id', id);
        update(id, 'image_url', url);
        toast.success('Bild hochgeladen!');
        setUploading(null);
    };

    if (loading) return <div className="p-6 space-y-4">{[...Array(2)].map((_, i) => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                    <p className="font-bold text-[13px]">Produkte verwalten</p>
                    <p className="text-[11px] text-gray-400">{configs.length}/3 • Maximal 3 Produkte</p>
                </div>
                {configs.length < 3 && (
                    <button onClick={addProduct} disabled={adding}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-full hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50">
                        <Plus size={12} />
                        {adding ? '...' : 'Produkt hinzufügen'}
                    </button>
                )}
            </div>

            {/* Product Cards */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {configs.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <Package size={32} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Keine Produkte. Füge bis zu 3 hinzu.</p>
                    </div>
                )}
                {configs.map((config, idx) => (
                    <div key={config.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                        {/* Product Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className={`w-3.5 h-3.5 rounded-full ${MODEL_COLORS[config.model] ?? 'bg-gray-400'}`} />
                                <span className="font-bold text-[12px] uppercase tracking-wider">{config.title || `Produkt ${idx + 1}`}</span>
                            </div>
                            <button onClick={() => deleteConfig(config.id)}
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer">
                                <Trash2 size={13} />
                            </button>
                        </div>

                        <div className="p-4 space-y-4">

                            {/* Image Upload */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Produktbild</label>
                                <div className="flex gap-3 items-center">
                                    {config.image_url ? (
                                        <img src={config.image_url} alt="" className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <ImageIcon size={20} className="text-gray-300" />
                                        </div>
                                    )}
                                    <label className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-[11px] font-bold cursor-pointer hover:border-black hover:text-black transition-colors ${uploading === config.id ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <Upload size={13} />
                                        {uploading === config.id ? 'Hochladen...' : 'Bild hochladen'}
                                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(config.id, f); }} />
                                    </label>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Leer lassen = Standard HYLA Bild aus dem Design</p>
                            </div>

                            {/* Aktion Section */}
                            <div className="bg-orange-50 rounded-xl p-3 space-y-2 border border-orange-100">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">🏷️ Aktion / Promotion</p>
                                <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Aktions-Label (z.B. NEU, Valentinstag Aktion)</label>
                                    <input value={config.action_label ?? ''}
                                        onChange={e => update(config.id, 'action_label', e.target.value)}
                                        placeholder="z.B. Valentinstag Aktion"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">Extra für diese Aktion (z.B. Gratis Luftreiniger dazu)</label>
                                    <input value={config.action_extra ?? ''}
                                        onChange={e => update(config.id, 'action_extra', e.target.value)}
                                        placeholder="z.B. Gratis Luftreiniger dazu"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                                </div>
                            </div>

                            {/* Toggle Option */}
                            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-[11px] font-bold">Black/White Toggle</p>
                                    <p className="text-[10px] text-gray-400">Zeigt einen Umschalter für zwei Varianten</p>
                                </div>
                                <button
                                    onClick={() => update(config.id, 'show_toggle', !config.show_toggle)}
                                    className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${config.show_toggle ? 'bg-black' : 'bg-gray-200'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${config.show_toggle ? 'translate-x-4' : ''}`} />
                                </button>
                            </div>

                            {/* Standard Fields */}
                            <div className="space-y-3">
                                {[
                                    { label: 'Titel', field: 'title' as const, placeholder: 'HYLA Black' },
                                    { label: 'Badge', field: 'badge' as const, placeholder: 'BESTSELLER' },
                                    { label: 'Finanzierungstext', field: 'financing_text' as const, placeholder: 'ab 39,00 € / Monat' },
                                    { label: 'Feature 1', field: 'feature1' as const, placeholder: 'Premium Finish' },
                                    { label: 'Feature 2', field: 'feature2' as const, placeholder: 'Komplettes Zubehör-Set' },
                                    { label: 'Feature 3', field: 'feature3' as const, placeholder: 'Smart Water Technologie' },
                                    { label: 'Button-Text', field: 'cta_text' as const, placeholder: 'Jetzt bestellen' },
                                ].map(({ label, field, placeholder }) => (
                                    <div key={field}>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</label>
                                        <input value={String(config[field] ?? '')}
                                            onChange={e => update(config.id, field, e.target.value)}
                                            placeholder={placeholder}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="p-4 border-t border-gray-100">
                <button onClick={saveAll} disabled={saving}
                    className="w-full h-12 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                    <Save size={15} /> {saving ? 'Speichern...' : 'Alle Produkte speichern'}
                </button>
            </div>
        </div>
    );
}


// ─── PODEŠAVANJA TAB ─────────────────────────────────────────────────────────
function PodesavanjaTab() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetch = useCallback(async () => {
        setLoading(true);
        const { data } = await supabase.from('settings').select('*');
        const map: Record<string, string> = {};
        (data ?? []).forEach((r: { key: string; value: string }) => { map[r.key] = r.value; });
        setSettings(map);
        setLoading(false);
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    const save = async () => {
        setSaving(true);
        const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
        await supabase.from('settings').upsert(rows, { onConflict: 'key' });
        toast.success('Einstellungen gespeichert!');
        window.dispatchEvent(new Event('hyla:refresh'));
        setSaving(false);
    };

    const fields = [
        { key: 'whatsapp_number', label: 'WhatsApp Nummer (ohne +)', placeholder: '491726134835' },
        { key: 'email', label: 'E-Mail Adresse', placeholder: 'hakanakkus@mailbox.org' },
        { key: 'phone', label: 'Telefon', placeholder: '+49 172 6134835' },
        { key: 'address', label: 'Adresse', placeholder: 'Heinrichstraße 9, 60326 Frankfurt am Main' },
        { key: 'event_day', label: 'Event-Tag', placeholder: 'Montag / Pazartesi' },
        { key: 'event_time', label: 'Event-Uhrzeit', placeholder: '19:00' },
    ];

    if (loading) return <div className="p-6 space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-xl" />)}</div>;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {fields.map(({ key, label, placeholder }) => (
                    <div key={key}>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</label>
                        <input value={settings[key] ?? ''} onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black" />
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-100">
                <button onClick={save} disabled={saving}
                    className="w-full h-12 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                    <Save size={15} /> {saving ? 'Speichern...' : 'Einstellungen speichern'}
                </button>
            </div>
        </div>
    );
}

// ─── TEAM TAB ─────────────────────────────────────────────────────────────────
function TeamTab() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        supabase.from('site_settings').select('value').eq('key', 'team_image_url').single()
            .then(({ data }) => { if (data?.value) setImageUrl(data.value); });
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const ext = file.name.split('.').pop();
        const path = `team/team-photo.${ext}`;
        const { error } = await supabase.storage.from('cover-images').upload(path, file, { upsert: true });
        if (error) { toast.error('Upload fehlgeschlagen'); setUploading(false); return; }
        const { data: { publicUrl } } = supabase.storage.from('cover-images').getPublicUrl(path);
        const cacheBusted = `${publicUrl}?t=${Date.now()}`;
        // Save to site_settings
        await supabase.from('site_settings').upsert({ key: 'team_image_url', value: cacheBusted }, { onConflict: 'key' });
        setImageUrl(cacheBusted);
        toast.success('Team-Foto aktualisiert!');
        setUploading(false);
    };

    const handleResetDefault = async () => {
        setSaving(true);
        await supabase.from('site_settings').delete().eq('key', 'team_image_url');
        setImageUrl('');
        toast.success('Standard-Foto wiederhergestellt');
        setSaving(false);
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <p className="font-bold text-black text-[13px]">Team-Foto verwalten</p>
                <p className="text-gray-500 text-[11px]">Ersetze das Foto in der Team-Sektion auf der Startseite</p>
            </div>
            <div className="p-6 space-y-6">
                {/* Current preview */}
                <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-video flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Team" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-gray-400">
                            <ImageIcon size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-[12px]">Standard-Bild aktiv</p>
                        </div>
                    )}
                </div>
                {/* Upload */}
                <label className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 text-[13px] font-bold cursor-pointer hover:border-black hover:text-black transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Upload size={16} />
                    {uploading ? 'Wird hochgeladen...' : 'Neues Foto hochladen'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
                {/* Reset */}
                {imageUrl && (
                    <button
                        onClick={handleResetDefault}
                        disabled={saving}
                        className="w-full h-10 rounded-xl border border-red-100 text-red-500 text-[12px] font-bold hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        {saving ? 'Wird zurückgesetzt...' : 'Standard-Foto wiederherstellen'}
                    </button>
                )}
                <p className="text-[11px] text-gray-400 text-center">
                    Das Bild wird sofort auf der Website sichtbar (nach Neuladung)
                </p>
            </div>
        </div>
    );
}

// ─── MAIN ADMIN PANEL ────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'cover', label: 'Cover', icon: <Layout size={14} /> },
    { id: 'proizvodi', label: 'Produkte', icon: <Package size={14} /> },
    { id: 'ergebnisse', label: 'Ergebnisse', icon: <BarChart2 size={14} /> },
    { id: 'galerija', label: 'Galerie', icon: <ImageIcon size={14} /> },
    { id: 'team', label: 'Team', icon: <ImageIcon size={14} /> },
    { id: 'recenzije', label: 'Bewertungen', icon: <Star size={14} /> },
    { id: 'leadovi', label: 'Anfragen', icon: <Inbox size={14} /> },
    { id: 'podesavanja', label: 'Einstellungen', icon: <SlidersHorizontal size={14} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={14} /> },
];

interface AdminPanelProps {
    open: boolean;
    onClose: () => void;
}

export function AdminPanel({ open, onClose }: AdminPanelProps) {
    const { logout } = useAdmin();
    const [activeTab, setActiveTab] = useState<Tab>('galerija');

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-[300] backdrop-blur-sm" onClick={onClose} />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-white border-l border-gray-100 z-[301] flex flex-col shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                                    <Settings size={15} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-black text-[14px]">Admin Panel</p>
                                    <p className="text-gray-400 text-[11px]">HYLA by Hakan Akkus</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { logout(); onClose(); }}
                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Abmelden">
                                    <LogOut size={15} />
                                </button>
                                <button onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                                    <X size={15} />
                                </button>
                            </div>
                        </div>
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 overflow-x-auto flex-shrink-0 scrollbar-hide">
                            {TABS.map(tab => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-3 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${activeTab === tab.id ? 'text-black border-b-2 border-black -mb-px' : 'text-gray-400 hover:text-gray-600'
                                        }`}>
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {/* Content */}
                        <div className="flex-1 overflow-hidden relative">
                            {activeTab === 'galerija' && <GalerijaTab />}
                            {activeTab === 'faq' && <FaqTab />}
                            {activeTab === 'leadovi' && <LeadoviTab />}
                            {activeTab === 'recenzije' && <RecenzijeTab />}
                            {activeTab === 'ergebnisse' && <ErgebnisseTab />}
                            {activeTab === 'cover' && <CoverTab />}
                            {activeTab === 'proizvodi' && <ProizvodiTab />}
                            {activeTab === 'team' && <TeamTab />}
                            {activeTab === 'podesavanja' && <PodesavanjaTab />}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
