<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-black">
    
    <div class="absolute inset-0 z-0">
      <TransitionGroup name="fade-bg">
        <div :key="currentSlide" class="absolute inset-0">
            
            <img 
              :src="slides[currentSlide].image" 
              alt="Hero Background" 
              class="w-full h-full object-cover animate-slow-zoom"
              :class="slides[currentSlide].isSpecial 
                ? 'opacity-100 brightness-110 contrast-110' 
                : 'opacity-50 grayscale contrast-125'" 
            />
            
            <div 
              class="absolute inset-0"
              :class="[
                // Caso 1: The Match (Morado)
                slides[currentSlide].id === 2 
                  ? 'bg-gradient-to-t from-[#2e1065] via-[#2e1065]/20 to-[#1a0b2e]/30'
                // Caso 2: Techno Sunset (Negro/Oscuro para resaltar el rojo)
                : slides[currentSlide].id === 3
                  ? 'bg-gradient-to-t from-black via-black/50 to-transparent'
                // Caso 3: Genérico
                  : 'bg-gradient-to-t from-black via-black/40 to-transparent'
              ]"
            ></div>

            <vue-particles
              v-if="slides[currentSlide].id === 2"
              id="hero-fireworks"
              :options="fireworksOptions"
              class="absolute inset-0 z-[5] pointer-events-none bg-transparent" 
            />

        </div>
      </TransitionGroup>
    </div>

    <div class="relative z-1 text-center px-4 max-w-7xl mx-auto mt-16 w-full">
      
      <Transition name="fade-up" mode="out-in">
        <div :key="currentSlide" class="flex flex-col items-center">
          
          <img 
            v-if="slides[currentSlide].logo"
            :src="slides[currentSlide].logo"
            alt="SS Logo"
            class="w-35 h-35 md:w-40 md:h-40 object-contain mb-6 animate-slide-in delay-100 opacity-80"
          />
          
          <h2 
            class="text-xs md:text-sm font-bold tracking-[0.6em] mb-6 uppercase animate-slide-in"
            :class="slides[currentSlide].isSpecial ? 'text-yellow-400 drop-shadow-lg' : 'text-neutral-400'"
          >
            {{ slides[currentSlide].subtitle }}
          </h2>
          
          <div class="mb-8 animate-slide-in delay-100">
             <h1 
               class="text-5xl md:text-9xl font-bold tracking-tighter leading-none select-none uppercase"
               :class="slides[currentSlide].isSpecial ? 'drop-shadow-2xl' : 'text-white'"
             >
               <span v-html="slides[currentSlide].title"></span>
             </h1>
          </div>
          
          <p 
            v-if="slides[currentSlide].desc" 
            class="font-serif italic text-xl md:text-3xl mb-10 max-w-3xl animate-slide-in delay-200"
            :class="slides[currentSlide].isSpecial ? 'text-white drop-shadow-md' : 'text-neutral-400'"
          >
             {{ slides[currentSlide].desc }}
          </p>
          
          <div class="flex flex-col md:flex-row gap-6 justify-center items-center mt-4 animate-slide-in delay-300">
            
            <button 
                @click="handleMainAction"
                class="min-w-[200px] px-10 py-5 font-bold text-xs tracking-widest uppercase transition duration-300 shadow-2xl hover:scale-105"
                :class="getPrimaryButtonClass(slides[currentSlide])"
            >
              {{ slides[currentSlide].ctaPrimary }}
            </button>

          </div>

        </div>
      </Transition>

    </div>

    <div class="absolute bottom-12 flex gap-4 z-20">
        <button 
            v-for="(slide, index) in slides" 
            :key="index" 
            @click="setSlide(index)"
            :class="['h-1 transition-all duration-500 rounded-full shadow-lg', currentSlide === index ? 'w-12 bg-white' : 'w-4 bg-white/40 hover:bg-white/80']"
        ></button>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { PlayIcon } from '@heroicons/vue/24/solid';

// IMPORTACIÓN DE IMÁGENES LOCALES
// Asegúrate de tener las imágenes en estas rutas
import TheMatchBackground from '../../assets/img/TheMatch/TheMatchBackground.png';
import TechnoSunsetBackground from '../../assets/img/TechnoSunset/TechnoSunsetBackground.png';

