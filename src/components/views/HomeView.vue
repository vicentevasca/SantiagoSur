<template>
  <div>
    <HeroSection 
      id="hero" 
      @openMatchDetails="$emit('openMatchDetails')" 
      @openTechnoDetails="$emit('openTechnoDetails')" 
    />
    <ServicesSection id="servicios" />
    <EventSection id="eventos" />
    <SessionSection id="estudio" />
  </div>
</template>

<script setup>
import HeroSection from '../Inicio/HeroSection.vue';
import ServicesSection from '../Inicio/ServicesSection.vue';
import EventSection from '../Inicio/EventSection.vue';
import SessionSection from '../Inicio/SessionSection.vue';

// 1. IMPORTAR EL COMPOSABLE
import { useScrollReveal } from '../../composables/useScrollReveal';

// 2. ACTIVARLO
useScrollReveal(); 
</script>