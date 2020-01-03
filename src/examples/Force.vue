<template>
  <div class="row">
    <div class="force-panel" />
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
  name: 'Force',
  data() {
    return {
      left: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      right: [],
    }
  },
}
</script>
<style>
.force-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 0, 0, 0.3);
}
</style>
