<template>
  <section class="py-32 px-6 md:px-12 max-w-[1800px] mx-auto min-h-screen">
    
    <div class="reveal mb-16 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
      <div>
        <h2 class="text-xs font-bold tracking-[0.4em] uppercase text-neutral-500 mb-4">StgoSur Studio</h2>
        <p class="text-4xl md:text-6xl font-light text-white">
          SESIONES
        </p>
      </div>

      <div class="flex gap-8 mt-8 md:mt-0">
        <button 
          @click="manualSwitch('videos')"
          class="text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative pb-2"
          :class="activeTab === 'videos' ? 'text-white' : 'text-neutral-600 hover:text-white'"
        >
          Live Sets
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-left" :class="activeTab === 'videos' ? 'scale-x-100' : 'scale-x-0'"></span>
        </button>

        <button 
          @click="manualSwitch('photos')"
          class="text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative pb-2"
          :class="activeTab === 'photos' ? 'text-white' : 'text-neutral-600 hover:text-white'"
        >
          Galería
          <span class="absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-left" :class="activeTab === 'photos' ? 'scale-x-100' : 'scale-x-0'"></span>
        </button>
      </div>
    </div>

    <div 
      @mouseenter="isHovering = true" 
      @mouseleave="isHovering = false"
      class="min-h-[600px]" 
    >
      <Transition name="fade-tab" mode="out-in">
        
        <div v-if="activeTab === 'videos'" key="videos" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div 
            v-for="(session, index) in sessions" 
            :key="session.id"
            :class="[
              'relative group overflow-hidden rounded-sm bg-neutral-900',
              index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square md:aspect-[4/3]'
            ]"
          >
            <div v-if="activeVideo === session.id" class="absolute inset-0 w-full h-full z-20 bg-black">
                <iframe 
                  :src="`https://www.youtube.com/embed/${session.id}?autoplay=1&rel=0&modestbranding=1&color=white`" 
                  title="YouTube video player" 
                  class="w-full h-full"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
                <button @click.stop="activeVideo = null" class="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">✕</button>
            </div>

            <button 
              v-else 
              @click="activeVideo = session.id"
              class="absolute inset-0 w-full h-full block text-left"
            >
              <img :src="`https://img.youtube.com/vi/${session.id}/maxresdefault.jpg`" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              
              <div class="absolute bottom-8 left-8 pointer-events-none">
                 <h3 class="font-bold uppercase tracking-tighter text-white mb-2" :class="index === 0 ? 'text-4xl' : 'text-2xl'">{{ session.title }}</h3>
                 <p class="text-xs font-mono text-neutral-300 uppercase tracking-widest">{{ session.subtitle }}</p>
              </div>

              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                 <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </button>
          </div>
        </div>

        <div v-else key="photos" class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          <div 
            v-for="(photo, index) in gallery" 
            :key="index" 
            class="relative group cursor-pointer overflow-hidden"
            :class="getGridClass(index)" 
            @click="openLightbox(photo)"
          >
            <img 
              :src="photo.src" 
              class="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-difference">
              <h3 class="text-4xl md:text-7xl font-black uppercase tracking-tighter text-transparent stroke-text text-center leading-none transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {{ photo.title }}
              </h3>
            </div>

            <div class="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
               <span class="bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                 {{ photo.category }}
               </span>
            </div>

            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 transform translate-y-4 group-hover:translate-y-0">
               <span class="px-6 py-2 bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:bg-white transition-colors">
                 Ver Foto
               </span>
            </div>

          </div>
        </div>

      </Transition>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedPhoto" class="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" @click="selectedPhoto = null">
          <button class="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 flex flex-col items-center gap-1 group">
             <span class="text-2xl group-hover:rotate-90 transition-transform duration-300">×</span>
             <span class="text-[9px] font-bold uppercase tracking-widest">Cerrar</span>
          </button>
          <img 
            :src="selectedPhoto.src" 
            class="max-w-full max-h-[90vh] object-contain shadow-2xl"
            @click.stop 
          />
          <div class="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <p class="text-white font-mono text-sm uppercase tracking-widest opacity-70">{{ selectedPhoto.title }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref('videos');
const activeVideo = ref(null);
const selectedPhoto = ref(null);
const isHovering = ref(false);
let autoSwitchTimer = null;

const manualSwitch = (tab) => {
  activeTab.value = tab;
  activeVideo.value = null;
  resetTimer();
};

const switchTab = (tab) => {
  activeTab.value = tab;
  activeVideo.value = null;
};

const openLightbox = (photo) => {
  selectedPhoto.value = photo;
};

const startTimer = () => {
  clearInterval(autoSwitchTimer);
  autoSwitchTimer = setInterval(() => {
    if (activeVideo.value) return;
    if (selectedPhoto.value) return;
    if (isHovering.value) return;
    const nextTab = activeTab.value === 'videos' ? 'photos' : 'videos';
    switchTab(nextTab);
  }, 15000);
};

const resetTimer = () => {
  clearInterval(autoSwitchTimer);
  startTimer();
};

const getGridClass = (index) => {
  const patterns = [
    'md:col-span-8', 'md:col-span-4', 
    'md:col-span-4', 'md:col-span-4', 'md:col-span-4', 
    'md:col-span-12 !h-[500px]',
  ];
  return patterns[index % patterns.length];
};

const sessions = ref([
  { id: '178Y9GaXhQQ', title: 'Sesión Principal', subtitle: 'Live at Studio A' },
  { id: 'UIW-BgozHHI', title: 'Acústico', subtitle: 'Raw Session' },
  { id: '6F_g_ZIPwqw', title: 'Experimental', subtitle: 'Sound Design' },
]);



const gallery = ref([
  { src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200', title: 'Studio A', category: 'Recording' },
  { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800', title: 'Techno', category: 'Live Set' },
  { src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800', title: 'Analog', category: 'Details' },
  { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800', title: 'Energy', category: 'Crowd' },
  { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800', title: 'Vocal', category: 'Session' },
  { src: 'https://images.unsplash.com/photo-1574169208507-84376194878d?q=80&w=1600', title: 'Atmosphere', category: 'Stage' },
]);

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(autoSwitchTimer);
});
</script>

<style scoped>
.stroke-text { -webkit-text-stroke: 2px white; color: transparent; }
.fade-tab-enter-active, .fade-tab-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-tab-enter-from { opacity: 0; transform: translateY(20px); }
.fade-tab-leave-to { opacity: 0; transform: translateY(-20px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>