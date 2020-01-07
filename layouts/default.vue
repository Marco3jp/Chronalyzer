<template>
  <v-app dark>

    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <v-container :style="{height: '100%'}" class="pa-4" ref="container" v-resize="handleResize">
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019 Marco</span>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'ダッシュボード',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: '記録を作る',
                        to: '/record'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: '記録一覧',
                        to: '/recordList'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: '記録詳細',
                        to: '/recordDetail'
                    }
                ],
                miniVariant: false,
                title: 'Chronalyzer'
            }
        },
        methods: {
            handleResize() {
                this.setWindowRatio();
                this.checkIsPortrait();
                this.saveBaseLength();
            },
            setWindowRatio() {
                this.$store.commit('setWindowRatio', window.innerWidth / window.innerHeight)
            },
            checkIsPortrait() {
                this.$store.commit('setIsPortrait', this.$store.state.windowRatio < 1);
            },
            saveBaseLength() {
                if (this.$store.state.isPortrait) {
                    this.$store.commit('setBaseLength', this.$refs.container.clientWidth);
                } else {
                    this.$store.commit('setBaseLength', this.$refs.container.clientHeight);
                }
            }
        }
    }
</script>
