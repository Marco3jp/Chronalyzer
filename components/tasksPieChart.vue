<template>
  <canvas ref="tasksChart"></canvas>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Chart from 'chart.js'
    import {Task} from "~/model/task";
    import colors from 'vuetify/es5/util/colors'

    interface pieChartData {
        chart?: Chart
    }

    export default Vue.extend({
        name: "tasksPieChart",
        props: ['height', 'width', 'tasks'],
        data(): pieChartData {
            return {
                chart: undefined
            }
        },
        watch: {
            'chartData': function (val) {
                if (typeof val !== "undefined") {
                    this.updateChartData();
                }
            },
            'chartLegendPosition': function () {
                this.updateChartOptions();
            }
        },
        mounted() {
            this.createChart();
        },
        computed: {
            chartData: function (): object {
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
                } else {
                    return {}
                }
            },
            chartLegendPosition: function (): 'bottom' | 'left' {
                if (this.$store.state.isPortrait) {
                    if (this.$store.state.windowRatio < 0.75) {
                        return 'bottom'
                    } else {
                        return 'left'
                    }
                } else {
                    if (this.$store.state.windowRatio > 1.33) {
                        return 'left'
                    } else {
                        return 'bottom'
                    }
                }
            },
            chartOptions: function (): object {
                return {
                    legend: {
                        position: this.chartLegendPosition,
                        labels: {
                            fontColor: colors.grey.lighten3
                        }
                    }
                }
            },
            baseLength: function (): number {
                return this.$store.state.baseLength
            }
        },
        methods: {
            createChart() {
                // @ts-ignore
                let ctx = this.$refs.tasksChart.getContext('2d');
                this.chart = new Chart(ctx, {
                    type: 'pie',
                    data: this.chartData,
                    options: this.chartOptions
                });
            },
            updateChartData() {
                if (typeof this.chart !== "undefined") {
                    this.chart.data = this.chartData;
                    this.chart.update();
                }
            },
            updateChartOptions() {
                if (typeof this.chart !== "undefined") {
                    this.chart.options = this.chartOptions;
                    this.chart.update();
                }
            }
        }
    });
</script>

<style scoped>

</style>
