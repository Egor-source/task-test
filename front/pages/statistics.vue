<template>
  <div v-if="status !== 'idle'" class="wrapper">
    <h1>Analytics</h1>
    <h2>Number of people completed onboarding: {{ completedOnboardingsCount }}</h2>
    <h2>Percent people who completed onboarding: {{ percentageCompleters }}%</h2>
  </div>
  <div v-else class="wrapper">Loading...</div>
</template>

<script setup lang="ts">
import type { StatisticsModel } from "~/models/onboarding/StatisticsModel";

const config = useRuntimeConfig();

useHead({
  title: "Statistics"
});
const { data, status } = await useFetch<StatisticsModel>("/api/onboarding/statistics", {
  baseURL: config.public.baseURL,
  server: false
});

const completedOnboardingsCount = computed(() => {
  return data.value?.completedOnboardingsCount;
});

const percentageCompleters = computed(() => {
  if (!data.value) return null;
  return Math.floor(data.value.completedOnboardingsCount / (data.value.allOnboardingsCount / 100));
});

const { $socket } = useNuxtApp();

const onboardingCompleted = () => {
  if (!data.value) return;
  data.value.completedOnboardingsCount += 1;

}

const onboardingStarted = () => {
  if (!data.value) return;
  data.value.allOnboardingsCount += 1;
}

onMounted(() => {
  $socket.on("onboardingCompleted",onboardingCompleted);
  $socket.on("onboardingStarted",onboardingStarted);

});

onBeforeUnmount(()=>{
  $socket.off("onboardingCompleted",onboardingCompleted);
  $socket.off("onboardingStarted",onboardingStarted);
})

</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>