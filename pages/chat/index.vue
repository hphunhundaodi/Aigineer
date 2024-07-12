<template>
  <div class="w-full flex h-full flex-col">
    <div class="overflow-hidden" :style="{ height: `${contentHeight}px` }">
      <div v-if="contentList.length" class="h-full">
        <div class="relative h-full">
          <div ref="scrollRef" class=" overflow-y-auto h-full w-full">
            <!-- 对话content -->
            <div class="flex flex-col pb-9">
              <ChatConversation v-for="(item, index) in contentList" :key="index" :value="item.value"
                :type="item.type" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-full flex flex-col justify-center items-center">
        <!-- <img class=" w-12 h-12" src="https://api-frameworks.vercel.sh/framework-logos/nuxt.svg" alt="Nuxt.js"> -->
        <!-- <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12"
          role="img"><text x="-9999" y="-9999">ChatGPT</text>
          <path
            d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
            fill="currentColor"></path>
        </svg> -->
        <div class="text-2xl text-purple-600 dark:text-purple-400">AI.gineer</div>
        <div class="pt-4">
          您的智能办公助手
          <!-- 我是 <span class="text-purple-400 dark:text-purple-200">AI.gineer</span> 您的智能办公助手 -->
        </div>
      </div>
    </div>
    <div ref="TextareaRef" data-name="textarea" class="">
      <div class="flex justify-center items-center w-full">
        <div class="w-full flex justify-center items-center">
          <div class="w-full bg-stone-300 dark:bg-[#2f2f2f] rounded-[26px]">
            <div class="w-full flex justify-center items-end gap-3 p-1">
              <div class="ml-2 mb-1.5">
                <div class="dropdown dropdown-top">
                  <span tabindex="0"
                    class=" icon-[flowbite--paper-clip-outline] h-6 w-6 hover:text-purple-300 cursor-pointer"
                    @click="openUploadDialog"></span>
                  <ul tabindex="0"
                    class=" mb-2 divide-y divide-gray-500 border-[1px] border-gray-500 dropdown-content menu bg-[#2f2f2f] rounded-lg z-[1] w-52 p-0 shadow">
                    <li class="m-0.5 p-1.5">
                      <div>Upload Data <span class="icon-[ph--upload-simple] h-6 w-6"></span></div>
                    </li>
                    <li class="m-0.5 p-1.5">
                      <div>Upload Data <span class="icon-[ph--upload-simple] h-6 w-6"></span></div>
                      <div>Upload Data <span class="icon-[ph--upload-simple] h-6 w-6"></span></div>
                      <div>Upload Data <span class="icon-[ph--upload-simple] h-6 w-6"></span></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex-1 flex">
                <textarea ref="chatText" v-model="textareaValue"
                  :style="{ height: textareaHeight, overflowY: textareaOverflow }" class=" box-border text-base leading-8 flex-1 
                    w-full max-h-52 px-0 py-2 textarea textarea-bordered border-none outline-none focus:border-none 
                    focus:outline-none resize-none bg-transparent appearance-auto" :placeholder="textareaPlaceholder"
                  @keydown.enter.native="inputKeyDown" @keydown.delete="inputKeyDownDelete"
                  @input="textareaInput"></textarea>
              </div>
              <button class="btn btn-circle  btn-sm mb-2 mr-2 hover:text-white bg-stone-300 dark:bg-[#191e24]"
                :class="loading ? 'bg-black' : ''" @click="submit">
                <span v-if="loading" class="icon-[ph--rocket-launch-duotone] h-5 w-5 hover:text-purple-300"
                  :class="loading ? 'text-purple-300' : ''"></span>
                <span v-else
                  class="icon-[ph--arrow-up] h-5 w-5 text-black hover:text-purple-300 dark:text-[#a6adbb] dark:hover:text-purple-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class=" py-1.5 text-center text-xs">AI.gineer 也可能会犯错。请核查重要信息。</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 聊天内容 ---------------------- */
