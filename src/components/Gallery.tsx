// src/components/Gallery.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Gallery = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const rawPhotos = salonData.galleryPhotos?.filter(url => url && url.trim() !== "") || [];
  
  // EFEITO CIRCULAR: Triplicamos a lista para permitir scroll infinito visual
  const displayPhotos = rawPhotos.length > 0 
    ? [...rawPhotos, ...rawPhotos, ...rawPhotos] 
    : [];

  // Posiciona o scroll no bloco central ao carregar
  useEffect(() => {
    if (scrollRef.current && rawPhotos.length > 0) {
      const container = scrollRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 0;
      const gap = 24; // gap-6
      
      const scrollTo = (cardWidth + gap) * rawPhotos.length;
      container.scrollLeft = scrollTo;
    }
  }, [rawPhotos.length]);

  if (displayPhotos.length === 0) return null;

  return (
    /* Fundo Preto Matte (brand-dark) para realçar o estilo industrial */
    <section id="galeria" className="py-24 bg-brand-dark text-brand-cream relative overflow-hidden">
      
      {/* Detalhes de Fundo: Linhas de Grelha Industriais sutis */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#A6A6A6 1px, transparent 1px), linear-gradient(90deg, #A6A6A6 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-leaf uppercase tracking-[0.4em] text-[10px] md:text-xs font-black mb-4 block"
        >
          {t.gallerySubtitle}
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-serif font-bold uppercase tracking-tighter text-white leading-tight">
          {t.gallery}
        </h2>
        {/* Linha horizontal grossa da MORN em Vermelho */}
        <div className="w-24 h-1.5 bg-brand-leaf mx-auto mt-6 rounded-none"></div>
      </div>

      {/* --- CATÁLOGO CIRCULAR INDUSTRIAL --- */}
      <div className="relative z-10">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-20 no-scrollbar snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingLeft: '15%', 
            paddingRight: '15%' 
          }}
        >
          {displayPhotos.map((photo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0.3, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              /* 
                 DESIGN MORN:
                 - rounded-none (Cantos retos)
                 - border border-brand-straw/20 (Prata/Cromo)
                 - shadow-heavy (Sombra industrial)
              */
              className="relative flex-none w-[75vw] md:w-[450px] aspect-[4/5] rounded-none overflow-hidden snap-center cursor-pointer bg-zinc-900 border border-brand-straw/20 group shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transition-all duration-700"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo} 
                alt="Trabalho MORN" 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Overlay de Cromo no Hover */}
              <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-20 h-20 rounded-none bg-brand-leaf/90 backdrop-blur-md flex items-center justify-center text-white border border-white/20 rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <ZoomIn size={32} strokeWidth={1.5} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>

              {/* Detalhe de canto industrial */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-brand-leaf translate-x-4 translate-y-4 rotate-45"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Industrial */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-brand-dark/98 backdrop-blur-2xl"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-brand-leaf transition-colors">
              <X size={48} strokeWidth={1} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-none shadow-[0_0_80px_rgba(0,0,0,0.8)] object-contain border border-brand-straw/20" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};