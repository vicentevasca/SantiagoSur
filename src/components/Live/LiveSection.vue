<template>
  <section class="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
    
    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

    <div class="max-w-[1800px] mx-auto relative z-10">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6 reveal">
        <div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            SS <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">ENVIVO</span>
          </h1>
          <p class="text-neutral-400 font-mono text-xs md:text-sm tracking-widest mt-2">
            SISTEMA DE TRANSMISIÓN v2.0
          </p>
        </div>

        <div class="flex items-center gap-4 mt-6 md:mt-0">
          <div class="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 rounded-full">
            <div class="w-3 h-3 rounded-full transition-colors duration-500" :class="isStreamActive ? 'bg-red-500 animate-pulse shadow-[0_0_10px_red]' : 'bg-neutral-600'"></div>
            <span class="text-xs font-bold tracking-widest uppercase" :class="isStreamActive ? 'text-white' : 'text-neutral-500'">
              {{ isStreamActive ? 'Señal: Excelente' : 'Señal: Sin Conexión' }}
            </span>
          </div>
          <div class="text-xs font-mono text-neutral-500">
            {{ currentTime }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-9 reveal delay-100">
          <div class="relative aspect-video bg-black border border-white/10 shadow-2xl group overflow-hidden rounded-sm">
            
            <div v-if="!isStreamActive" class="absolute inset-0 flex flex-col items-center justify-center overflow-hidden group bg-black">
              
              <div class="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200" 
                  alt="Sin Señal"
                  class="w-full h-full object-cover grayscale contrast-125 brightness-[0.4] scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80"></div>
                <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 mix-blend-overlay"></div>
              </div>

              <div class="relative z-10 flex flex-col items-center text-center p-4 md:p-8 animate-fade-in w-full">
                
                <div class="mb-3 md:mb-8 p-3 md:p-5 bg-white/5 rounded-full border border-white/10 animate-pulse-slow backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-12 md:w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.829-2.829m0 0l2.829-2.829m-2.829 2.829L3 21M6.343 4.636a9 9 0 0112.728 0M12 3v3m0 12v3m0-12l-3-3m3 3l3-3m-6 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>

                <h3 class="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white mb-1 md:mb-3 glitch-text leading-none">
                  SEÑAL PERDIDA
                </h3>
                
                <p class="font-mono text-[10px] md:text-base text-neutral-400 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-10 border-b border-red-500/30 pb-2 md:pb-4">
                  TRANSMISIÓN OFFLINE • EN ESPERA
                </p>

                <button 
                  @click="isStreamActive = true"
                  class="group/btn relative inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-4 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] overflow-hidden bg-red-600 text-white transition-all duration-300 hover:bg-white hover:text-black focus:outline-none clip-path-slant"
                >
                  <span class="relative z-10 flex items-center gap-2 md:gap-3">
                    <span class="text-sm md:text-lg">▶</span> INICIAR VISUALIZACIÓN
                  </span>
                  <div class="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 bg-white transition-transform duration-300 ease-out"></div>
                </button>
              </div>

            </div>
            
            <div v-else class="w-full h-full relative bg-black">
               <iframe 
                :src="currentStream" 
                class="w-full h-full object-cover"
                title="Live Player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
              ></iframe>
              <button 
                @click="isStreamActive = false" 
                class="absolute top-4 right-4 z-20 flex items-center gap-2 text-white/70 hover:text-white text-[10px] uppercase font-bold tracking-widest bg-black/60 hover:bg-red-600/80 px-4 py-2 rounded-sm backdrop-blur-md transition-all border border-white/10 hover:border-red-500/50"
              >
                <span>✕</span> DETENER
              </button>
              
              <div class="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-lg z-20 pointer-events-none">
                <span class="animate-pulse">●</span> EN VIVO
              </div>
            </div>

          </div>

          <div class="mt-6 flex justify-between items-start p-4 border border-white/5 bg-white/[0.02]">
            <div>
              <h2 class="text-xl md:text-2xl font-bold uppercase mb-1 leading-none">{{ activeTitle }}</h2>
              <p class="text-neutral-400 text-sm font-mono flex items-center gap-2">
                <span class="w-2 h-2 bg-red-500 rounded-full"></span> {{ activeDj }}
              </p>
            </div>
            <button class="hidden md:block px-6 py-2 border border-white/20 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-colors">
              COMPARTIR
            </button>
          </div>
        </div>

        <div class="lg:col-span-3 flex flex-col gap-4 reveal delay-200">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 border-b border-white/10 pb-2">Sets Anteriores</h3>
          <div v-for="(set, index) in pastSets" :key="index" @click="changeStream(set)" class="group flex gap-4 p-3 border border-transparent hover:border-white/20 hover:bg-white/5 cursor-pointer transition-all rounded-sm" :class="{ 'border-yellow-500/50 bg-yellow-500/5': activeId === set.id }">
            <div class="relative w-24 h-16 bg-neutral-800 overflow-hidden shrink-0 rounded-sm">
              <img :src="set.thumb" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                   <div class="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <span class="text-xs font-bold text-white uppercase line-clamp-1 group-hover:text-yellow-400 transition-colors">{{ set.title }}</span>
              <span class="text-[10px] text-neutral-500 font-mono mt-1">{{ set.dj }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollReveal } from '../../composables/useScrollReveal'; 

useScrollReveal();

const isStreamActive = ref(false);
const currentTime = ref('');
const activeId = ref(null);
const activeTitle = ref('Esperando Señal...');
const activeDj = ref('Santiago Sur Live');
const currentStream = ref('https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0'); 

const pastSets = [
  { id: 1, title: 'Techno Sunset Vol 6', dj: 'Vromtier', date: '12 ENE 2024', thumb: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=400', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1' },
  { id: 2, title: 'The Match 2024', dj: 'Badbast', date: '31 DIC 2023', thumb: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=400', url: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1' },
  { id: 3, title: 'Boiler Room SS', dj: 'Jxvi', date: '15 NOV 2023', thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400', url: 'https://www.youtube.com/embed/MVPTGNGiI-4?autoplay=1' }
];

const changeStream = (set) => {
  currentStream.value = set.url;
  activeTitle.value = set.title;
  activeDj.value = set.dj;
  activeId.value = set.id;
  isStreamActive.value = true; 
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('es-CL', { hour12: false }) + ' CLST';
};

let clockInterval;
onMounted(() => {
  updateTime();
  clockInterval = setInterval(updateTime, 1000);
});
onUnmounted(() => {
  clearInterval(clockInterval);
});
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}
@keyframes fadeIn {
  to { opacity: 1; }
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.glitch-text {
  text-shadow: 2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,255,255,0.5);
}

.clip-path-slant {
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
}
</style>