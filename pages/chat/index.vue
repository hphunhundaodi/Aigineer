<template>
  <div class="w-full flex h-full flex-col">
    <div class="overflow-hidden" :style="{ height: `${contentHeight}px` }">
      <div class="h-full">
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
    </div>
    <div ref="TextareaRef" data-name="textarea" class="">
      <div class="flex justify-center items-center w-full">
        <div class="w-full flex justify-center items-center">
          <div class="w-full bg-[#2f2f2f] rounded-[26px]">
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
        if (arrivedBottom.value) {
          scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)
        }
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

const html = `<p>要判断 <code>&lt;textarea&gt;</code> 元素减少了一行，你可以使用 JavaScript 来监控其内容变化，并计算行数。以下是一个实现方法：</p><ol><li><p><strong>获取 textarea 内容的行数</strong>：</p><ul><li>计算 textarea 中的行数可以通过 <code>value</code> 属性中的换行符 <code>\n</code> 来完成。</li></ul></li><li><p><strong>监控 textarea 的输入事件</strong>：</p><ul><li>使用 <code>input</code> 事件监听 textarea 内容的变化。</li></ul></li><li><p><strong>比较当前行数和之前行数</strong>：</p><ul><li>保存之前的行数，每次输入事件触发时比较新行数和之前行数。</li></ul></li></ol><p>以下是一个示例代码：</p><pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>html</span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>复制代码</button></span></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-html"><span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-keyword">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Textarea Line Count<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"><span class="hljs-selector-tag">textarea</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myTextarea"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Type here..."</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"lineCount"</span>&gt;</span>Lines: 0<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-keyword">const</span> textarea = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'myTextarea'</span>);<span class="hljs-keyword">const</span> lineCountDisplay = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'lineCount'</span>);<span class="hljs-keyword">const</span> messageDisplay = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'message'</span>);<span class="hljs-keyword">let</span> previousLineCount = <span class="hljs-number">0</span>;<span class="hljs-keyword">function</span> <span class="hljs-title function_">getLineCount</span>(<span class="hljs-params">value</span>) {<span class="hljs-keyword">return</span> value.<span class="hljs-title function_">split</span>(<span class="hljs-string">'\n'</span>).<span class="hljs-property">length</span>;}textarea.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">'input'</span>, <span class="hljs-function">() =&gt;</span> {<span class="hljs-keyword">const</span> currentLineCount = <span class="hljs-title function_">getLineCount</span>(textarea.<span class="hljs-property">value</span>);lineCountDisplay.<span class="hljs-property">textContent</span> = <span class="hljs-string">Lines: <span class="hljs-subst"> "${" currentLineCount "}" </span></span>; <span class="hljs-keyword" >if</span> (currentLineCount &lt; previousLineCount) {messageDisplay.<span class="hljs-property">textContent</span > = <span class="hljs-string" > 'A line was removed!' < /span>;} <span class="hljs-keyword">else</span > { messageDisplay.< span class= "hljs-property" > textContent < /span> = <span class="hljs-string">''</span >; }previousLineCount = currentLineCount;}); <span class="hljs-comment" >// Initialize line count</span>previousLineCount = <span class="hljs-title function_">getLineCount</span>(textarea.<span class="hljs-property">value</span>);lineCountDisplay.<span class="hljs-property">textContent</span> = <span class="hljs-string">Lines: <span class="hljs-subst">"${"previousLineCount"}"</span></span>;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></div></div></pre><h3>说明</h3><ol><li><strong>HTML 部分</strong>：包括一个 <code>textarea</code> 和两个用于显示行数和消息的 <code>p</code>元素。</li><li><strong>CSS 部分</strong>：设置了 textarea 的基本样式。</li><li><strong>JavaScript 部分</strong>：<ul><li>使用 <code>getElementById</code> 获取 textarea 和显示行数及消息的元素。</li><li>定义 <code>getLineCount</code> 函数，计算 textarea 中的行数。</li><li>添加 <code>input</code> 事件监听器，监控 textarea 内容的变化。</li><li>比较当前行数和之前行数，如果当前行数少于之前行数，则显示一条消息。</li><li>初始化之前的行数。</li></ul></li></ol><p>这样，你就可以在 textarea 减少一行时进行判断，并执行相应的操作。</p>`

const contentList = ref<Record<string, any>[]>([])
// 提交
const submit = () => {
  console.log('submit', textareaValue.value, textareaValue.value.includes("\n"), textareaValue.value.split("\n"));
  if (!textareaValue.value) return console.log("请输入内容");
  // 模拟请求
  setTimeout(() => {
    contentList.value.push({ value: textareaValue.value, type: "user" })
    textareaValue.value = ''
    nextTick(() => {
      scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)
      setTimeout(() => {
        contentList.value.push({ value: html, type: "assistant" })
        nextTick(() => {
          scrollRef.value!.scrollTo(0, scrollRef.value!.scrollHeight)

        })
      }, 1000);
    })
  }, 2000);
}
</script>