const scrollRef = ref<HTMLTextAreaElement | null>(null)
const { arrivedState } = useScroll(scrollRef)
// 判断是否滚动到底
const arrivedBottom = computed(() => Boolean(arrivedState.bottom))

const contentInitHeight = ref(0)
const BottomHeight = ref(0)
const contentHeight = computed(() => {
  return contentInitHeight.value - BottomHeight.value
})

const TextareaRef = ref<HTMLTextAreaElement | null>(null)
onMounted(() => {
  // html 高度 - header 高度
  const ChatBotContent = document.documentElement
  contentInitHeight.value = ChatBotContent?.clientHeight! - 64
  // 创建 ResizeObserver 监听dom结构变化
  const resizeObserver = new ResizeObserver(entries => {
    if (!entries.length) return
    for (let entry of entries) {
      // 判断改变高度的是不是 textarea 这个dom
      if ((entry.target as HTMLElement).dataset.name === 'textarea') {
        BottomHeight.value = entry.contentRect.height
        if (arrivedBottom.value) scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)
      }
    }
  });
  // 监听 bottom 高度变化
  resizeObserver.observe(TextareaRef.value!);
  // 销毁时解除监听
  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.unobserve(TextareaRef.value!);
      resizeObserver.disconnect();
    }
  })
})

/** 聊天框 ---------------------- */
const chatText = ref<HTMLTextAreaElement | null>(null)
const textareaPlaceholder = ref('给"AI.gineer"发送消息')
const textareaValue = ref('')
const textareaHeight = ref('40px')
const textareaOverflow = ref('hidden')
const scollHeight = 13 * 16 // max-h-52 滚动条出现时机
// 换行 & 提交
const inputKeyDown = (e: KeyboardEvent) => {
  if (e.shiftKey && e.code === "Enter") {
    // 处理换行逻辑
    setTimeout(() => { setAreaHeight() }, 0)
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
  // 控制输入框高度不超过 max-h-52  如果超过了显示输入框
  if (parseInt(textareaHeight.value) > scollHeight) {
    textareaOverflow.value = 'auto'
    chatText.value!.scrollTo(0, chatText.value!.scrollHeight)
  } else textareaOverflow.value = 'hidden'
}
// 处理撤回 & ctrl+Y & 粘贴的情况
const textareaInput = (e: InputEvent) => {
  if (['historyUndo', 'historyRedo', 'insertFromPaste'].includes(e.inputType)) setAreaHeight()
}

/** 上传弹出框 */
const uploadDialog = ref(false)
const openUploadDialog = () => {
  uploadDialog.value = true
}

const contentList = ref<Record<string, any>[]>([])
const loading = ref(false)
// 提交
const submit = async () => {
  console.log('submit', textareaValue.value, textareaValue.value.includes("\n"), textareaValue.value.split("\n"));
  if (loading.value) return
  if (!textareaValue.value) return console.log("请输入内容");
  if (textareaValue.value.includes("\n") && textareaValue.value.split("\n").every(el => el === "")) return console.log("请输入内容");
  // 模拟请求
  loading.value = true
  try {
    /** PYTHON */
    contentList.value.push({ value: textareaValue.value, type: "user" })
    contentList.value.push({ type: "loading" })
    if (arrivedBottom.value) scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)
    const message = textareaValue.value
    textareaValue.value = ''
    // node port
    // const response = await fetch('http://localhost:3001/chat', {
    // python port
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    // console.log(response, data);

    /** NODE */
    // const response = await fetch('/api/openai?action=createThread', {
    //   method: 'POST',
    // });
    // const result = await response.json();
    // console.log(result);

    // const thread = await $openai.createThread()
    // console.log(thread);

    // await $openai.createMessage(thread.id, 'user', 'hello!')
    // const messages = await $openai.createAndPollRun(thread.id, textareaValue.value)

    setAreaHeight()
    nextTick(() => {
      contentList.value.pop()
      contentList.value.push({ value: data.response, type: "assistant" })
      loading.value = false
      nextTick(() => {
        scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)
      })
    })
  } catch (error) {
    console.error('Error fetching response:', error)
  }
}
</script>