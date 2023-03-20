<template>
  <Suspense>
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <div style="width=100%; margin:auto">Loading...</div>
    </template>
  </Suspense>
</template>
