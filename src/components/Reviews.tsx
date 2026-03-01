// src/components/Reviews.tsx
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react"; // Adicionámos o ícone de Aspas para estilo editorial
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Reviews = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    /* Fundo Preto Matte para atmosfera de Clube Privado */
    <section id="avaliacoes" className="section-padding bg-brand-dark text-brand-cream relative overflow-hidden">
      
      {/* Elementos Decorativos Industriais: Linhas de precisão em Prata */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-straw/20 to-transparent"></div>
      <div className="absolute top-20 right-[-5%] w-64 h-64 border border-brand-straw/5 rotate-45 pointer-events-none hidden lg:block"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER: Foco na Reputação MORN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-leaf uppercase tracking-[0.4em] text-[10px] md:text-xs font-black mb-4 block"
            >
              {t.realExperiences}
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold uppercase tracking-tighter leading-[0.9]">
              {t.whatClientsSay}
            </h2>
          </div>

          {/* Badge de Rating Industrial */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-zinc-900/50 px-8 py-5 rounded-none border border-brand-straw/20 backdrop-blur-md shadow-2xl"
          >
            <div className="flex text-brand-straw">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-bold tracking-widest text-sm uppercase">
              4.9/5 <span className="opacity-40 font-light ml-2 text-xs">{salonData.reviews.length} {t.reviews}</span>
            </span>
          </motion.div>
        </div>

        {/* GRID DE REVIEWS: Estilo Mural de Honra */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {salonData.reviews.map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.15, duration: 0.8 }}
              /* Design Sharp: Cantos retos, borda fina e sombra sólida */
              className="bg-zinc-900/30 p-10 rounded-none border border-brand-straw/10 hover:border-brand-leaf transition-all duration-700 flex flex-col relative group"
            >
              {/* Aspas decorativas (Identidade MORN) */}
              <Quote className="absolute top-6 right-8 text-brand-straw/5 group-hover:text-brand-leaf/20 transition-colors duration-700" size={60} />

              {/* Estrelas em Prata */}
              <div className="flex gap-1 text-brand-straw mb-8">
                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>

              {/* Texto: Tipografia de peso com aspas reais */}
              <p className="text-xl md:text-2xl font-serif italic mb-10 leading-relaxed text-brand-cream/80 flex-grow relative z-10">
                "{review.text[lang]}"
              </p>

              {/* Autor: Estilo Ficha Técnica */}
              <div className="flex items-center gap-5 pt-8 border-t border-brand-straw/10">
                <div className="w-12 h-12 bg-brand-straw/10 border border-brand-straw/30 rounded-none flex items-center justify-center text-brand-straw font-bold text-lg rotate-45 group-hover:rotate-0 group-hover:bg-brand-leaf group-hover:text-white group-hover:border-brand-leaf transition-all duration-500">
                  <span className="-rotate-45 group-hover:rotate-0 transition-transform">{review.author[0]}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold uppercase tracking-widest text-xs text-white">
                    {review.author}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-straw/60 mt-1 font-black">
                    Membro MORN
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};