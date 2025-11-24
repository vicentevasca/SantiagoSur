<template>
  <div class="fixed top-0 right-0 h-full w-16 z-[60] hidden md:flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
    
    <div class="relative w-full h-[80vh] flex justify-center">
      
      <div class="absolute inset-y-0 w-[1px] bg-neutral-800"></div>

      <div class="absolute inset-0 flex flex-col justify-between items-center py-2">
        <div 
          v-for="i in 11" 
          :key="i" 
          class="w-3 h-[1px]"
          :class="[
            i === 1 || i === 11 ? 'bg-white w-6' : 'bg-neutral-700', // El primero y el último son más largos y blancos
            i === 6 ? 'bg-neutral-500 w-4' : '' // El del medio un poco más largo
          ]"
        ></div>
      </div>

      <div 
        class="absolute top-0 w-[2px] bg-white transition-all duration-75 ease-linear"
        :style="{ height: `${scrollPercent}%` }"
      ></div>

      <div 
        class="absolute left-1/2 -translate-x-1/2 w-8 h-12 bg-black border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center backdrop-blur-sm transition-all duration-75 ease-linear will-change-transform"
        :style="{ top: `calc(${scrollPercent}% - 24px)` }" 
      >
        <div class="w-full h-[2px] bg-white"></div>
      </div>

    </div>

    <div class="absolute bottom-10 text-[10px] font-mono text-neutral-600 rotate-90 tracking-widest uppercase">
      Master Vol
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrollPercent = ref(0);

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Evitar división por cero
  if (docHeight <= 0) {
    scrollPercent.value = 0;
    return;
  }

  const percent = (scrollTop / docHeight) * 100;
  // Limitamos entre 0 y 100 para que no se salga
  scrollPercent.value = Math.min(100, Math.max(0, percent));
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Calcular inicial
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Ajuste fino para que la perilla no se corte en los bordes */
</style>