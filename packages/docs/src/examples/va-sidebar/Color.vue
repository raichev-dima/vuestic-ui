<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
    <va-sidebar color="primary" text-color="secondary" minimizedWidth="64px">
      <va-sidebar-item v-for="item in items" :key="item.to" :active="item.active" active-color="secondary">
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title style="height: 24px;">
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
    }
  },
}
</script>
