<template>
  <div class="w-full text-token-text-primary" dir="auto" data-testid="conversation-turn-8" data-scroll-anchor="false">
    <div class="py-2 juice:py-[18px] px-3 text-base md:px-4 m-auto md:px-5 lg:px-1 xl:px-5">
      <div class="mx-auto flex flex-1 gap-3 text-base juice:gap-4 juice:md:gap-5 juice:lg:gap-6 max-w-full">
        <ChatAvatar v-if="type !== 'user'" />
        <div class="group/conversation-turn relative flex w-full min-w-0 flex-col"
          :class="type !== 'user' ? 'agent-turn' : ''">
          <div class="flex-col gap-1 md:gap-3">
            <div class="flex flex-grow flex-col max-w-full">
              <template v-if="type === 'user'">
                <div :data-message-author-role="type" data-message-id="aaa24dca-89a1-45a6-95e2-b2271683ef18" dir="auto"
                  class="min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2">
                  <div class="flex w-full flex-col gap-1 juice:empty:hidden items-end rtl:items-start">
                    <div
                      class="relative max-w-[70%] rounded-3xl bg-[#1e1e3c] px-5 py-2.5 dark:bg-token-main-surface-secondary">
                      <div v-html="value"></div>
                      <!-- <div
                        class="absolute bottom-0 right-full top-0 -mr-3.5 hidden pr-5 pt-1 [.group\/conversation-turn:hover_&amp;]:block">
                        <span class="" data-state="closed">
                          <button
                            class="flex h-9 w-9 items-center justify-center rounded-full text-token-text-secondary transition hover:bg-token-main-surface-tertiary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                              viewBox="0 0 24 24" class="icon-md">
                              <path fill="currentColor" fill-rule="evenodd"
                                d="M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z"
                                clip-rule="evenodd"></path>
                            </svg>
                          </button>
                        </span>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div :data-message-author-role="type" data-message-id="834a56bf-3990-499c-9a95-c20894094310"
                  dir="auto"
                  class="min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2">
                  <div class="flex w-full flex-col gap-1 juice:empty:hidden juice:first:pt-[3px]">
                    <div class="markdown prose w-full break-words dark:prose-invert dark" v-html="value">
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * type
 *  user 用户输入的
 *  assistant 机器回答的
 */
defineProps<{ value: string, type: string }>()
</script>