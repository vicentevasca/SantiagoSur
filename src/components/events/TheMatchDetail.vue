<template>
  <div class="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-y-auto lg:overflow-hidden font-sans">
    
    <div 
      class="absolute inset-0 z-0 pointer-events-none bg-cover bg-center animate-slow-pan" 
      :style="{ backgroundImage: `url(${matchBg})` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black lg:bg-gradient-to-r lg:from-black/90 lg:via-black/70 lg:to-black/90"></div>
    </div>

    <div class="relative z-10 w-full h-full flex flex-col p-6 lg:p-8 lg:max-w-[1600px] lg:mx-auto">
      
      <button 
        @click="$emit('close')" 
        class="absolute top-6 right-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-yellow-400 transition group mix-blend-difference cursor-pointer"
      >
        <span class="text-xl group-hover:rotate-90 transition-transform duration-300">×</span> Cerrar
      </button>

      <div class="flex-none flex flex-col items-center mb-6 lg:mb-4 animate-fade-in-up">
        <div class="text-center mb-4">
          <div class="inline-block px-3 py-0.5 border border-yellow-500/30 rounded-full mb-2 backdrop-blur-sm">
            <p class="text-[9px] font-bold tracking-[0.2em] text-yellow-400 uppercase">¡Atención Buin!</p>
          </div>
          <h1 class="text-4xl lg:text-6xl font-black tracking-tighter leading-none uppercase drop-shadow-2xl">
            The <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">Match</span>
          </h1>
          <p class="text-sm lg:text-lg font-serif italic text-neutral-300 mt-1">Gala Año Nuevo 2026</p>
        </div>

        <div class="flex gap-8 border-b border-white/10 px-8">
          <button 
            @click="activeTab = 'info'"
            class="pb-2 text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative"
            :class="activeTab === 'info' ? 'text-white' : 'text-neutral-500 hover:text-white'"
          >
            Info & Tickets
            <span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'info' ? 'scale-x-100' : 'scale-x-0'"></span>
          </button>

          <button 
            @click="activeTab = 'lineup'"
            class="pb-2 text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative"
            :class="activeTab === 'lineup' ? 'text-white' : 'text-neutral-500 hover:text-white'"
          >
            Line Up
            <span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'lineup' ? 'scale-x-100' : 'scale-x-0'"></span>
          </button>
        </div>
      </div>

      <div class="flex-grow w-full min-h-0 relative">
        <Transition name="fade-tab" mode="out-in">
          
          <div v-if="activeTab === 'info'" key="info" class="h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch overflow-y-auto lg:overflow-visible">
            
            <div class="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div class="space-y-4">
                <p class="text-neutral-300 text-sm lg:text-base leading-relaxed">
                  ¡Empieza tu año en la mejor fiesta del sur de Santiago! Un spot con todo lo necesario para recibir el 2026.
                  <span class="text-yellow-400 font-serif italic block mt-1">"Brilla con tu mejor versión ✨"</span>
                </p>

                <div class="flex items-center gap-6 py-2 opacity-80">
      <img src="../../assets/img/marcas/beefeater-logo.avif" class="h-5 lg:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" alt="Beefeater">
      <img src="../../assets/img/marcas/alto.png" class="h-10 lg:h-25 object-contain grayscale hover:grayscale-0 transition-all duration-300" alt="Alto del Carmen">
      <img src="../../assets/img/marcas/Jack-Daniels-Logo.png" class="h-10 lg:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" alt="Jack Daniels">
      <img src="../../assets/img/marcas/red-bull-logo-black-and-white.png" class="h-10 lg:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" alt="Red Bull">
    </div>

                <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                   <div class="flex items-start gap-3">
                     <span class="text-lg">📍</span>
                     <div>
                       <span class="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">Ubicación</span>
                       <span class="text-sm font-bold text-white">Academia Renacer</span>
                       <span class="block text-[10px] text-neutral-500">Ruta 5 Sur 755, Buin</span>
                     </div>
                   </div>
                   <div class="flex items-start gap-3">
                     <span class="text-lg">💍</span>
                     <div>
                       <span class="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">Dress Code</span>
                       <span class="text-sm font-bold text-white">Gala - Semi Formal</span>
                     </div>
                   </div>
                   <div class="flex items-start gap-3">
                     <span class="text-lg">⏱️</span>
                     <div>
                       <span class="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">Horario</span>
                       <span class="text-sm font-bold text-white">12:30 AM - 7:00 AM</span>
                     </div>
                   </div>
                   <div class="col-span-2 flex flex-wrap gap-2 mt-2">
                      <span class="badge">🥂 Open Bar</span>
                      <span class="badge">💃 2 Ambientes</span>
                      <span class="badge">🌳 Open Air</span>
                      <span class="badge">👮🏻‍♂️ Seguridad</span>
                      <span class="badge">🍔 FoodTruck</span>
                   </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5 flex flex-col h-full lg:justify-center">
              <div class="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl relative flex flex-col max-h-full">
                
                <div class="space-y-2 mb-4 shrink-0">
                  <h3 class="text-[10px] font-bold uppercase tracking-widest text-white mb-2">🎫 Early Bird</h3>
                  <div class="ticket-row group">
                    <span class="text-sm font-bold text-white">Preventa 1 (hasta el 17 de diciembre)</span>
                    <span class="text-sm font-bold text-yellow-400">$20.000</span>
                  </div>
                  <div class="ticket-row group">
                    <span class="text-sm font-bold text-white">VIP</span>
                    <span class="text-sm font-bold text-white">$35.000</span>
                  </div>
                </div>

                <div class="border-t border-white/10 pt-4 flex-grow min-h-0 flex flex-col">
                   <h3 class="text-[10px] font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2 shrink-0">
                     👑 Vendedores Oficiales
                   </h3>
                   <div class="overflow-y-auto pr-2 grid grid-cols-2 gap-2 custom-scrollbar">
                     <a href="https://instagram.com/joselo.l" target="_blank" class="seller-btn">@joselo.l</a>
                     <a href="https://instagram.com/pablo_iignacio" target="_blank" class="seller-btn">@pablo_iignacio</a>
                     <a href="https://instagram.com/la_previa_paine" target="_blank" class="seller-btn">@la_previa_paine</a>
                     <a href="https://instagram.com/bar_bellavista_" target="_blank" class="seller-btn">@bar_bellavista_</a>
                     <a href="https://instagram.com/kxariv_" target="_blank" class="seller-btn">@kxariv_</a>
                     <a href="https://instagram.com/bernarditaaaah_" target="_blank" class="seller-btn">@bernarditaaaah_</a>
                     <a href="https://instagram.com/scarlettdiazs" target="_blank" class="seller-btn">@scarlettdiazs</a>
                     <a href="https://instagram.com/dawson.mlopezz" target="_blank" class="seller-btn">@dawson.mlopezz</a>
                   </div>
                </div>

                <div class="mt-4 pt-3 border-t border-white/10 shrink-0 flex justify-center gap-4">
                  <a href="https://www.instagram.com/thematch_fiesta/" target="_blank" class="social-icon-link"><span class="text-lg">📸</span> Instagram</a>
                  <a href="https://wa.me/56994223614" target="_blank" class="social-icon-link"><span class="text-lg">💬</span> WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'lineup'" key="lineup" class="h-full flex flex-col overflow-hidden">
            
            <div class="shrink-0 mb-6 flex justify-center">
              <div class="relative group cursor-pointer flex items-center gap-6 px-8 py-3 bg-gradient-to-r from-yellow-900/40 to-black border border-yellow-500/30 rounded-full hover:border-yellow-400 transition-all duration-300">
                
                <div class="flex items-center gap-3">
                  <div>
                    <h3 class="text-lg font-black uppercase tracking-tight text-white leading-none">Matías Ignacio</h3>
                    <p class="text-[10px] text-neutral-400 font-mono">@matias.ignaaacio</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-grow min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 overflow-y-auto lg:overflow-hidden pr-2 custom-scrollbar">

              <div class="flex flex-col h-full">
                <div class="flex items-center gap-3 mb-4 pb-2 border-b border-white/10 shrink-0">
                  <span class="text-xl"></span>
                  <h3 class="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Ultrabailable</h3>
                </div>
                
                <div class="space-y-2 overflow-y-auto custom-scrollbar pr-2">
                  <div v-for="(artist, index) in lineUpUltra" :key="index" class="artist-card group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold border border-white/10 group-hover:border-yellow-500 group-hover:text-yellow-500 transition-colors">DJ</div>
                      <span class="font-bold text-white text-sm">{{ artist.name }}</span>
                    </div>
                    <a v-if="artist.ig" :href="`https://instagram.com/${artist.ig.replace('@','')}`" target="_blank" class="ig-btn text-[#E1306C]">📸 {{ artist.ig }}</a>
                  </div>
                </div>
              </div>

              <div class="flex flex-col h-full">
                <div class="flex items-center gap-3 mb-4 pb-2 border-b border-white/10 shrink-0">
                  <span class="text-xl"></span>
                  <h3 class="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Electrónica</h3>
                </div>
                
                <div class="space-y-2 overflow-y-auto custom-scrollbar pr-2">
                  <div v-for="(artist, index) in lineUpElectro" :key="index" class="artist-card group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold border border-white/10 group-hover:border-purple-500 group-hover:text-purple-500 transition-colors">DJ</div>
                      <span class="font-bold text-white text-sm">{{ artist.name }}</span>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                      <a v-if="artist.ig" :href="`https://instagram.com/${artist.ig.replace('@','')}`" target="_blank" class="ig-btn text-[#E1306C]">📸 {{ artist.ig }}</a>
                      <a v-if="artist.ig2" :href="`https://instagram.com/${artist.ig2.replace('@','')}`" target="_blank" class="ig-btn text-white">{{ artist.ig2 }}</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </Transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import matchBg from '../../assets/img/TheMatch/TheMatchBackground.png';

