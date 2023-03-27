
<template>
  <n-card :title="props.title" style="margin-bottom: 10px">
    <template #header-extra>
      <n-button @click="copy"> Try it! </n-button>
    </template>
    <pre>{{ props.code }}</pre>
  </n-card>
</template>

<script setup lang="ts">
import { NButton, NCard } from 'naive-ui';
import { useRouter } from 'vue-router';
const props = defineProps<{ code: string; title: string }>();

const router = useRouter();
const copy = () => {
  localStorage.setItem('code', props.code);
  router.push('/');
};
</script>
