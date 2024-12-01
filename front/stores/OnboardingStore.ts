import { defineStore } from "pinia";
import type { OnboardingModel } from "~/models/onboarding/OnboardingModel";

export const useOnboardingStore = defineStore("onboardingStore", () => {
  const currentOnboardingId = ref<number | null>();

  const createOnboarding = async () => {
    const config = useRuntimeConfig();
    const { data } = await useFetch<OnboardingModel>("/api/onboarding", {
      method: "POST",
      baseURL: config.public.baseURL
    });
    currentOnboardingId.value = data.value?.id;
  };

  const completeOnboarding = async () => {
    const config = useRuntimeConfig();
    await useFetch<OnboardingModel>(`/api/onboarding/${currentOnboardingId.value}`, {
      method: "PATCH",
      baseURL: config.public.baseURL,
      body: {
        completed_onboarding: true
      }
    });
    currentOnboardingId.value = null;
  };

  return { currentOnboardingId, createOnboarding, completeOnboarding };
});