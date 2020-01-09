<template>
  <div>
    <v-text-field v-model="task.name" :readonly="isUnknown === true" label="タスク名"></v-text-field>
    <v-slider v-model="task.ratio" max="100" :readonly="isUnknown === true"
              @change="handleChangedRatio" @start="startTransaction" @end="commitTransaction"></v-slider>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "taskForm",
        props: ['task', 'isUnknown', 'index'],
        data() {
            return {
                oldValue: 0,
                clicking: false,
            }
        },
        methods: {
            handleChangedRatio(number: number) {
                let differenceValue = number - this.oldValue;
                if (differenceValue > 0) {
                    this.$emit("increase", this.index, differenceValue)
                } else if (differenceValue < 0) {
                    this.$emit("decrease", differenceValue * -1)
                }
            },
            startTransaction() {
                this.clicking = true;
                this.oldValue = this.task.ratio; // 押しはじめの段階でoldValueを固定
            },
            commitTransaction() {
                // handleChangedRatioを先に動かさせる
                this.$nextTick(() => {
                    // watchが動かないのでoldValueの更新
                    this.clicking = false;
                    this.oldValue = this.task.ratio;
                });
            }
        },
        watch: {
            "task.ratio": function (val) {
                if (!this.clicking) {
                    this.oldValue = val;
                }
            }
        }
    });
</script>

<style scoped>

</style>
