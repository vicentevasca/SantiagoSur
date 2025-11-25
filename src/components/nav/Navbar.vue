<template>
  <nav 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="isScrolled 
      ? 'bg-black/95 backdrop-blur-md py-4 border-b border-neutral-900 shadow-xl' 
      : 'bg-black/95 backdrop-blur-md py-4 border-b border-neutral-900 shadow-xl lg:bg-transparent lg:backdrop-blur-none lg:py-8 lg:border-transparent lg:shadow-none'"
  >
    <div class="max-w-[1920px] mx-auto px-6 flex justify-between items-center relative">
      
      <div 
        @click="scrollToSection('hero')" 
        class="text-xl font-bold tracking-[0.3em] uppercase cursor-pointer z-20 group text-white"
      >
        <span class="font-light group-hover:text-yellow-400 transition-colors duration-300">SANTIAGO</span>SUR
      </div>

      <div class="hidden md:block md:ml-auto 2xl:absolute 2xl:left-1/2 2xl:-translate-x-1/2 2xl:ml-0 z-20">
        <button 
          @click="$emit('openMatchDetails')"
          class="match-trigger relative group px-10 py-3 bg-neutral-900 text-white font-extrabold text-xs tracking-widest uppercase overflow-hidden rounded-full border border-yellow-500/30 transition-all duration-500 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105"
          data-cursor="match" 
        >
          <div class="absolute inset-0 bg-gradient-to-b from-yellow-900/40 via-purple-900/40 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

          <span class="relative z-20 flex items-center gap-2 pointer-events-none group-hover:text-yellow-200 transition-colors">
            <span class="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_yellow] group-hover:animate-pulse"></span>
            The Match 2026
          </span>
          
          <div class="absolute inset-0 z-10 pointer-events-none w-full h-full">
            <i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i><i class="spark s4"></i><i class="spark s5"></i>
            <i class="spark s6"></i><i class="spark s7"></i><i class="spark s8"></i><i class="spark s9"></i><i class="spark s10"></i>
          </div>
          
          <div class="absolute top-0 left-0 w-full h-[1px] bg-white shadow-[0_0_15px_white] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
        </button>
      </div>

      <div class="hidden md:flex items-center gap-12 z-20">
        <ul class="flex gap-12 text-xs font-bold tracking-widest uppercase text-white">
          <li @click="scrollToSection('servicios')" class="cursor-pointer hover:text-neutral-400 transition-colors">Servicios</li>
          <li @click="scrollToSection('eventos')" class="cursor-pointer hover:text-neutral-400 transition-colors">Agenda</li>
          <li @click="scrollToSection('artistas')" class="cursor-pointer hover:text-neutral-400 transition-colors">Residentes</li>
          <li @click="scrollToSection('estudio')" class="cursor-pointer hover:text-neutral-400 transition-colors">Estudio</li>
        </ul>
      </div>

      <button @click="toggleMenu" class="md:hidden uppercase text-xs font-bold tracking-widest text-white z-20 hover:text-yellow-400 transition-colors">
        {{ isMenuOpen ? '' : 'Menu' }}
      </button>

    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-between py-12 px-6 h-screen w-full overflow-hidden">
        
        <div class="relative mt-8 flex items-center justify-center">
          <div class="w-40 h-40 rounded-full shadow-2xl animate-spin-slow vinyl-record relative flex items-center justify-center border border-neutral-800">
             <div class="absolute inset-0 rounded-full vinyl-sheen"></div>
             <div class="w-12 h-12 bg-black rounded-full border border-yellow-500/20"></div>
          </div>
          <div class="absolute z-10 font-extrabold text-6xl text-yellow-500 tracking-tighter drop-shadow-md select-none">
            <span class="text-black [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:1px_white]">SS</span>
          </div>
        </div>

        <div class="flex flex-col items-center space-y-6">
          <a @click="scrollToSection('servicios')" class="text-2xl font-light uppercase tracking-[0.2em] text-white hover:text-yellow-400 transition-colors cursor-pointer">Servicios</a>
          <a @click="scrollToSection('eventos')" class="text-2xl font-light uppercase tracking-[0.2em] text-white hover:text-yellow-400 transition-colors cursor-pointer">Agenda</a>
          <a @click="scrollToSection('artistas')" class="text-2xl font-light uppercase tracking-[0.2em] text-white hover:text-yellow-400 transition-colors cursor-pointer">Residentes</a>
          <a @click="scrollToSection('estudio')" class="text-2xl font-light uppercase tracking-[0.2em] text-white hover:text-yellow-400 transition-colors cursor-pointer">Estudio</a>
          
          <button 
            @click="$emit('openMatchDetails'); toggleMenu()"
            class="mt-4 px-8 py-3 border border-yellow-500/50 text-yellow-400 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-yellow-500 hover:text-black transition-all"
          >
            The Match 2026
          </button>
        </div>

        <button 
          @click="toggleMenu" 
          class="mb-8 flex flex-col items-center gap-2 group text-neutral-500 hover:text-white transition-colors"
        >
          <span class="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">×</span>
          <span class="text-[10px] font-bold uppercase tracking-widest">Cerrar Menú</span>
        </button>

      </div>
    </Transition>
    
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // 1. Importamos el Router

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['openMatchDetails']);

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if(isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// --- FUNCIÓN UNIFICADA DE NAVEGACIÓN ---
const scrollToSection = async (id) => {
  // 1. Cerrar menú móvil si está abierto
  if(isMenuOpen.value) toggleMenu(); 

  // 2. Caso especial: Ir a la página de artistas
  if (id === 'artistas') {
    await router.push('/artistas');
    return;
  }

  // 3. Caso normal (Home y secciones)
  if (route.path !== '/') {
    // Si no estamos en home, vamos al home primero
    await router.push('/');
    // Esperamos un poco para que cargue el componente Home
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  } else {
    // Si ya estamos en home, solo hacemos scroll
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* VINILO & ANIMACIONES */
.vinyl-record {
  background: repeating-radial-gradient(#1a1a1a 0, #1a1a1a 2px, #000 3px, #000 4px);
}
.vinyl-sheen {
  background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
  pointer-events: none;
}
.animate-spin-slow { animation: spin 8s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* CHISPAS */
.spark { position: absolute; top: 0; width: 2px; height: 8px; background-color: white; border-radius: 4px; opacity: 0; transform: translateY(-10px); }
.group:hover .spark { animation: fireworkRain linear infinite; }
@keyframes fireworkRain {
  0% { transform: translateY(0) scaleY(1); opacity: 1; background-color: #ffffff; }
  40% { background-color: #FACC15; opacity: 1; }
  100% { transform: translateY(50px) scaleY(0.5); background-color: #A855F7; opacity: 0; }
}

/* POSICIONES ALEATORIAS */
.s1 { left: 10%; animation-duration: 0.6s; animation-delay: 0.1s; }
.s2 { left: 20%; animation-duration: 0.9s; animation-delay: 0.3s; }
.s3 { left: 35%; animation-duration: 0.7s; animation-delay: 0.5s; }
.s4 { left: 50%; animation-duration: 1.1s; animation-delay: 0.0s; }
.s5 { left: 65%; animation-duration: 0.8s; animation-delay: 0.2s; }
.s6 { left: 80%; animation-duration: 1.0s; animation-delay: 0.4s; }
.s7 { left: 15%; animation-duration: 1.2s; animation-delay: 0.6s; }
.s8 { left: 55%; animation-duration: 0.5s; animation-delay: 0.2s; }
.s9 { left: 90%; animation-duration: 0.9s; animation-delay: 0.1s; }
.s10 { left: 40%; animation-duration: 1.3s; animation-delay: 0.0s; }

/* TRANSICIONES */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>