<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    
    <div 
      class="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500 z-0" 
      @click="$emit('close')"
    ></div>

    <vue-particles
      id="ticket-particles"
      :options="particlesOptions"
      class="absolute inset-0 z-[5] pointer-events-none"
    />

    <div 
      class="relative z-10 w-full flex justify-center transition-all duration-500 ease-out"
      :class="isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
    >
      
      <div class="w-full max-w-[340px] md:max-w-[850px] aspect-[3/5] md:aspect-[2.4/1] bg-neutral-900 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col md:flex-row relative mx-auto">

        <div class="absolute inset-0 opacity-[0.04] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div class="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        
        <div class="absolute inset-0 border border-yellow-500/30 rounded-[2rem] z-50 pointer-events-none"></div>

        <div class="h-[55%] md:h-full md:w-[65%] relative overflow-hidden bg-black">
          <div class="absolute inset-0">
             <img :src="eventData.image" class="w-full h-full object-cover opacity-100" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

          <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 pr-4">
            <div class="flex items-center gap-3 mb-2 md:mb-3">
               <span class="px-2 py-0.5 md:px-3 md:py-1 bg-yellow-500 text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-sm">VIP Access</span>
               <span class="text-[9px] md:text-xs text-neutral-400 font-mono tracking-widest uppercase">Santiago Sur</span>
            </div>
            <h2 class="text-3xl md:text-6xl font-black uppercase leading-none text-white drop-shadow-lg italic tracking-tighter break-words">
              {{ eventData.title }}
            </h2>
          </div>
        </div>

        <div class="relative w-full h-px md:w-px md:h-full bg-transparent flex items-center justify-center z-20 my-[-1px] md:my-0">
           <div class="absolute inset-0 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-neutral-800"></div>
           <div class="absolute left-0 md:left-auto md:top-0 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-black rounded-full z-30"></div>
           <div class="absolute right-0 md:right-auto md:bottom-0 translate-x-1/2 md:translate-x-0 md:translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-black rounded-full z-30"></div>
        </div>

        <div class="h-[45%] md:h-full md:w-[35%] bg-neutral-900/80 backdrop-blur-md p-5 md:p-8 flex flex-col justify-between relative z-10">
          
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-[10rem] font-bold text-white/[0.03] -rotate-90 pointer-events-none select-none tracking-tighter">SS</div>

          <div class="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6 relative z-10">
             <div class="flex flex-col border-b border-white/10 pb-2">
               <span class="text-[9px] uppercase tracking-widest text-neutral-500">Fecha</span>
               <span class="text-lg md:text-xl font-mono text-white">{{ eventData.date }}</span>
             </div>
             <div class="flex flex-col border-b border-white/10 pb-2">
               <span class="text-[9px] uppercase tracking-widest text-neutral-500">Hora</span>
               <span class="text-lg md:text-xl font-mono text-white">{{ eventData.time }}</span>
             </div>
             <div class="col-span-2 md:col-span-1 flex flex-col border-b border-white/10 pb-2">
               <span class="text-[9px] uppercase tracking-widest text-neutral-500">Locación</span>
               <span class="text-sm md:text-base font-bold text-white truncate">{{ eventData.location || 'Secret Location' }}</span>
             </div>
          </div>

          <div class="mt-4 md:mt-6 relative z-20">
            <div class="grid grid-cols-2 gap-3">
              <a href="https://wa.me/56912345678" target="_blank" class="flex items-center justify-center gap-2 py-2.5 md:py-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-300 group/btn">
                <span class="w-4 h-4 fill-current group-hover/btn:text-white text-[#25D366] transition-colors">
                  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </span>
              </a>
              <a href="https://instagram.com/santiagosur" target="_blank" class="flex items-center justify-center gap-2 py-2.5 md:py-3 bg-[#E1306C]/10 border border-[#E1306C]/30 rounded-lg hover:bg-[#E1306C] hover:text-white transition-all duration-300 group/btn">
                <span class="w-4 h-4 fill-current group-hover/btn:text-white text-[#E1306C] transition-colors">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324ZM12 16a4 4 0 110-8 4 4 0 010 8Zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881Z"/></svg>
                </span>
              </a>
            </div>
          </div>

          <div class="hidden md:block mt-auto pt-4 border-t border-white/10 opacity-60 relative z-0">
             <div class="h-6 w-full bg-white bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EAN13.svg/1200px-EAN13.svg.png')] bg-cover mix-blend-screen"></div>
             <p class="text-[7px] text-center font-mono mt-1 text-neutral-500 tracking-[0.3em]">{{ eventData.id }}</p>
          </div>
        </div>

      </div>

    </div>
    
    <button @click="$emit('close')" class="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[100] flex flex-col items-center gap-1 group">
       <span class="text-2xl group-hover:rotate-90 transition-transform duration-300">×</span>
       <span class="text-[9px] font-bold uppercase tracking-widest">Cerrar</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  eventData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);
const isMounted = ref(false);

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  particles: {
    number: { value: 30, density: { enable: true, value_area: 800 } },
    color: { value: ["#FFD700", "#FFA500", "#FFC0CB"] },
    shape: { type: "circle" },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
    links: { enable: false },
    move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "repulse" }, resize: true },
    modes: { bubble: { distance: 250, size: 8, duration: 2, opacity: 0.5, speed: 3 }, repulse: { distance: 200, duration: 0.4 } },
  },
  retina_detect: true,
};

onMounted(() => {
  setTimeout(() => { isMounted.value = true; }, 50);
  window.addEventListener('keydown', handleKey);
});

const handleKey = (e) => {
  if (e.key === 'Escape') emit('close');
}

onUnmounted(() => window.removeEventListener('keydown', handleKey));
</script>

<style scoped>
</style>