<script setup lang="ts">
import { NLayout, NLayoutSider, NMenu, NLayoutHeader, NConfigProvider } from 'naive-ui';
import MainContent from './components/MainContent.vue';
import { darkTheme } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { h } from 'vue';

const sideMenuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/',
        },
        { default: () => 'Home' },
      ),
    key: 'home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/readme',
        },
        { default: () => 'ReadMe' },
      ),
    key: 'readme',
  },
];
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-layout>
      <n-layout-header
        position="static"
        style="
          padding: 1.2rem;
          font-size: 1.25rem;
          font-weight: 700;
          background-color: rgba(255, 255, 255, 0.5);
        "
        bordered
      >
        juri-lang
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          collapse-mode="transform"
          :collapsed-width="0"
          :width="240"
          :default-collapsed="true"
          show-trigger="bar"
          content-style="padding: 24px;"
          bordered
        >
          <n-menu :options="sideMenuOptions" />
        </n-layout-sider>
        <MainContent>
          <RouterView />
        </MainContent>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style></style>
