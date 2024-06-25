<template>
  <header class="w-full px-5 font-customFont transition-all duration-300 ease-linear" :class="{
    'sticky top-0 z-10': isStickyNavBar,
    'glass bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-md':
      isStickyNavBar && isScrolled,
  }">
    <div class="mx-auto max-w-screen-xl">
      <div class="flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-between">
          <NuxtLink to="/">
            <div class="logo flex items-center">
              <h1 class="text-wrap text-2xl font-extrabold leading-normal dark:text-white">
                Ai.gineer
              </h1>
            </div>
          </NuxtLink>

          <!-- <nav v-if="route.path === '/main' && !isAuthenticated()" aria-label="Global" class="hidden md:block"> -->
          <nav v-if="!isAuthenticated()" aria-label="Global" class="hidden md:block">
            <ul class="flex items-center text-base">
              <li class="px-4" v-for="(optItem, optIndex) in HEADER_OPTIONS" :key="optIndex">
                <!-- <a
                  class="text-nowrap hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                  :href="optItem.href"
                  :target="optItem.target ?? optItem.target"
                >
                  {{ optItem.name }}
                </a> -->
                <div class="text-nowrap hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                  @click="changeMenu(optItem.path)">
                  {{ optItem.name }}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center">
          <!-- 显示用户信息 -->
          <div v-if="isAuthenticated()" class="logged-in flex items-center">
            <div
              class="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gray-300 transition-all hover:scale-125 hover:opacity-90 dark:bg-gray-700"
              @click="handleShowUserMenu">
              <img class="h-full object-cover" :src="userStore.userInfo?.picture!" />
            </div>
          </div>
          <!-- 登录/注册 -->
          <button v-else aria-label="Login"
            class="btn btn-sm mr-1 border-none bg-purple-500 text-white shadow-md hover:bg-purple-600 focus:outline-none"
            @click="signIn()">
            登录
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { useRuntimeConfig } from "nuxt/app";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { isAuthenticated, signIn, signOut } from "~/services/auth";
import { useUserStore } from "~/store/user";

const runtimeConfig = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { y } = useWindowScroll();

const isShowModal = ref(false);
const isOpenUserMenu = ref(false);

const SCROLL_THRESHOLD = 8;
const HEADER_OPTIONS = [
  { name: "首页", path: "/main" },
  { name: "chatBot", path: "/chat" },
];
const changeMenu = (path: string) => {
  console.log(router, route);

  router.push(path);
}

// TODO: 设置需要固定导航栏的页面
const isStickyNavBar = computed(() => ["index", "User-Setting"].includes(route.name as string));
const isScrolled = computed(() => y.value >= SCROLL_THRESHOLD);

function handleLogout() {
  isShowModal.value = true;
}

function handleShowUserMenu() {
  isOpenUserMenu.value = true;
}
</script>
