<template>
  <div
    id="action-bar"
    class="
      absolute
      bottom-0
      flex
      justify-evenly
      items-center
      h-[20vh]
      w-[100vw]
      z-10
    "
  >
    <button>Action</button>
    <button>Inventory</button>
    <button>Pokedex</button>
  </div>
</template>

<style>
button {
  @apply bg-[#213547] hover:bg-cyan-800 text-white font-bold tracking-wider py-2 px-4 rounded subpixel-antialiased;
}
</style>