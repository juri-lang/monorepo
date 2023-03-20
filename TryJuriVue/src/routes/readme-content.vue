<template>
  <div>
    <vue-markdown :source="src" />
  </div>
</template>

<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';
const response = await fetch(
  'https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/README.md',
);
const src = await response.text();
</script>
