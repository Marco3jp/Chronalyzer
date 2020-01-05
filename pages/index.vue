<template>
  <v-layout>
    <v-card class="pa-8">
      <record-monitor></record-monitor>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
    import RecordMonitor from "~/components/recordMonitor.vue";

    export default {
        components: {
            RecordMonitor,
        }
    }
</script>
