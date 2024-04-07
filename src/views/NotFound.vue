<!-- eslint-disable prettier/prettier -->

<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you are looking for is not here</h3>
  <router-link :to="{ name: 'EventList' }"
    >Go back to the home page</router-link
  >
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page',
    },
  },
}
</script>
