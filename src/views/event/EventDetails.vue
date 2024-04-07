<!-- eslint-disable prettier/prettier -->
<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  props: ['event'],
}
</script>
