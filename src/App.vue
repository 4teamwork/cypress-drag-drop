<template>
  <div>
    <input v-model="activeExample" type="text" data-testid="activeExample" />
    <component :is="activeExample" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeExample: 'Basic',
    }
  },
}
</script>
<style>
body {
  margin: 0;
  min-height: 100vh;
}

.row {
  width: 100%;
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item {
  padding: 20px;
  margin: 5px;
  border: 1px solid black;
  background: white;
}
</style>