const activeTab = ref('info'); 

const lineUpUltra = ref([
  { name: 'JP Rozas', ig: '@_jprozasi1' },
  { name: 'Cytrax', ig: '@cytraxmusic' },
  { name: 'ReyesGraam', ig: '@reyes_graam' },
  { name: 'Pablo Bastías', ig: '@pablo_iignacio' },
  { name: 'Esteban Carrasco', ig: '@e_carrasco17' },
  { name: 'Camimr', ig: '@_camimrdj' },
]);

const lineUpElectro = ref([
  { name: 'Vassc', ig: '@gonzavasc' },
  { name: 'Jorge Beizsman', ig: '@jorgebeizsmannmusic' },
  { name: 'Atlass', ig: '@vtlass.dj' },
  { name: 'Lil Pvlma B2B JXVI', ig: '@lil.pvlma', ig2: '@jaaavic0ni' },
]);
</script>

<style scoped>
/* CLASES UTILITARIAS EN CSS PURO (Reemplazo de @apply) */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.65rem;
}

.ticket-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  transition: all 0.3s;
  cursor: pointer;
}
.ticket-row:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.seller-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #d4d4d4; /* neutral-300 */
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.35rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
  text-decoration: none;
}
.seller-btn:hover {
  color: #facc15; /* yellow-400 */
  border-color: rgba(234, 179, 8, 0.5);
}

.social-icon-link {
  color: white;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
}
.social-icon-link:hover { color: #facc15; }

.artist-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  transition: all 0.3s;
}
.artist-card:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.ig-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  transition: color 0.3s;
  text-decoration: none;
}
.ig-btn:hover { color: white; }

/* Scrollbar Personalizado Fino */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

.animate-slow-pan {
  animation: panBackground 40s infinite alternate linear;
}
@keyframes panBackground {
  from { transform: scale(1.05) translate(0, 0); }
  to { transform: scale(1.15) translate(-1%, -1%); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

.fade-tab-enter-active, .fade-tab-leave-active { transition: opacity 0.3s ease; }
.fade-tab-enter-from, .fade-tab-leave-to { opacity: 0; }
</style>