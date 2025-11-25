<template>
  <div class="pt-32 min-h-screen bg-black">
    <ArtistsSection @openArtist="handleOpenArtist" />

    <Transition name="fade">
      <ArtistModal 
        v-if="selectedArtist" 
        :artist="selectedArtist" 
        @close="selectedArtist = null" 
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArtistsSection from '../artistas/ArtistsSection.vue';
import ArtistModal from '../artistas/ArtistModal.vue';

// 1. IMPORTAR EL COMPOSABLE
import { useScrollReveal } from '../../composables/useScrollReveal';

const selectedArtist = ref(null);
const handleOpenArtist = (artist) => {
  selectedArtist.value = artist;
};

// 2. ACTIVARLO
useScrollReveal(); 
</script>