import ssLogo from '../../assets/img/logoSS/SS santiago sur negativo PNG.png';

const emit = defineEmits(['openMatchDetails', 'openTechnoDetails']);

// CONFIGURACIÓN DE PARTÍCULAS (Solo para The Match)
const fireworksOptions = {
  preset: "fireworks",
  fullScreen: { enable: false },
  background: { color: { value: "transparent" }, opacity: 0 },
  sounds: { enable: false },
  particles: {
    number: { value: 0 },
    color: { value: ["#FACC15", "#A855F7", "#FFFFFF"] }
  },
  particles: {
    number: { value: 0 },
    color: { value: ["#FACC15", "#A855F7", "#FFFFFF"] },
    // Desactivamos el 'trail' para que no pinte negro sobre tu foto
    move: {
      trail: {
        enable: false 
      }
    }
  },
  emitters: {
    direction: "top",
    life: { count: 0, duration: 0.1, delay: 0.1 },
    rate: { delay: 0.15, quantity: 1 },
    size: { width: 100, height: 0 },
    position: { y: 100, x: 50 }
  }
};

// DATOS DEL CARRUSEL
const slides = [
  {
    id: 1,
    isSpecial: false, 
    subtitle: 'Producción & Eventos',
    logo: ssLogo,
    title: 'Sonido <br /> <span class="text-neutral-500 font-serif italic">Atemporal</span>',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ctaPrimary: 'Ver Agenda',
    hasIcon: true
  },
  {
    id: 2,
    // THE MATCH
    isSpecial: true, 
    subtitle: '31 DIC • Academia Renacer',
    title: `
      <span class="block text-white mb-2 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">THE MATCH!</span>
      <span class="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 font-extrabold drop-shadow-sm">2026</span>
    `,
    desc: 'Se va el año. Llega el Match.',
    image: TheMatchBackground, 
    ctaPrimary: 'Más Información',
    hasIcon: false
  },
  {
    id: 3,
    // TECHNO SUNSET
    isSpecial: true, 
    subtitle: '08 FEB • EL RECURSO, BUIN',
    title: `
      <span class="block text-white font-black tracking-tighter drop-shadow-md mb-2">TECHNO</span>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-white font-black italic tracking-widest drop-shadow-sm">SUNSET</span>
    `,
    desc: 'Vol 7 - All Night Long Edition.',
    image: TechnoSunsetBackground, 
    ctaPrimary: 'Más Información',
    hasIcon: false
  }
];

const currentSlide = ref(0);
let timer = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const setSlide = (index) => {
  currentSlide.value = index;
  resetTimer();
};

const resetTimer = () => {
  clearInterval(timer);
  timer = setInterval(nextSlide, 6000);
};

// Función para estilizar el botón principal según el evento
const getPrimaryButtonClass = (slide) => {
  if (!slide.isSpecial) {
    return 'bg-white text-black hover:bg-neutral-300';
  }
  if (slide.id === 2) { // The Match (Dorado)
    return 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-black border border-yellow-300';
  }
  if (slide.id === 3) { // Techno Sunset (Rojo/Blanco)
    return 'bg-white text-black hover:bg-red-600 hover:text-white border border-white hover:border-red-600';
  }
  return 'bg-white text-black';
};

const handleMainAction = () => {
  const currentId = slides[currentSlide.value].id;
  
  if (currentId === 2) {
    emit('openMatchDetails'); 
  } else if (currentId === 3) {
    emit('openTechnoDetails');
  } else {
    const eventSection = document.getElementById('eventos');
    if(eventSection) eventSection.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  timer = setInterval(nextSlide, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.animate-slow-zoom {
  animation: zoomBg 10s infinite alternate linear;
}
@keyframes zoomBg {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}

.fade-bg-enter-active, .fade-bg-leave-active { transition: opacity 1.5s ease-in-out; }
.fade-bg-enter-from, .fade-bg-leave-to { opacity: 0; }

.fade-up-enter-active, .fade-up-leave-active { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up-enter-from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
.fade-up-leave-to { opacity: 0; transform: translateY(-30px); filter: blur(10px); }

.animate-slide-in { animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
@keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
</style>


