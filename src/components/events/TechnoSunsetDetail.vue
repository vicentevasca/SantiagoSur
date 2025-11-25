<template>
  <div class="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-y-auto lg:overflow-hidden">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
      <div class="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>

    <div class="relative z-10 min-h-screen lg:min-h-0 lg:h-screen py-12 px-4 md:px-8 flex flex-col items-center lg:justify-center">
      
      <button 
        @click="$emit('close')" 
        class="fixed top-6 right-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-red-500 transition group mix-blend-difference cursor-pointer font-mono"
      >
        <span class="text-xl group-hover:rotate-90 transition-transform duration-300">✕</span> Cerrar
      </button>

      <div class="w-full max-w-5xl border-2 border-white/20 bg-black/80 backdrop-blur-md p-6 md:p-10 lg:p-8 relative shadow-2xl animate-fade-in-up lg:flex lg:gap-12 lg:items-stretch lg:max-h-[90vh]">
        
        <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
        <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
        <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
        <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>

        <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
          
          <div class="text-center mb-8 lg:mb-4">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-2 font-sans scale-y-110">
              Techno Sunset
            </h1>
            <div class="flex items-center justify-center gap-4 text-[10px] md:text-xs font-mono tracking-widest border-y border-white/30 py-2 mt-2">
              <span>✦</span> VOL 7 - ALL NIGHT LONG <span>✦</span>
            </div>
          </div>

          <div class="mb-8 lg:mb-0 text-center lg:flex-grow lg:flex lg:flex-col lg:justify-center">
            <h2 class="text-2xl md:text-3xl font-bold uppercase tracking-widest text-red-600 mb-6 font-mono glow-text">
              Line Up
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-center max-w-md mx-auto">
              <div class="md:col-span-2 mb-2">
                <p class="text-lg md:text-xl font-bold uppercase tracking-wider text-white">90' X & Stress Brain</p>
              </div>
              <div v-for="artist in artists" :key="artist" class="group cursor-default">
                <p class="text-xs md:text-sm font-bold uppercase text-neutral-400 group-hover:text-white transition-colors tracking-wide">
                  {{ artist }}
                </p>
              </div>
              <div class="md:col-span-2 mt-4">
                 <p class="text-sm font-bold uppercase text-white animate-pulse">Special Guest 👀</p>
              </div>
            </div>
          </div>

        </div>

        <div class="hidden lg:block w-px bg-white/20 mx-4"></div>

        <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-between space-y-8 lg:space-y-0">
          
          <div class="border-t border-b lg:border-none border-white/30 py-4 lg:py-0 mb-6 lg:mb-0">
            <div class="flex flex-col md:flex-row lg:flex-col items-center text-center lg:items-start gap-2 font-mono text-sm uppercase tracking-widest">
              <div class="text-lg font-bold text-white">Sábado 08 Feb</div>
              <div class="text-neutral-400">17:00 PM - 06:00 AM</div>
              <div class="text-xs text-red-500 font-bold">Pool Party Edition ✦</div>
            </div>
          </div>

          <div class="space-y-6 lg:space-y-8">
            
            <div class="space-y-3">
              <h3 class="text-sm font-bold uppercase tracking-widest text-white border-l-4 border-red-600 pl-3">Tickets</h3>
              <div class="space-y-2 font-mono">
                <div class="flex justify-between items-center p-2 border border-white/10 bg-white/5 rounded hover:border-red-500/50 transition-colors cursor-pointer group">
                  <div>
                    <span class="block text-white font-bold text-sm uppercase">Preventa 1</span>
                    <span class="text-[9px] text-neutral-400">Stock Limitado</span>
                  </div>
                  <span class="text-lg text-red-500 font-bold">$5.000</span>
                </div>
                <div class="flex justify-between items-center p-2 border border-white/10 bg-white/5 rounded hover:border-white/30 transition-colors">
                  <span class="block text-white font-bold text-sm uppercase">Preventa 2</span>
                  <span class="text-lg text-white font-bold">$7.000</span>
                </div>
              </div>
              <button class="w-full py-3 bg-white text-black font-black font-mono text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Comprar Entrada
              </button>
            </div>

            <div class="space-y-3">
              <h3 class="text-sm font-bold uppercase tracking-widest text-white border-l-4 border-red-600 pl-3">Info</h3>
              <ul class="space-y-1 text-xs font-mono text-neutral-300">
                <li class="flex items-center gap-2 text-white"><span class="text-red-500">📍</span> El Recurso, Buin</li>
                <li class="flex items-center gap-2"><span>🚗</span> Estacionamiento Privado</li>
                <li class="flex items-center gap-2"><span>🏕️</span> Zona Camping</li>
                <li class="flex items-center gap-2"><span>🏊‍♂️</span> Piscina Habilitada</li>
              </ul>
              
              <div class="flex gap-2 pt-2">
                <a href="#" class="flex-1 py-2 border border-white/20 text-center text-[10px] font-mono uppercase hover:bg-white hover:text-black transition-colors">IG DM</a>
                <a href="#" class="flex-1 py-2 border border-white/20 text-center text-[10px] font-mono uppercase hover:bg-green-500 hover:text-black hover:border-green-500 transition-colors">WSP</a>
              </div>
            </div>

          </div>

          <div class="mt-8 lg:mt-0 flex justify-end items-end relative h-16 lg:h-auto overflow-hidden">
             <div class="px-4 py-1 border border-white rounded-full text-[9px] font-bold uppercase tracking-[0.3em] animate-pulse z-10 relative bg-black">Secret Spot</div>
             <p class="text-[8rem] font-black text-white/5 absolute bottom-0 right-0 pointer-events-none select-none leading-none -mb-8 -mr-4 z-0">08</p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const artists = [
  "Vromtier", "Jxvi", "Stewarrt", "Badbast", 
  "Pvlma", "RSJ", "Varos", "Bbypangi", 
  "Altrego", "Salocin Mata", "Jxviconstanza"
];
</script>

<style scoped>
/* Estrellas y animaciones se mantienen igual */
.stars { width: 1px; height: 1px; background: transparent; box-shadow: 100px 200px #fff, 400px 500px #fff, 800px 100px #fff, 1200px 900px #fff, 1500px 300px #fff, 300px 800px #fff, 600px 200px #fff, 900px 600px #fff, 100px 900px #fff, 500px 100px #fff; animation: animStar 50s linear infinite; }
.stars2 { width: 2px; height: 2px; background: transparent; box-shadow: 200px 300px #fff, 500px 600px #fff, 900px 200px #fff, 1300px 800px #fff, 100px 700px #fff, 600px 400px #fff; animation: animStar 100s linear infinite; }
.stars3 { width: 3px; height: 3px; background: transparent; box-shadow: 300px 400px #fff, 800px 800px #fff, 1400px 200px #fff; animation: animStar 150s linear infinite; }

@keyframes animStar { from { transform: translateY(0px); } to { transform: translateY(-2000px); } }

.glow-text { text-shadow: 0 0 10px rgba(220, 38, 38, 0.8); }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; transform: translateY(20px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
</style>