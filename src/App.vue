<template>
  <div class="row">
    <draggable v-model="left" class="column" data-testid="left" group="items">
      <div v-for="item in left" :key="item.id" class="item" :data-testid="`item-${item.id}`">{{ item.id }}</div>
    </draggable>
    <draggable v-model="right" class="column" data-testid="right" group="items">
      <div v-for="item in right" :key="item.id" class="item" :data-testid="`item-${item.id}`">{{ item.id }}</div>
    </draggable>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      left: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      right: [],
    }
  },
}
</script>
<style>
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
