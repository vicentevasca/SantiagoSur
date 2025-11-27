<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 w-full h-full">
    
    <div 
      class="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity duration-500" 
      @click="$emit('close')"
    >
      <img :src="artist.image" class="w-full h-full object-cover opacity-20 blur-3xl scale-110" />
    </div>

    <div class="relative z-10 w-full h-full md:h-[85vh] md:max-w-6xl bg-neutral-900/90 md:bg-neutral-900/80 border-none md:border md:border-white/10 md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 md:top-6 md:right-6 md:bg-transparent md:border-none md:w-auto md:h-auto md:text-white/50"
      >
        <span class="text-xl font-bold leading-none md:hidden">✕</span> <span class="hidden md:inline text-4xl group-hover:rotate-90 transition-transform duration-300">×</span> </button>

      <div class="w-full h-[60%] md:h-full md:w-1/2 relative overflow-hidden shrink-0">
  <img 
    :src="artist.image" 
    class="w-full h-full object-cover object-top md:object-center transition-transform duration-[10s] ease-linear hover:scale-110"
    :alt="artist.name"
  />
  
  <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
  
  <div class="absolute bottom-4 left-4 z-20 pointer-events-none select-none">
    <img 
      src="../../assets/img/logoSS/SS santiago sur negativo PNG.png" 
      alt="SS Logo"
      class="w-[150px] h-[150px] opacity-50 object-contain"
    />
  </div>

</div>

      <div class="w-full h-[60%] md:h-full md:w-1/2 overflow-y-auto p-6 md:p-16 flex flex-col md:justify-center bg-neutral-900/50 backdrop-blur-sm relative">
        
        <div class="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

        <div class="relative z-10 flex flex-col h-full">
          
          <div class="inline-flex items-center gap-2 mb-2 md:mb-6 pt-2 md:pt-0">
            <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span class="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-yellow-500">{{ artist.style }}</span>
          </div>

          <h2 class="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-4 md:mb-8 leading-[0.9]">
            {{ artist.name }}
          </h2>

          <div class="flex-grow overflow-y-auto pr-2 mb-6 md:mb-12 scrollbar-hide">
             <p class="text-neutral-300 text-xs md:text-base leading-relaxed font-light border-l-2 border-white/10 pl-4">
               {{ artist.bio }}
             </p>
          </div>

          <div class="space-y-3 mt-auto pb-6 md:pb-0">
            <h3 class="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-500">Connect</h3>
            <div class="flex flex-wrap gap-3">
              
              <a v-if="artist.social.instagram" :href="artist.social.instagram" target="_blank" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:border-white/50 hover:text-white bg-black/20 backdrop-blur-sm group">
                <svg class="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:text-[#E1306C]" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324ZM12 16a4 4 0 110-8 4 4 0 010 8Zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881Z"/></svg>
              </a>

              <a v-if="artist.social.spotify" :href="artist.social.spotify" target="_blank" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:border-white/50 hover:text-white bg-black/20 backdrop-blur-sm group">
                <svg class="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:text-[#1DB954]" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.421 1.44.54.3.66.96.36 1.5-.3.54-.96.66-1.5.36z"/></svg>
              </a>

              <a v-if="artist.social.soundcloud" :href="artist.social.soundcloud" target="_blank" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:border-white/50 hover:text-white bg-black/20 backdrop-blur-sm group">
                <svg class="w-5 h-5 md:w-6 md:h-6 fill-current group-hover:text-[#FF5500]" viewBox="0 0 24 24"><path d="M11.56 8.87V17h.01v-.01h-.01v.01zm1.41-2.35v10.48h.02V6.52h-.02zm-2.83 3.82v6.66h.02v-6.66h-.02zM8.74 11.6v5.29h.02v-5.29h-.02zm-1.4 1.19v4.1h.01v-4.1h-.01zm2.81-6.7v10.9h.02V6.09h-.02zm9.73 5.7c-.68 0-1.28.22-1.77.59h-.07V5.21h-2.41v11.79h.02v.01h4.21c1.6 0 2.9-1.3 2.9-2.9 0-1.33-.89-2.45-2.12-2.79-.23-.07-.48-.11-.74-.11zM5.92 13.63v3.26h.02v-3.26h-.02zm-1.4 1.12v2.14h.01v-2.14h-.01zm-2.83.83v1.31h.02v-1.31h-.02zm1.41-.33v1.97h.02v-1.97h-.02z"/></svg>
              </a>

              <a v-if="artist.social.youtube" :href="artist.social.youtube" target="_blank" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:border-white/50 hover:text-white bg-black/20 backdrop-blur-sm group">
                <svg class="w-4 h-4 md:w-5 md:h-5 fill-current group-hover:text-[#FF0000]" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>

              <a v-if="artist.social.twitter" :href="artist.social.twitter" target="_blank" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:border-white/50 hover:text-white bg-black/20 backdrop-blur-sm group">
                <svg class="w-3 h-3 md:w-4 md:h-4 fill-current group-hover:text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  artist: {
    type: Object,
    required: true
  }
});
defineEmits(['close']);
</script>

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>