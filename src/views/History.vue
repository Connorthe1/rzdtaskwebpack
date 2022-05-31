<template>
  <main class="p-6 flex flex-col">
    <div class="mb-6">
      <router-link class="py-2 px-6 text-xl bg-gray-200 hover:bg-red-500 transition hover:text-white" to="/">
        На главную
      </router-link>
    </div>
    <div class="text-4xl font-semibold mb-6">История</div>
    <div class="flex gap-4 text-lg font-semibold mb-4">
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   :class="{ 'bg-red-500 text-white' : !$route.query.type }"
                   to="history">
        Все
      </router-link>
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   :class="{ 'bg-red-500 text-white' : $route.query.type === 'added' }"
                   :to="{ name: 'History', query: {type: 'added'} }">
        История добавлений
      </router-link>
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   :class="{ 'bg-red-500 text-white' : $route.query.type === 'removed' }"
                   :to="{ name: 'History', query: {type: 'removed'} }">
        История удалений
      </router-link>
    </div>
    <Table :search="true" table-type="history" :table-data="getHistoryData" />
  </main>
</template>

<script>
import Table from '../components/Table.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  components: {
    Table,
  },
  computed: {
    ...mapGetters(['getHistory']),
    //Фильтрация данные по query параметру
    getHistoryData() {
      if (this.$route.query.type === 'added') {
        return this.getHistory.filter(item => item.method === 'add');
      }
      if (this.$route.query.type === 'removed') {
        return this.getHistory.filter(item => item.method === 'remove');
      }
      return this.getHistory;
    }
  },
}
</script>
