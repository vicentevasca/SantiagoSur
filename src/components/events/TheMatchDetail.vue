<template>
  <div class="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-y-auto lg:overflow-hidden">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
      <img 
        :src="matchBg" 
        class="w-full h-full object-cover opacity-50 animate-slow-pan"
        alt="Fog Background"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-black/80"></div>
    </div>

    <div class="relative z-10 min-h-screen lg:min-h-0 lg:h-screen w-full px-6 py-20 lg:py-0 lg:px-16 flex flex-col lg:justify-center">
      
      <button 
        @click="$emit('close')" 
        class="fixed top-6 right-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-yellow-400 transition group mix-blend-difference cursor-pointer"
      >
        <span class="text-xl group-hover:rotate-90 transition-transform duration-300">×</span> Cerrar
      </button>

      <div class="w-full max-w-[1600px] mx-auto flex flex-col h-full lg:h-auto lg:justify-center">
        
        <div class="flex flex-col items-center mb-12 animate-fade-in-up">
          
          <div class="text-center mb-8">
            <div class="inline-block px-3 py-1 border border-yellow-500/30 rounded-full mb-2 backdrop-blur-sm">
              <p class="text-[9px] font-bold tracking-[0.3em] text-yellow-400 uppercase">¡Es Oficial!</p>
            </div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase drop-shadow-2xl">
              The <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">Match</span>
            </h1>
            <p class="text-lg md:text-xl font-serif italic text-neutral-300 mt-1">Gala Año Nuevo 2026</p>
          </div>

          <div class="flex gap-12 border-b border-white/10 px-8">
            <button 
              @click="activeTab = 'info'"
              class="pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative"
              :class="activeTab === 'info' ? 'text-white' : 'text-neutral-500 hover:text-white'"
            >
              Info & Tickets
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'info' ? 'scale-x-100' : 'scale-x-0'"></span>
            </button>

            <button 
              @click="activeTab = 'lineup'"
              class="pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative"
              :class="activeTab === 'lineup' ? 'text-white' : 'text-neutral-500 hover:text-white'"
            >
              Line Up
              <span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'lineup' ? 'scale-x-100' : 'scale-x-0'"></span>
            </button>
          </div>

        </div>

        <Transition name="fade-tab" mode="out-in">
          
          <div v-if="activeTab === 'info'" key="info" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div class="lg:col-span-7 space-y-8">
              <p class="text-neutral-400 text-sm lg:text-base leading-relaxed max-w-2xl">
                Llega para Buin-Paine un nuevo estándar en fiestas masivas. Despedimos el año viejo y encendemos el nuevo con una producción de nivel internacional.
                <br>
                <span class="text-yellow-400 font-serif italic text-lg block mt-2">"Se apaga el año. Se prende el match."</span>
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                 <div class="flex items-start gap-3">
                   <span class="text-xl">📍</span>
                   <div>
                     <span class="block text-[10px] font-bold uppercase tracking-widest text-neutral-500">Lugar</span>
                     <span class="text-sm font-bold text-white">Academia Renacer</span>
                     <span class="block text-xs text-neutral-400">Ruta 5 Sur 755, Buin</span>
                   </div>
                 </div>
                 <div class="flex items-start gap-3">
                   <span class="text-xl">👠</span>
                   <div>
                     <span class="block text-[10px] font-bold uppercase tracking-widest text-neutral-500">Dress Code</span>
                     <span class="text-sm font-bold text-white">Gala / Semi Formal</span>
                   </div>
                 </div>
                 <div class="col-span-1 sm:col-span-2 flex flex-wrap gap-3 text-xs text-white/80">
                    <span class="bg-white/5 px-3 py-1.5 rounded border border-white/10">🥂 Open Bar Premium</span>
                    <span class="bg-white/5 px-3 py-1.5 rounded border border-white/10">💃 Stage Ultrabailable</span>
                    <span class="bg-white/5 px-3 py-1.5 rounded border border-white/10">🌳 Terraza Open Air</span>
                 </div>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div class="bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                
                <div class="space-y-3 mb-6">
                  <div class="flex items-center justify-between p-3 bg-black/40 border border-yellow-500/30 rounded hover:bg-yellow-500/10 transition-colors cursor-pointer group">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-white">Preventa 1</span>
                        <span class="text-[9px] bg-yellow-500 text-black px-1.5 rounded font-bold uppercase">Limitado</span>
                      </div>
                      <span class="text-[10px] text-neutral-500 font-mono">Stock: 100 tickets</span>
                    </div>
                    <span class="text-lg font-bold text-yellow-400">$15.000</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded hover:border-white/30 transition-colors cursor-pointer">
                    <div>
                      <span class="text-sm font-bold text-white">Preventa 2</span>
                      <span class="text-[10px] text-neutral-500 font-mono block">Hasta agotar stock</span>
                    </div>
                    <span class="text-lg font-bold text-white">$20.000</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded hover:border-white/30 transition-colors cursor-pointer">
                    <div>
                      <span class="text-sm font-bold text-white">General</span>
                      <span class="text-[10px] text-neutral-500 font-mono block">En puerta</span>
                    </div>
                    <span class="text-lg font-bold text-white">$25.000</span>
                  </div>
                </div>

                <button class="w-full py-3 bg-white text-black font-extrabold text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 transition-colors duration-300 rounded-sm shadow-lg">Ir al Pago</button>

                <div class="flex justify-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <a href="https://instagram.com/santiagosur" target="_blank" class="text-white hover:text-[#E1306C] transition-colors text-xl"><i class="fab fa-instagram"></i> 📸</a>
                  <a href="https://wa.me/56912345678" target="_blank" class="text-white hover:text-[#25D366] transition-colors text-xl"><i class="fab fa-whatsapp"></i> 💬</a>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'lineup'" key="lineup" class="w-full">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <div 
                v-for="(dj, index) in lineUp" 
                :key="index"
                class="relative group cursor-pointer overflow-hidden h-[400px] md:h-[500px] rounded-sm border border-white/10 bg-neutral-900"
              >
                <img 
                  :src="dj.image" 
                  class="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                  alt="DJ"
                />
                
                <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>

                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                  <h3 class="text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent stroke-text text-center leading-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 mix-blend-difference opacity-0 group-hover:opacity-100">
                    {{ dj.name }}
                  </h3>
                  
                  <span class="mt-2 text-yellow-400 font-mono text-sm bg-black/80 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    SET TIME: {{ dj.time }}
                  </span>
                </div>

                <div class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span class="bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                     {{ dj.genre }}
                   </span>
                </div>
              </div>
            </div>

          </div>

        </Transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import matchBg from '../../assets/img/TheMatch/TheMatchBackground.png';

const activeTab = ref('info'); // Estado inicial: 'info' o 'lineup'

const lineUp = ref([
  {
    name: 'DJ MAURO',
    genre: 'Ultrabailable',
    time: '23:00 - 01:00',
    image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop' 
  },
  {
    name: 'JAVI M.',
    genre: 'Reggaeton',
    time: '01:00 - 03:00',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'NICO B.',
    genre: 'Tech House',
    time: '03:00 - CLOSING',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop'
  }
]);
</script>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 2px white;
  color: transparent;
}

.animate-slow-pan {
  animation: panBackground 30s infinite alternate linear;
}
@keyframes panBackground {
  from { transform: scale(1.1) translate(0, 0); }
  to { transform: scale(1.2) translate(-2%, -2%); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

/* Transiciones entre Pestañas */
.fade-tab-enter-active,
.fade-tab-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-tab-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>