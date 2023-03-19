<script setup lang="ts">
import { NLayout, NScrollbar, NLayoutContent } from 'naive-ui';
</script>

<template>
  <n-layout content-style="padding-left: 2rem; padding-right:  0.5rem; max-height: 91dvh;">
    <NScrollbar>
      <NLayoutContent content-style="padding-right: 1.5rem; padding-top: 2rem">
        <slot />
      </NLayoutContent>
    </NScrollbar>
  </n-layout>
</template>
