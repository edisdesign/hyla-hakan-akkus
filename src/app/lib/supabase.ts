import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
    created_at: string;
}

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    text: string;
    rating: number;
    image_url: string;
    sort_order: number;
    active: boolean;
}

export interface FaqItem {
    id: number;
    question_de: string;
    question_tr: string;
    question_sr: string;
    answer_de: string;
    answer_tr: string;
    answer_sr: string;
    sort_order: number;
    active: boolean;
}

export interface GalleryImage {
    id: number;
    image_url: string;
    caption: string;
    sort_order: number;
    active: boolean;
}

export interface PricingConfig {
    id: number;
    model: 'black' | 'white' | 'steamer' | string;
    title: string;
    badge: string;
    financing_text: string;
    feature1: string;
    feature2: string;
    feature3: string;
    cta_text: string;
    // Extended fields (added via SQL migration)
    image_url?: string;
    action_label?: string;   // e.g. "NEU", "Valentinstag Aktion"
    action_extra?: string;   // e.g. "Gratis Luftreiniger dazu"
    show_toggle?: boolean;   // if true, show Black/White toggle
    linked_to?: string;      // model this is linked to for toggle
    sort_order?: number;
}

export interface SiteSettings {
    key: string;
    value: string;
}

export interface Setting {
    key: string;
    value: string;
}

export interface Result {
    id: number;
    title_de: string;
    title_tr: string;
    before_image: string;
    after_image: string;
    sort_order: number;
    active: boolean;
}

export interface CoverImage {
    id: number;
    image_url: string;
    label: string;
    sort_order: number;
    active: boolean;
}
