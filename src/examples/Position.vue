<template>
  <div class="row">
    <draggable v-model="left" class="column" data-testid="left" group="items" handle=".left-handle">
      <div v-for="item in left" :key="item.id" class="row" :data-testid="`item-${item.id}`">
        <div class="left-handle handle">{{ item.id }}</div>
        <div class="middle-handle handle">{{ item.id }}</div>
        <div class="right-handle handle">{{ item.id }}</div>
      </div>
    </draggable>
    <draggable v-model="right" class="column" data-testid="right" group="items">
      <div v-for="item in right" :key="item.id" class="item" :data-testid="`item-${item.id}`">{{ item.id }}</div>
    </draggable>
  </div>
</template>

<script>
export default {
  name: 'Basic',
  data() {
    return {
      left: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      right: [],
    }
  },
}
</script>
<style>
.handle {
  width: calc(100% / 3);
  height: 50px;
}

.left-handle {
  background: red;
}

.middle-handle {
  background: green;
}

.right-handle {
  background: blue;
}
</style>
