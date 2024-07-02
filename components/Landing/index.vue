<template>
  <div class="w-full font-customFont">
    <div class="h-full flex justify-center items-center">
      <LandingBanner @start-aigineer="startAigineer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";

const { startAigineer } = useShortcutToGame();

function useShortcutToGame() {
  const router = useRouter();

  async function startAigineer() {
    if (!isAuthenticated()) {
      router.push(`/chat`);
    }
  }


  return {
    startAigineer,
  };
}
</script>
