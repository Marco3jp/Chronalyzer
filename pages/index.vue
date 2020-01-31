<template>
  <v-layout :class="{'flex-row': !isPortrait, 'flex-column': isPortrait}" :style="{height: '100%'}">

    <v-card class="pa-4" ref="recordMonitorWrapper">
      <record-monitor></record-monitor>
    </v-card>

    <div class="d-flex" :class="{
         'flex-row': isPortrait,
         'flex-column': !isPortrait,
         'mt-4': isPortrait,
         'ml-4': !isPortrait }">

      <v-card class="pa-4 flex-grow-1" to="/record/list">
        <div>
          <span>履歴</span>
        </div>
      </v-card>

      <v-card class="pa-4 flex-grow-1" :class="{'ml-4': isPortrait,'mt-4': !isPortrait}" to="/analyze">
        <div>
          <span>分析</span>
        </div>
      </v-card>

    </div>

    <v-btn class="ma-6" color="green darken-3" to="/record" dark fab bottom right fixed app large>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecordMonitor from "~/components/recordMonitor.vue";

    export default Vue.extend({
        components: {
            RecordMonitor,
        },
        computed: {
            isPortrait: function (): boolean {
                return this.$store.state.isPortrait;
            },
            recordMonitorSize: function (): number {
                return this.$store.state.baseLength;
            }
        },
    });
</script>
