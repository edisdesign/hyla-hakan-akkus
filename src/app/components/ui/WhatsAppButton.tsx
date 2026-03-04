import { MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { WHATSAPP_URL } from '@/app/constants';

export function WhatsAppButton() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        asChild
        className="size-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg flex items-center justify-center p-0 border-2 border-white/20"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="size-8 text-white" />
        </a>
      </Button>
    </motion.div>
  );
}