<template>
  <main class="p-6">
    <div class="text-4xl font-semibold mb-6">Главная</div>
    <div class="flex gap-4 text-lg font-semibold" id="nav">
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   to="history">
        Вся история
      </router-link>
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   :to="{ name: 'History', query: {type: 'added'} }">
        История добавлений
      </router-link>
      <router-link class="py-2 px-6 bg-gray-200 hover:bg-red-500 transition hover:text-white"
                   :to="{ name: 'History', query: {type: 'removed'} }">
        История удалений
      </router-link>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <Table :search="true" table-type="main" :table-data="getAll" action-type="add" heading="Все" />
      <Table :search="true" table-type="main" :table-data="getAdded" action-type="remove" heading="Добавленные" />
    </div>
  </main>
</template>

<script>

import Table from '../components/Table.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Table,
  },
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    ...mapGetters(['getAll', 'getAdded']),
  },
  mounted() {
    //Получение данных с сервера в случае их отсутствия
    if (this.getAll.length > 0) {
      return;
    }
    this.getData();
  },
  methods: {
    ...mapActions(['getData']),
  },
}
</script>
