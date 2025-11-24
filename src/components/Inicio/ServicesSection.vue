<template>
  <section class="relative py-32 bg-black overflow-hidden min-h-[90vh] flex items-center">
    
    <div class="absolute inset-0 z-0">
      
      <div class="absolute inset-0 bg-neutral-950 z-0"></div>

      <div 
        v-for="(service, index) in services" 
        :key="service.id"
        class="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out will-change-opacity"
        :class="activeService === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img 
          :src="service.image" 
          class="w-full h-full object-cover opacity-50 grayscale transition-transform duration-[10000ms] ease-linear"
          :class="activeService === index ? 'scale-110' : 'scale-100'"
        />
        
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>
    </div>

    <div class="relative z-20 max-w-[1800px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12">
      
      <div class="md:col-span-4 reveal">
        <h2 class="sticky top-32 text-xs font-bold tracking-[0.4em] uppercase text-neutral-500 mb-8">
          Nuestra Expertise
        </h2>
        <p class="text-neutral-400 text-sm max-w-xs leading-relaxed hidden md:block transition-opacity duration-500" :class="activeService !== null ? 'opacity-50' : 'opacity-100'">
          Combinamos tecnología de punta con dirección artística para crear momentos irrepetibles.
        </p>
      </div>

      <div class="md:col-span-8 space-y-2" @mouseleave="activeService = null">
        
        <div 
          v-for="(service, index) in services" 
          :key="service.id"
          @mouseenter="activeService = index"
          class="group relative border-t border-white/10 py-10 cursor-pointer reveal"
          :class="`delay-${index * 100}`"
        >
          <div class="flex justify-between items-center relative z-10 transition-transform duration-700 ease-out group-hover:translate-x-6">
            
            <h3 
              class="text-4xl md:text-7xl font-light uppercase tracking-tighter transition-all duration-500"
              :class="activeService === index ? 'text-white blur-0' : 'text-neutral-500 group-hover:text-white blur-[1px] group-hover:blur-0'"
            >
              {{ service.title }}
            </h3>

            <span class="text-2xl text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
              ↗
            </span>
          </div>

          <div 
            class="grid transition-all duration-700 ease-in-out"
            :class="activeService === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'"
          >
             <div class="overflow-hidden">
               <p class="text-neutral-400 text-lg font-light max-w-xl">
                 {{ service.desc }}
               </p>
             </div>
          </div>
        </div>

        <div class="border-t border-white/10"></div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeService = ref(null);

const services = [
  { 
    id: 1, 
    title: 'Event Production', 
    desc: 'Diseño integral de experiencias. Escenarios, iluminación DMX, sonido Line Array y logística de alto nivel.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    title: 'Artist Booking', 
    desc: 'Gestión de talento nacional e internacional. Conectamos tu evento con los artistas que definen la escena.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1770&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Studio & Mix', 
    desc: 'Ingeniería de sonido, mezcla y mastering en nuestro estudio tratado acústicamente.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1770&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    title: 'Visual Design', 
    desc: 'Creación de visuales reactivas, mapping y dirección de arte para pantallas LED gigantes.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1770&auto=format&fit=crop' 
  },
];
</script>

<style scoped>
/* Helpers para los delays del reveal inicial */
.delay-0 { transition-delay: 0ms; }
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
</style>