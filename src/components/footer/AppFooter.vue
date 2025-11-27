<template>
  <footer class="relative bg-black text-white pt-0 pb-12 overflow-hidden border-t border-white/10">
    
    <div class="w-full bg-yellow-500 text-black overflow-hidden py-3 relative z-10">
      <div class="whitespace-nowrap animate-marquee flex gap-8 items-center font-bold text-xs tracking-[0.2em] uppercase">
        <span>Santiago Sur Producciones</span> • <span>Live Events</span> • <span>Studio Sessions</span> • 
        <span>Santiago Sur Producciones</span> • <span>Live Events</span> • <span>Studio Sessions</span> • 
        <span>Santiago Sur Producciones</span> • <span>Live Events</span> • <span>Studio Sessions</span> •
        <span>Santiago Sur Producciones</span> • <span>Live Events</span> • <span>Studio Sessions</span> •
      </div>
    </div>

    <div class="max-w-[1800px] mx-auto px-6 md:px-12 pt-24 relative z-10">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
        
        <div class="md:col-span-4 reveal flex flex-col justify-between">
          <div>
            <div class="text-3xl font-bold tracking-tighter uppercase mb-6 group cursor-default">
              STGO<span class="font-light text-neutral-500 group-hover:text-yellow-500 transition-colors duration-300">SUR</span>
            </div>
            <p class="text-neutral-500 text-sm max-w-xs leading-relaxed">
              Creamos experiencias sonoras que conectan. Desde el estudio hasta el escenario principal.
            </p>
          </div>
          
          <div class="hidden md:block mt-12 text-[12rem] font-bold leading-none text-white/[0.02] select-none -ml-4">
            <img 
      src="../../assets/img/logoSS/SS santiago sur negativo PNG.png" 
      alt="SS Logo"
      class="w-[200px] h-[200px] opacity-50 object-contain"
    />
          </div>
        </div>

        <div class="md:col-span-5 reveal delay-100">
           <h2 class="text-xs font-bold tracking-[0.4em] uppercase text-neutral-500 mb-8">Contacto</h2>
           <a href="mailto:contacto@santiagosur.cl" class="group block">
             <span class="text-5xl md:text-7xl font-medium leading-tight block mb-2 group-hover:text-yellow-400 transition-colors duration-300">
               Creemos algo <br> único juntos.
             </span>
             <div class="flex items-center gap-4 mt-6">
                <div class="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                  <span class="text-xl transform group-hover:-rotate-45 transition-transform duration-300">→</span>
                </div>
                <span class="text-sm font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Enviar Correo</span>
             </div>
           </a>
        </div>

        <div class="md:col-span-3 reveal delay-200 flex flex-col gap-12 border-l border-white/10 md:pl-12">
           
           <div>
             <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-white mb-4">Oficina</h3>
             <div class="space-y-1 text-sm text-neutral-500 font-mono">
                <p>Av. Providencia 1234, Of 601</p>
                <p>Santiago, Chile</p>
                <p class="hover:text-yellow-500 transition-colors cursor-pointer">+56 9 1234 5678</p>
             </div>
           </div>

           <div>
             <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-white mb-4">Social</h3>
             <ul class="space-y-2 text-sm text-neutral-500">
                <li>
                  <a href="#" class="hover:text-white transition-colors flex items-center gap-2 group">
                    Instagram <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors flex items-center gap-2 group">
                    LinkedIn <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white transition-colors flex items-center gap-2 group">
                    YouTube <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500">↗</span>
                  </a>
                </li>
             </ul>
           </div>

        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-neutral-600 border-t border-white/10 pt-8">
        <p>&copy; {{ currentYear }} Santiago Sur Producciones.</p>
        <div class="flex gap-8 mt-4 md:mt-0">
           <span class="cursor-pointer hover:text-neutral-400 transition-colors">Privacidad</span>
           <span class="cursor-pointer hover:text-neutral-400 transition-colors">Términos</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* ANIMACIÓN MARQUEE (Cinta infinita) */
.animate-marquee {
  animation: marquee 25s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Clases utilitarias para la aparición */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  /* Nota: Para que esto anime, necesitas el IntersectionObserver en App.vue 
     que añade la clase .active. Si ya lo tienes configurado globalmente, funcionará.
     Si no, añade style="opacity: 1; transform: none;" para probar. */
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.active { /* Esta clase la pone tu script global */
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
</style>