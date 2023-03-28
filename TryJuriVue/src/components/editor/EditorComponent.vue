<template>
  <div style="display: flex; border-radius: 10px">
    <CMEditor />
    <EditorOutput />
  </div>
</template>

<script setup lang="ts">
import CMEditor from './CMEditor.vue';
import EditorOutput from './EditorOutput.vue';
</script>
