<template>
  <SpSidebar v-on:sidebar-open="sidebarOpen = true" v-on:sidebar-close="sidebarOpen = false">
    <template v-slot:default>
      <SpLinkIcon link="/" text="Dashboard" icon="Dashboard" />
      <SpLinkIcon link="/request" text="Request a loan" icon="Form" />

      <SpLinkIcon link="/loans" text="Loans" icon="Transactions" />
      <SpLinkIcon link="/blocks" text="Blocks" icon="Search" />



      <div class="sp-dash"></div>
      <SpLinkIcon link="/types" text="Custom Type" icon="Form" />

    </template>
    <template v-slot:footer>
      <SpStatusAPI :showText="sidebarOpen" />
      <SpStatusRPC :showText="sidebarOpen" />
      <SpStatusWS :showText="sidebarOpen" />
      <div class="sp-text">Build: v0.3.8</div>
    </template>
  </SpSidebar>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarOpen: true,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
}
</script>
