<template>
  <div class="w-full font-customFont">
    <div class="h-full flex justify-center items-center">
      <LandingBanner @start-aigineer="startAigineer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { isAuthenticated } from "~/services/auth";

const { startAigineer } = useShortcutToGame();

function useShortcutToGame() {
  const router = useRouter();

  async function startAigineer() {
    if (!isAuthenticated()) {
      router.push(`/course-pack`);
    }
  }


  return {
    startAigineer,
  };
}
</script>
