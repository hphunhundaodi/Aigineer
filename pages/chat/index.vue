<template>
  <div class="w-full flex h-full flex-col">
    <div class="flex-1 overflow-hidden">
      <div class="h-full">
        chat
      </div>
    </div>
    <div class="">
      <div class="flex justify-center items-center w-full">
        <div class="w-9/12 flex justify-center items-center">
          <div class=" w-full bg-[#2f2f2f] rounded-[26px]">
            <div class="w-full flex justify-center items-end gap-3 p-1">
              <div class="ml-2 mb-1.5">
                <span class="icon-[flowbite--paper-clip-outline] h-6 w-6"></span>
              </div>
              <div class="flex-1 flex">
                <textarea ref="chatText" v-model="textareaValue"
                  :style="{ height: textareaHeight, overflowY: textareaOverflow }"
                  class=" box-border text-base flex-1 w-full max-h-52 px-0 py-2 textarea textarea-bordered bg-transparent border-none outline-none focus:border-none focus:outline-none resize-none bg-transparent appearance-auto"
                  placeholder="Bio" @keydown.enter.native="inputKeyDown"
                  @keydown.delete="inputKeyDownDelete"></textarea>
              </div>
              <button className="btn btn-circle  btn-sm mb-2 mr-2 hover:text-white" @click="submit">
                <span class="icon-[ph--arrow-up] h-5 w-5"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class=" py-1.5 text-center text-xs">Ai.gineer 也可能会犯错。请核查重要信息。</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const chatText = ref(null)
const textareaValue = ref('')
const textareaHeight = ref('40px')
const textareaOverflow = ref('hidden')
const textareaLineCount = ref(1)
const inputKeyDown = (e: KeyboardEvent) => {
  if (e.shiftKey && e.code === "Enter") {
    // 处理换行逻辑
    textareaHeight.value = `${parseInt(textareaHeight.value) + 24}px`
    textareaLineCount.value++

    if (parseInt(textareaHeight.value) > (13 * 16)) {
      textareaOverflow.value = 'auto'
      // [todo] 保持滚动到底部
    } else {
      textareaOverflow.value = 'hidden'
    }
  } else {
    console.log('inputKeyDown', e);
    // 处理提交逻辑
    // [todo] 取消事件行为
  }
}
const inputKeyDownDelete = (e: KeyboardEvent) => {
  console.log('inputKeyDownDelete', e.target.scrollHeight);
  // [todo] 成功删掉一行才-24
  if (textareaLineCount.value > 1) {
    textareaHeight.value = `${parseInt(textareaHeight.value) - 24}px`
    textareaLineCount.value--
  }
}
const inputTextarea = (e: KeyboardEvent) => {
  console.log('inputTextarea', textareaValue);
}
const submit = () => {
  console.log('submit', textareaValue.value, textareaValue.value.includes("\n"), textareaValue.value.split("\n"));
}
</script>