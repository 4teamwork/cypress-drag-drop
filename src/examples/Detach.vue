<template>
  <div class="row">
    <draggable v-model="left" class="column" data-testid="left" group="items">
      <div v-for="item in left" :key="item.id" class="item" :data-testid="`item-${item.id}`">{{ item.id }}</div>
    </draggable>
    <draggable
      v-if="!detached"
      v-model="right"
      class="column"
      data-testid="right"
      group="items"
      @drop.native="detached = true"
    >
      <div v-for="item in right" :key="item.id" class="item" :data-testid="`item-${item.id}`">{{ item.id }}</div>
    </draggable>
  </div>
</template>

<script>
export default {
  name: 'Detach',
  data() {
    return {
      detached: false,
      left: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      right: [],
    }
  },
}
</script>
