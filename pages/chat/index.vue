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
            <div class="w-full flex justify-center items-end gap-3">
              <div>icon</div>
              <div class="flex-1">
                <textarea
                  class=" w-full h-full textarea textarea-bordered bg-transparent border-none outline-none focus:border-none focus:outline-none"
                  placeholder="Bio"></textarea>
              </div>
              <div>sumit <span class="icon-[ph--alarm-duotone]"></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class=" py-1.5 text-center">remark</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>