<template>
  <section class=" bg-black px-5 md:px-15 relative">
    
    <div class="max-w-[1800px] mx-auto mb-20 flex flex-col items-center text-center reveal">
      <h2 class="text-xs font-bold tracking-[0.4em] uppercase text-yellow-500 mb-4">Santiago Sur</h2>
      <h3 class="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white">
  residente<span class="text-black [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:1px_white]">SS</span>
</h3>
    </div>

    <div class="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div 
        v-for="artist in roster" 
        :key="artist.id"
        @click="openArtist(artist)"
        class="group relative aspect-[3/4] bg-neutral-900 overflow-hidden cursor-pointer border border-white/5 hover:border-yellow-500/50 transition-all duration-500"
      >
        <img 
          :src="artist.image" 
          :alt="artist.name"
          class="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
        />
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500">
          
          <h4 class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent stroke-text text-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            {{ artist.name }}
          </h4>

          <span class="mt-4 px-4 py-1 border border-yellow-500 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 hover:bg-yellow-500 hover:text-black">
            Ver Perfil
          </span>

        </div>

        <div class="absolute bottom-5 left-4 z-10">
           <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
             {{ artist.style }}
           </span>
        </div>

      </div>

    </div>

    <Teleport to="body">
      <Transition name="fade">
        <ArtistModal 
          v-if="selectedArtist" 
          :artist="selectedArtist" 
          @close="selectedArtist = null" 
        />
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import ArtistModal from './ArtistModal.vue';

// --- DATOS MOCK (Reemplazar con imágenes reales en assets) ---
// Tip: Usa imágenes verticales de alta calidad
const roster = ref([
  {
    id: 1,
    name: 'Vromtier',
    style: 'Hard Techno',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000',
    bio: 'DJ y productor chileno conocido por sus sets enérgicos y oscuros. Residente de Santiago Sur, ha compartido escenario con grandes exponentes de la escena local. Su sonido se caracteriza por bajos potentes y melodías industriales.',
    social: {
      instagram: 'https://instagram.com',
      soundcloud: 'https://soundcloud.com',
      spotify: 'https://spotify.com'
    }
  },
  {
    id: 2,
    name: 'Jxvi',
    style: 'Tech House',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000',
    bio: 'Con una propuesta fresca y groovera, Jxvi se ha posicionado como una de las promesas del Tech House en la región. Sus sesiones son un viaje constante de ritmo y baile asegurado.',
    social: {
      instagram: 'https://instagram.com',
      soundcloud: 'https://soundcloud.com',
      spotify: 'https://spotify.com',
    }
  },
  {
    id: 3,
    name: 'Stewarrt',
    style: 'Minimal / Deep',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000',
    bio: 'Maestro de las atmósferas y los sonidos hipnóticos. Stewarrt crea experiencias sonoras que van más allá de la pista de baile, conectando con las emociones más profundas del público.',
    social: {
      instagram: 'https://instagram.com',
      soundcloud: 'https://soundcloud.com'
    }
  },
  {
    id: 4,
    name: 'Badbast',
    style: 'Urban / Reggaeton',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    bio: 'El encargado de prender la fiesta con los hits más duros del género urbano. Badbast es sinónimo de energía, perreo y una conexión única con el público joven.',
    social: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      twitter: 'https://x.com'
    }
  },
  {
    id: 5,
    name: 'Badbast',
    style: 'Urban / Reggaeton',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    bio: 'El encargado de prender la fiesta con los hits más duros del género urbano. Badbast es sinónimo de energía, perreo y una conexión única con el público joven.',
    social: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      twitter: 'https://x.com'
    }
  },
  {
    id: 6,
    name: 'Badbast',
    style: 'Urban / Reggaeton',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    bio: 'El encargado de prender la fiesta con los hits más duros del género urbano. Badbast es sinónimo de energía, perreo y una conexión única con el público joven.',
    social: {
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      twitter: 'https://x.com'
    }
  },
  {
    id: 7,
    name: 'Jxvi',
    style: 'Tech House',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000',
    bio: 'Con una propuesta fresca y groovera, Jxvi se ha posicionado como una de las promesas del Tech House en la región. Sus sesiones son un viaje constante de ritmo y baile asegurado.',
    social: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    }
  },
]);

const selectedArtist = ref(null);

const openArtist = (artist) => {
  selectedArtist.value = artist;
};
</script>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 2px white;
  color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>