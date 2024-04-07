<!-- eslint-disable prettier/prettier -->
/* eslint-disable prettier/prettier */
<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="Prev"
        v-if="page != 1"
        >&#60; Prev</router-link
      >

      <router-link
        v-for="page in total_pages"
        :key="page"
        id="page-next"
        :to="{ name: 'EventList', query: { page: page } }"
        >{{ page }}
      </router-link>

      <router-link
        id="page-links"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="Next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
//import { watchEffect } from 'vue'

export default {
  props: ['page'],
  name: 'HomeView',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
      total_pages: 0,
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((vm) => {
          vm.events = response.data
          vm.totalEvents = response.headers['x-total-count']
          vm.total_pages = Math.ceil(vm.totalEvents / 2)
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
        this.total_pages = Math.ceil(this.totalEvents / 2)
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  // created() {
  //   watchEffect(() => {
  //     this.events = null
  //     EventService.getEvents(2, this.page)
  //       .then((response) => {
  //         this.events = response.data
  //         this.totalEvents = response.headers['x-total-count']
  //         this.total_pages = Math.ceil(this.totalEvents / 2)
  //       })
  //       .catch(() => {
  //         this.$router.push({ name: 'NetworkError' })
  //       })
  //   })
  // },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < totalPages
    },
  },
}
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  flex-direction: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-links {
  text-align: center;
}
#page-next {
  text-align: right;
}
</style>
