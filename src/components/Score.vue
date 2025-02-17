<script setup lang="ts">
const props = defineProps<{ score: number }>();
</script>

<template>
    <div style="color: white;">
        Current Points:
        <span>{{ props.score }}</span></div>
</template>