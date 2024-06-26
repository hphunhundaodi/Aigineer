<template>
  <!-- <Home v-if="isAuthenticated()"></Home>
  <Landing v-else></Landing> -->
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";
const router = useRouter();
// [TODO] 登录逻辑
if (isAuthenticated()) {
  router.push(`/chat`);
} else {
  router.push(`/main`);
}
</script>
