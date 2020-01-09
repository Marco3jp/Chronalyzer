<template>
  <div>
    <h2>前回の記録</h2>
    <div v-if="typeof latestRecord !== 'undefined'">
      <div>
        <tasks-pie-chart :tasks="latestRecord.tasks"></tasks-pie-chart>
        <span>記録時間: {{this.latestRecordDate}}</span>
      </div>

      <div>
        <div class="flex-grow-1">
          <p>{{this.latestRecord.meta.note}}</p>
        </div>
        <div>
          <h3>経過時間</h3>
          <span>
            <span v-if="typeof recordMonitorTimerDay !== 'undefined'">{{this.recordMonitorTimerDay}}日</span>
            <span v-if="typeof recordMonitorTimerHour !== 'undefined'">{{this.recordMonitorTimerHour}}時間</span>
            <span v-if="typeof recordMonitorTimerMinute !== 'undefined'">{{this.recordMonitorTimerMinute}}分</span>
            <span v-if="typeof recordMonitorTimerSecond !== 'undefined'">{{this.recordMonitorTimerSecond}}秒</span>
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>ロード中です</p>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {TasksRecord} from "~/model/tasksRecord";
    import TasksPieChart from "./tasksPieChart.vue";

    interface recordMonitorData {
        timerId?: number,
        recordMonitorTimer?: number,
    }

    export default Vue.extend({
        name: "recordMonitor",
        components: {TasksPieChart},
        data(): recordMonitorData {
            return {
                timerId: undefined,
                recordMonitorTimer: undefined, // second
            }
        },
        computed: {
            latestRecord: function (): TasksRecord | undefined {
                return this.$store.getters["record/latestRecord"];
            },
            latestRecordDate: function (): string {
                if (typeof this.latestRecord !== "undefined" && typeof this.latestRecord.meta !== "undefined" && typeof this.latestRecord.meta.timestamp !== "undefined") {
                    return (new Date(this.latestRecord.meta.timestamp * 1000)).toLocaleString('ja-JP');
                } else {
                    return "時刻がわかりません"
                }
            },
            recordMonitorTimerDay: function (): number | undefined {
                if (typeof this.recordMonitorTimer !== "undefined" && Math.floor(this.recordMonitorTimer / 86400) > 0) {
                    return Math.floor(this.recordMonitorTimer / 86400);
                } else {
                    return undefined
                }

            },
            recordMonitorTimerHour: function (): number | undefined {
                if (typeof this.recordMonitorTimer !== "undefined" && this.recordMonitorTimer % 86400 / 3600 > 0) {
                    return Math.floor(this.recordMonitorTimer % 86400 / 3600);
                } else {
                    return undefined
                }

            },
            recordMonitorTimerMinute: function (): number | undefined {
                if (typeof this.recordMonitorTimer !== "undefined" && this.recordMonitorTimer % 3600 / 60 > 0) {
                    return Math.floor(this.recordMonitorTimer % 3600 / 60);
                } else {
                    return undefined
                }

            },
            recordMonitorTimerSecond: function (): number | undefined {
                if (typeof this.recordMonitorTimer !== "undefined" && this.recordMonitorTimer % 60 > 0) {
                    return this.recordMonitorTimer % 60
                } else {
                    return undefined
                }
            },
        },
        mounted() {
            this.calculateCurrentRecordTimer();
            this.incrementRecordRange();
        },
        methods: {
            calculateCurrentRecordTimer() {
                if (typeof this.latestRecord !== "undefined" &&
                    typeof this.latestRecord.meta !== "undefined" &&
                    typeof this.latestRecord.meta.timestamp !== "undefined") {
                    this.recordMonitorTimer = Math.floor((new Date()).getTime() / 1000) - this.latestRecord.meta.timestamp;
                } else {

                }
            },
            incrementRecordRange() {
                this.timerId = window.setInterval(() => {
                    if (typeof this.recordMonitorTimer !== "undefined") {
                        this.recordMonitorTimer++;
                    }
                }, 1000)

            }
        },
        beforeDestroy(): void {
            clearInterval(this.timerId);
        }
    });
</script>

<style scoped>

</style>
