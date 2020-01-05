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
      <v-container>
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
        }
    }
</script>
