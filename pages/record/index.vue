<template>
  <div>
    <v-form @submit.prevent="postRecord">
      <v-textarea label="メモなど" v-model="record.meta.note"></v-textarea>
      <task-form v-for="(task, index) in record.tasks" :task="task" :key="index" :index="index"
                 @decrease="decreaseTaskRatio" @increase="increaseTaskRatio"></task-form>
      <v-btn outlined @click="pushNewTask" type="button">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <task-form :task="unknownTask" :isUnknown="true"></task-form>
      <v-btn outlined type="submit">記録を保存</v-btn>
      <p class="red--text text--lighten-1" v-show="errorMessage !== ''">{{errorMessage}}</p>
    </v-form>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {TasksRecord} from "~/model/tasksRecord";
    import TaskForm from "~/components/taskForm.vue";
    import {Task} from "~/model/task";

    interface recordPageData {
        record: TasksRecord
        unknownTask: Task,
        decreaseTarget: number,
        errorMessage: string,
    }

    export default Vue.extend({
        name: "record",
        components: {TaskForm},
        data(): recordPageData {
            return {
                record: {
                    meta: {
                        note: ""
                    },
                    tasks: [],
                },
                unknownTask: {
                    ratio: 100,
                    name: "不明(0%の場合は自動的に除去されます)"
                },
                decreaseTarget: 0,
                errorMessage: "",
            }
        },
        methods: {
            decreaseTaskRatio(number: number) {
                this.unknownTask.ratio += number;
            },
            increaseTaskRatio(index: number, number: number) {
                if (this.unknownTask.ratio >= number) {
                    // 不明領域から引くケース
                    this.unknownTask.ratio -= number;
                } else {
                    number -= this.unknownTask.ratio;
                    this.unknownTask.ratio = 0;

                    // 他タスクから少しずつもらう場合
                    while (number !== 0) {
                        if (this.record.tasks[this.decreaseTarget].ratio > 0 && this.decreaseTarget !== index) {
                            this.record.tasks[this.decreaseTarget].ratio--;
                            number--;
                        }

                        if (this.decreaseTarget === this.record.tasks.length - 1) {
                            this.decreaseTarget = 0;
                        } else {
                            this.decreaseTarget++;
                        }
                    }
                }
            },
            pushNewTask() {
                this.record.tasks.push({
                    ratio: 0,
                    name: ""
                })
            },
            postRecord() {
                if (this.validateForm()) {
                    if (this.unknownTask.ratio > 0) {
                        this.record.tasks.push(this.unknownTask);
                    }
                    this.$store.commit('record/unshift', JSON.parse(JSON.stringify(this.record)));
                    console.log(this.$store.state.record.list);
                    this.resetForm();
                } else {
                    this.errorMessage = "フォームの内容に不備がある可能性があります";
                    setTimeout(() => {
                        this.errorMessage = ""
                    }, 10000);
                }
            },
            resetForm() {
                this.record.meta.note = "";
                this.record.tasks.splice(0);
                this.unknownTask.ratio = 100;
                this.decreaseTarget = 0;
            },
            validateForm(): boolean {
                // 名前が空、割合が0のチェック
                let isError = false;
                this.record.tasks.forEach((task: Task) => {
                    console.log(task);
                    if (typeof task.name === "undefined" || task.name === "") {
                        isError = true;
                    } else if (task.ratio === 0) {
                        isError = true;
                    }
                });

                // 上記バリデーションにエラーがなく、かつ、そもそも要素がない、何らかの不具合で合計が100じゃないことのチェック
                return !isError && !(this.record.tasks.length === 0 || !this.validateRatio());
            },
            validateRatio() {
                let ratio = this.unknownTask.ratio;
                this.record.tasks.forEach(task => {
                    ratio += task.ratio;
                });
                return ratio === 100;
            }
        },
    });
</script>

<style scoped>

</style>
