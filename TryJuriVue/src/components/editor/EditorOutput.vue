<template>
  <div>
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
interface EditorOutputProps {
  text: string;
}
const props = defineProps<EditorOutputProps>();
</script>
