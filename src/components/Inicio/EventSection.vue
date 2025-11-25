<template>
  <section class="relative py-32 bg-black text-white px-6 md:px-12 overflow-hidden" id="eventos">
    
    <div class="max-w-[1800px] mx-auto mb-20 flex flex-col md:flex-row items-end justify-between reveal">
      <div>
        <h2 class="text-xs font-bold tracking-[0.4em] uppercase text-neutral-500 mb-4">Temporada 2025</h2>
        <h3 class="text-5xl md:text-8xl font-medium tracking-tighter uppercase">Agenda</h3>
      </div>
      
      <a href="#" class="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-yellow-400 transition-colors mt-8 md:mt-0 group">
        Calendario Completo 
        <span class="transform group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>

    <div class="max-w-[1800px] mx-auto border-t border-white/20">
      
      <div 
        v-for="(event, index) in events" 
        :key="event.id"
        class="group relative border-b border-white/20 transition-all duration-500 hover:border-white/50 reveal"
        :class="`delay-${index * 100}`"
      >
        
        <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden pointer-events-none">
          <img 
            :src="event.image" 
            class="w-full h-full object-cover grayscale opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[2s]" 
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div class="relative z-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-12 pl-4 group-hover:pl-8 transition-all duration-500">
          
          <div class="md:col-span-3 flex flex-col">
            <span class="text-6xl md:text-8xl font-bold tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-neutral-500 transition-all duration-500">
              {{ event.day }}
            </span>
            <span class="text-sm font-bold tracking-[0.4em] uppercase text-neutral-500 mt-2 ml-1">
              {{ event.month }} / {{ event.year }}
            </span>
          </div>

          <div class="md:col-span-6">
            <div class="flex items-center gap-4 mb-2">
              <h4 class="text-3xl md:text-5xl font-light uppercase tracking-tight">{{ event.title }}</h4>
              <span v-if="event.soldOut" class="px-3 py-1 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full animate-pulse">
                Sold Out
              </span>
            </div>
            <p class="text-neutral-400 font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300">
              {{ event.location }} • {{ event.time }}
            </p>
          </div>

          <div class="md:col-span-3 flex justify-start md:justify-end pr-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-x-10 md:group-hover:translate-x-0 transition-all duration-500 ease-out">
            
            <button 
              v-if="!event.soldOut"
              @click="openTicket(event)" 
              class="relative px-8 py-4 bg-white text-black font-extrabold text-xs tracking-widest uppercase overflow-hidden hover:bg-yellow-400 transition-colors duration-300"
            >
              <span class="relative z-10">Consigue tu ticket</span>
            </button>

            <span v-else class="text-neutral-600 font-serif italic text-xl">
              Lista de espera
            </span>
          </div>

        </div>
      </div>

    </div>

    <Teleport to="body">
      
      <Transition name="fade">
        <TicketModal 
          v-if="selectedEvent" 
          :eventData="selectedEvent" 
          @close="selectedEvent = null" 
        />
      </Transition>

      <Transition name="fade">
        <TheMatchDetail 
          v-if="showMatchDetail" 
          @close="showMatchDetail = false" 
        />
      </Transition>

      <Transition name="fade">
        <TechnoSunsetDetail 
          v-if="showTechnoDetail" 
          @close="showTechnoDetail = false" 
        />
      </Transition>

    </Teleport>

  </section>
</template>

<script setup>
import { ref } from 'vue';

// IMPORTAR COMPONENTES
import TicketModal from '../ui/TicketModal.vue';
import TheMatchDetail from '../events/TheMatchDetail.vue';
import TechnoSunsetDetail from '../events/TechnoSunsetDetail.vue';

// IMPORTAR IMÁGENES
import TheMatchBackground from '../../assets/img/TheMatch/TheMatchBackground.png';
import TechnoSunsetBackground from '../../assets/img/TechnoSunset/TechnoSunsetBackground.png';

// ESTADOS DE VISIBILIDAD
const selectedEvent = ref(null); // Para modal genérico
const showMatchDetail = ref(false);
const showTechnoDetail = ref(false);

// DATOS
const events = ref([
  { 
    id: 1, 
    day: '31', 
    month: 'Diciembre', 
    year: '2025',
    title: 'The Match', 
    location: 'Academia Renacer', 
    time: '22:00 HRS',
    image: TheMatchBackground,
    soldOut: false
  },
  { 
    id: 2, 
    day: '08', 
    month: 'Febrero', 
    year: '2025',
    title: 'Techno Sunset vol. 7', 
    location: 'El Recurso, Buin', 
    time: '17:00 HRS',
    image: TechnoSunsetBackground,
    // Cambiado a false para que puedas probar el botón
    soldOut: false 
  },
  { 
    id: 3, 
    day: '15', 
    month: 'NOV', 
    year: '2025',
    title: 'Neon Nights', 
    location: 'Club Hípico', 
    time: '00:00 HRS',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000',
    soldOut: false
  },
]);

// LÓGICA DE APERTURA
const openTicket = (event) => {
  if (event.id === 1) {
    // Abrir The Match
    showMatchDetail.value = true;
  } else if (event.id === 2) {
    // Abrir Techno Sunset
    showTechnoDetail.value = true;
  } else {
    // Abrir Genérico (Neon Nights u otros futuros)
    selectedEvent.value = {
      title: event.title,
      date: `${event.day} ${event.month}`,
      time: event.time,
      id: `SS-${event.year}-${event.id}`,
      image: event.image
    };
  }
};
</script>

<style scoped>
.delay-0 { transition-delay: 0ms; }
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>