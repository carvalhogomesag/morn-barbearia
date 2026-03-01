// src/components/Services.tsx
import { motion } from "motion/react";
import { Scissors, Clock, CalendarCheck } from "lucide-react"; // Trocamos Sparkles por Scissors para a Barbearia
import { UI_STRINGS, Language } from "../constants";
import { useSalon } from "../context/SalonContext";

export const Services = ({ lang }: { lang: Language }) => {
  const t = UI_STRINGS[lang];
  const { salonData } = useSalon();

  return (
    /* Fundo Branco Perolado para destacar os cards Industriais */
    <section id="servicos" className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Detalhe de fundo: Linha decorativa Prata */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-straw/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-leaf uppercase tracking-[0.4em] text-[10px] md:text-xs font-black mb-4 block"
          >
            {t.ourServices}
          </motion.span>
          <h2 className="text-5xl md:text-7xl mb-6 text-brand-dark font-serif font-bold uppercase tracking-tighter">
            {t.viewServices}
          </h2>
          {/* Linha horizontal grossa da identidade MORN */}
          <div className="w-24 h-1.5 bg-brand-leaf mx-auto mb-6 rounded-none"></div>
          <p className="text-brand-dark/60 max-w-xl mx-auto text-lg font-light leading-relaxed px-4">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {salonData.services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.6 }} 
              /* 
                 DESIGN INDUSTRIAL:
                 - Cantos retos (rounded-none)
                 - Borda preta sólida
                 - Sombra sólida deslocada (offset shadow)
              */
              className="bg-white p-8 rounded-none transition-all duration-500 group border-2 border-brand-dark hover:border-brand-leaf flex flex-col h-full relative shadow-[10px_10px_0px_0px_rgba(10,10,10,0.05)] hover:shadow-[10px_10px_0px_0px_rgba(153,27,27,1)] hover:-translate-x-1 hover:-translate-y-1"
            >
              {/* Ícone: Tesouras em destaque Red/Chrome */}
              <div className="w-16 h-16 bg-brand-dark rounded-none flex items-center justify-center mb-8 group-hover:bg-brand-leaf transition-all duration-500 text-brand-straw group-hover:text-white relative">
                <Scissors size={28} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-500" />
              </div>

              <h3 className="text-2xl mb-4 leading-tight text-brand-dark font-serif font-black uppercase tracking-tight group-hover:text-brand-leaf transition-colors duration-300">
                {service.name[lang]}
              </h3>
              
              <p className="text-sm text-brand-dark/60 mb-10 flex-grow font-light leading-relaxed border-l-2 border-brand-straw/20 pl-4">
                {service.description[lang]}
              </p>
              
              {/* Zona de Preço e Duração: Estilo Recibo de Luxo */}
              <div className="bg-brand-cream -mx-8 px-8 py-6 mb-8 border-y border-brand-straw/30">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-black">{t.duration}</span>
                    <span className="text-sm font-bold flex items-center gap-1.5 text-brand-dark/80">
                      <Clock size={14} className="text-brand-leaf" /> {service.duration}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-black block mb-1">{t.price}</span>
                    <div className="flex items-start justify-end">
                      <span className="text-sm text-brand-leaf font-black mt-1">€</span>
                      <span className="text-4xl font-serif text-brand-dark font-bold leading-none ml-0.5 group-hover:text-brand-leaf transition-colors">{service.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTÃO AGENDAR: Sharp Industrial */}
              <a 
                href={salonData.bookingUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-brand-dark text-white rounded-none text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 flex items-center justify-center gap-2 hover:bg-brand-leaf shadow-lg active:scale-95"
              >
                <CalendarCheck size={16} strokeWidth={2} />
                {t.bookNow}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};