<template>
  <div class="bg-black min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black relative">
    
    <Navbar 
      @openMatchDetails="showMatchDetail = true" 
      class="transition-all duration-700" 
      :class="{ '-translate-y-full': isAnyModalOpen }" 
    />
    
    <main 
      class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top"
      :class="isAnyModalOpen ? 'scale-95 opacity-30 blur-sm brightness-50 pointer-events-none grayscale' : 'scale-100 opacity-100 blur-0'"
    >
      <router-view 
        @openMatchDetails="showMatchDetail = true"
        @openTechnoDetails="showTechnoDetail = true"
      />
    </main>
    
    <Transition name="fade">
      <TheMatchDetail v-if="showMatchDetail" @close="showMatchDetail = false" />
    </Transition>

    <Transition name="fade">
      <TechnoSunsetDetail v-if="showTechnoDetail" @close="showTechnoDetail = false" />
    </Transition>

    <div :class="isAnyModalOpen ? 'scale-95 opacity-30 blur-sm' : 'scale-100 opacity-100'" class="transition-all duration-700">
       <AppFooter id="contacto" />
    </div>
    
    <CustomCursor /> 
    <AudioFader :class="{ 'opacity-0': isAnyModalOpen }" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/nav/Navbar.vue';
import AppFooter from './components/footer/AppFooter.vue';
import CustomCursor from './components/cursor/CustomCursor.vue';
import AudioFader from './components/sroll-bar/AudioFader.vue';
import TheMatchDetail from './components/events/TheMatchDetail.vue';
import TechnoSunsetDetail from './components/events/TechnoSunsetDetail.vue';
import ArtistModal from './components/artistas/ArtistModal.vue'; // O .ui/ArtistModal.vue según tu estructura
import Lenis from '@studio-freight/lenis';

// --- ROUTER & ESTADO ---
const route = useRoute();
const showMatchDetail = ref(false);
const showTechnoDetail = ref(false);
const selectedArtist = ref(null);

// --- COMPUTADA MAESTRA ---
const isAnyModalOpen = computed(() => {
  return showMatchDetail.value || showTechnoDetail.value || selectedArtist.value !== null;
});

// --- VARIABLES GLOBALES ---
let lenis;

// --- LIFECYCLE (SOLO LENIS) ---
onMounted(() => {
  // Iniciar Lenis (Scroll Suave)
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
});

onUnmounted(() => {
  if (lenis) lenis.destroy();
});

// --- VIGILANTE 1: MODALES ---
// Si se cierra un modal, recalculamos el tamaño de la página para el scroll
watch(isAnyModalOpen, async (isOpen) => {
  if (!isOpen) {
    await nextTick();
    setTimeout(() => {
      if (lenis) lenis.resize();
    }, 200);
  }
});

// --- VIGILANTE 2: RUTAS ---
// Al cambiar de página, hacemos scroll arriba y recalculamos Lenis
watch(() => route.path, async () => {
  await nextTick();
  window.scrollTo(0, 0);
  setTimeout(() => {
    if (lenis) lenis.resize();
  }, 300);
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

/* Retrasos escalonados */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }

/* Transición Fade Genérica (Para Modales) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>