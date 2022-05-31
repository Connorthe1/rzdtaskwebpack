<template>
  <div>
    <div v-if="heading" class="text-2xl font-bold p-2">{{ heading }}</div>
    <input v-if="search" v-model="searchValue" class="border py-2 px-6 w-full mb-2" placeholder="Поиск" type="text">
    <div class="bg-gray-200 py-2 flex w-full px-6 items-center">
      <span class="flex-none w-10">Id</span>
      <span class="grow">Title</span>
      <span v-if="tableType === 'main'" class="flex-none ml-auto w-20 text-center">Действия</span>
      <div v-else class="ml-auto w-96 flex items-center">
        <span class="w-40">Действие</span>
        <span>Дата</span>
      </div>
    </div>
    <div class="mt-2">
      <div v-for="(row, idx) in getFilteredData" :key="row.id"
           class="bg-gray-100 py-2 h-12 flex w-full px-6 items-center"
           :class="{ 'bg-gray-200' : idx % 2 }"
      >
        <span class="flex-none w-10 font-bold">{{ tableType === 'main' ? row.id : row.item.id }}</span>
        <span class="grow truncate">{{ tableType === 'main' ? row.title : row.item.title }}</span>
        <div v-if="tableType === 'main'" class="flex-none ml-auto w-20 flex justify-center items-center group cursor-pointer h-full" @click="action(row)">
          <svg v-show="actionType === 'add'" class="w-5 h-5 group-hover:text-red-500 transition fill-current" viewBox="0 0 50 50">
            <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		          c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		          c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		          c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
          </svg>
          <svg v-show="actionType === 'remove'" class="w-5 h-5 group-hover:text-red-500 transition fill-current" viewBox="0 0 50 50">
            <path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21
	            S39.776,16,37.059,16z"/>
          </svg>
        </div>
        <div v-else class="ml-auto w-96 flex items-center">
          <span class="w-40 font-bold">{{ row.method === 'add' ? 'Добавление' : 'Удаление' }}</span>
          <span class="w-40 font-bold">{{ row.data }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Table',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    heading: {
      type: String,
      default: "",
    },
    tableType: {
      type: String,
      default: "main",
    },
    actionType: {
      type: String,
      default: "",
    },
    search: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      searchValue: '',
    };
  },
  computed: {
    //Фильтр по значению search
    getFilteredData() {
      if (this.search && this.searchValue.length > 0) {
        if (this.tableType === 'history') {
          return this.tableData.filter(item => item.item.title.indexOf(this.searchValue) !== -1).reverse();
        } else {
          return this.tableData.filter(item => item.title.indexOf(this.searchValue) !== -1).reverse();
        }
      } else {
        return this.tableData;
      }
    }
  },
  methods: {
    ...mapActions(['toAdded', 'toAll']),
    //Действия с записью
    action(row) {
      if (this.actionType === 'add') {
        this.toAdded(row);
      } else {
        this.toAll(row);
      }
    }
  },
}
</script>

<style scoped>

</style>
