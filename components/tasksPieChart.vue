<template>
  <canvas :width="width" :height="height" ref="tasksChart"></canvas>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Chart from 'chart.js'
    import {Task} from "~/model/task";
    import colors from 'vuetify/es5/util/colors'

    export default Vue.extend({
        name: "tasksPieChart",
        props: ['height', 'width', 'tasks'],
        watch: {
            'this.chartData': function (val) {
                if (typeof val !== "undefined") {
                    this.createChart();
                }
            }
        },
        mounted() {
            this.createChart();
        },
        computed: {
            chartData: function () {
                if (typeof this.tasks !== "undefined") {
                    let labels: Array<string> = [];
                    let values: Array<number> = [];

                    this.tasks.forEach((task: Task) => {
                        labels.push(task.taskName);
                        values.push(task.taskRatio);
                    });

                    return {
                        datasets: [{data: values}],
                        labels: labels
                    }
                }
            },
        },
        methods: {
            createChart() {
                // @ts-ignore
                let ctx = this.$refs.tasksChart.getContext('2d');
                new Chart(ctx, {
                    type: "pie",
                    data: this.chartData,
                    options: {
                        legend: {
                            labels: {
                                fontColor: colors.grey.lighten3
                            }
                        }
                    }
                });

            }
        }
    });
</script>

<style scoped>

</style>
