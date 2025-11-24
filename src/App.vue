<template>
  <div class="bg-black min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black relative">
    
    <Navbar @openMatchDetails="showMatchDetail = true" class="transition-all duration-700" :class="{ '-translate-y-full': showMatchDetail }" />
    
    <main 
      class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top"
      :class="showMatchDetail ? 'scale-95 opacity-30 blur-sm brightness-50 pointer-events-none grayscale' : 'scale-100 opacity-100 blur-0'"
    >
      <HeroSection id="hero" @openMatchDetails="showMatchDetail = true" />
      <ServicesSection id="servicios" />
      <EventSection id="eventos" />
      <SessionSection id="estudio" />
    </main>
    
    <Transition name="premium-slide">
      <TheMatchDetail 
        v-if="showMatchDetail" 
        @close="showMatchDetail = false" 
      />
    </Transition>

    <div 
       class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
       :class="showMatchDetail ? 'scale-95 opacity-30 blur-sm brightness-50' : 'scale-100 opacity-100'"
    >
        <AppFooter id="contacto" />
    </div>
    
    <CustomCursor /> 
    <AudioFader :class="{ 'opacity-0': showMatchDetail }" class="transition-opacity duration-500" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'; // <--- 1. AGREGAR "watch"
import Navbar from './components/nav/Navbar.vue';
import HeroSection from './components/Inicio/HeroSection.vue';
import ServicesSection from './components/Inicio/ServicesSection.vue';
import EventSection from './components/Inicio/EventSection.vue';
import SessionSection from './components/Inicio/SessionSection.vue';
import AppFooter from './components/footer/AppFooter.vue';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './components/cursor/CustomCursor.vue';
import TheMatchDetail from './components/events/TheMatchDetail.vue';
import AudioFader from './components/sroll-bar/AudioFader.vue';

// --- ESTADO ---
const showMatchDetail = ref(false);

// --- VARIABLES GLOBALES ---
let observer;
let lenis;

// --- FUNCIÓN DE ACTIVACIÓN (La sacamos para poder re-usarla) ---
const initObserver = () => {
  // Desconectar el anterior si existe para no duplicar vigilantes
  if (observer) observer.disconnect();

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Opcional: Quita esto si no quieres que desaparezcan al subir
        // entry.target.classList.remove('active'); 
      }
    });
  }, options);

  // Buscar los NUEVOS elementos
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));
};

// --- LIFECYCLE ---
onMounted(async () => {
  // 1. Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Iniciar Observador por primera vez
  await nextTick();
  setTimeout(() => initObserver(), 100);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (lenis) lenis.destroy();
});

// --- 2. EL VIGILANTE (LA SOLUCIÓN) ---
// Observamos la variable showMatchDetail
watch(showMatchDetail, async (isOpen) => {
  // Si isOpen es false (significa que acabamos de cerrar el modal)
  if (!isOpen) {
    // Esperamos a que Vue reconstruya el <main>
    await nextTick();
    
    // Le damos un respiro y reactivamos las animaciones
    setTimeout(() => {
      initObserver(); 
      
      // Truco extra: Forzamos a Lenis a recalcular la altura de la página
      lenis.resize(); 
    }, 100);
  }
});
</script>

<style>
/* Estilos Globales de Animación */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Retrasos escalonados para listas */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }

/* Animación para la página de detalle (Slide desde abajo) */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}

.page-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.page-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* TRANSICIÓN PREMIUM (Estilo iOS) */
.premium-slide-enter-active,
.premium-slide-leave-active {
  /* Duración larga (800ms) y curva exponencial para suavidad extrema */
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.premium-slide-enter-from,
.premium-slide-leave-to {
  /* Empieza/Termina abajo de la pantalla (100% height) */
  transform: translateY(100%); 
}

.premium-slide-enter-to,
.premium-slide-leave-from {
  /* Posición final (pantalla completa) */
  transform: translateY(0);
}


</style>