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
                  :style="{ height: textareaHeight, overflowY: textareaOverflow }" class=" box-border text-base leading-8 flex-1 
                    w-full max-h-52 px-0 py-2 textarea textarea-bordered bg-transparent border-none outline-none focus:border-none 
                    focus:outline-none resize-none bg-transparent appearance-auto" :placeholder="textareaPlaceholder"
                  @keydown.enter.native="inputKeyDown" @keydown.delete="inputKeyDownDelete"></textarea>
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
const chatText = ref<HTMLTextAreaElement | null>(null)
const textareaPlaceholder = ref('给"Ai.gineer"发送消息')
const textareaValue = ref('')
const textareaHeight = ref('40px')
const textareaOverflow = ref('hidden')
// 换行 & 提交
const inputKeyDown = (e: KeyboardEvent) => {
  if (e.shiftKey && e.code === "Enter") {
    // 处理换行逻辑
    setTimeout(() => {
      setAreaHeight()
      // 控制输入框高度不超过 max-h-52  如果超过了显示输入框
      if (parseInt(textareaHeight.value) > (13 * 16)) {
        textareaOverflow.value = 'auto'
        chatText.value!.scrollTo(0, chatText.value!.scrollHeight)
      } else textareaOverflow.value = 'hidden'
    }, 0)
  } else {
    e.preventDefault()
    submit()
  }
}
// 删除换行
const inputKeyDownDelete = (e: KeyboardEvent) => {
  if (textareaValue.value.includes("\n")) {
    const lines = textareaValue.value.split("\n")
    if (lines.length <= 1) return
    setTimeout(() => { setAreaHeight() }, 0)
  }
}
// 设置输入框高度
const setAreaHeight = () => {
  const nowLine = textareaValue.value.split("\n")
  // 前两行是40px 后面都是32px
  const nowHeight = nowLine.reduce((pre, cur, i) => pre += i < 2 ? 40 : 32, 0)
  if (textareaHeight.value !== `${nowHeight}px`) textareaHeight.value = `${nowHeight}px`

}
// 提交
const submit = () => {
  console.log('submit', textareaValue.value, textareaValue.value.includes("\n"), textareaValue.value.split("\n"));
}
</script>