<template>
  <div :style=style>
    <h2>前回の記録</h2>
    <div v-if="typeof latestRecord !== 'undefined'" class="d-flex">
      <div>
        <tasks-pie-chart height="300" width="300" :tasks="latestRecord.tasks"></tasks-pie-chart>
        <span>{{this.latestRecordDate}}</span>
      </div>

      <div class="d-flex flex-column">
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
    import {RecordMeta} from "~/model/recordMeta";
    import {TasksRecord} from "~/model/tasksRecord";
    import {Task} from "~/model/task";
    import TasksPieChart from "./tasksPieChart.vue";

    interface recordMonitorData {
        latestRecord?: TasksRecord,
        timerId?: number,
        recordMonitorTimer?: number,
        style: {
            height?: string,
            width?: string,
        }
    }

    export default Vue.extend({
        name: "recordMonitor",
        components: {TasksPieChart},
        props: ['height', 'width'],
        data(): recordMonitorData {
            return {
                latestRecord: undefined,
                timerId: undefined,
                recordMonitorTimer: undefined, // second
                style: {
                    height: this.height,
                    width: this.width,
                }
            }
        },
        computed: {
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
            }
        },
        mounted() {
            this.fetchLatestRecordMock();
            this.calculateCurrentRecordTimer();
            this.incrementRecordRange();
        },
        methods: {
            /**
             * テスト用のデータをとりあえず流し込むやつ
             */
            fetchLatestRecordMock() {
                this.latestRecord = <TasksRecord>{
                    meta: <RecordMeta>{
                        note: "作業して寝る前に記録取った",
                        recordId: "a8abb041-d43f-4f63-b91a-091d95673049",
                        sectionTime: 5400, // 1hour 30min
                        timestamp: 1578157820 // 2020-01-05T02:10:20
                    },
                    tasks: <Array<Task>>[{
                        taskName: "コーディング",
                        taskRatio: 75
                    }, {
                        taskName: "Twitter",
                        taskRatio: 10
                    }, {
                        taskName: "ドキュメントチェック",
                        taskRatio: 10
                    }, {
                        taskName: "不明",
                        taskRatio: 5
                    }]
                }
            },
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
