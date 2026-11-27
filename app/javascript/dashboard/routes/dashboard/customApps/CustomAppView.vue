<script setup>
// Jarpus: shows a Dashboard App (Settings → Integrations → Dashboard Apps)
// as a full page inside Chatwoot, opened from the sidebar "Apps" menu.
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useMapGetter } from 'dashboard/composables/store';

const route = useRoute();
const store = useStore();
const apps = useMapGetter('dashboardApps/getRecords');

onMounted(() => {
  if (!apps.value?.length) store.dispatch('dashboardApps/get');
});

const app = computed(() =>
  (apps.value || []).find(a => String(a.id) === String(route.params.appId))
);
const url = computed(() => app.value?.content?.[0]?.url || '');
</script>

<template>
  <section class="flex flex-col w-full h-full min-w-0 bg-n-background">
    <header
      v-if="app"
      class="flex items-center justify-between h-12 px-4 border-b border-n-weak shrink-0"
    >
      <h1 class="text-sm font-medium text-n-slate-12 truncate">
        {{ app.title }}
      </h1>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs text-n-slate-11 hover:text-n-slate-12"
      >
        Open in new tab ↗
      </a>
    </header>
    <iframe
      v-if="url"
      :key="url"
      :src="url"
      :title="app?.title"
      class="w-full h-full border-0 grow"
      allow="clipboard-read; clipboard-write; microphone; camera"
    />
    <p v-else class="p-6 text-sm text-n-slate-11">Loading app…</p>
  </section>
</template>
