<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
  <va-checkbox v-model="minimized" style="margin-left: 20rem;" label="Minimized" />
    <va-sidebar :minimized="minimized" textColor="dark" minimizedWidth="0">
      <va-sidebar-item v-for="item in items" :key="item.to" :active="item.active">
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title v-if="!minimized" style="height: 24px;">
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
      minimized: false,
    }
  },
}
</script>
