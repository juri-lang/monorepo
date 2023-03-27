<template>
  <div>
    <Example v-for="result in results" :key="result[0]" :title="result[0]" :code="result[1]" />
  </div>
</template>

<script setup lang="ts">
import Example from '../components/example-card.vue';
const response = await fetch(
  'https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/JuriConsole/examples/examples.toc',
);
const fileNames = (await response.text()).split('\r\n');
const fetchFile = async (filename: string): Promise<[string, string]> =>
  await fetch(
    `https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/JuriConsole/examples/${filename}`,
  ).then(async (response) => [filename, await response.text()]);

const results = await Promise.all(fileNames.map(fetchFile));
</script>
