<template>
  <div class="container">
    <SpBlockDisplayFull :block='block' />
  </div>
</template>


<script>
export default {
  name: 'SingleBlock',
  computed: {
    id: function (){
      return this.$route.params.id;
    },
    lastBlocks: function (){
      if (this._depsLoaded) {
        return this.$store.getters['common/blocks/getBlocks'](20)
      } else {
        return []
      }
    },
    block: function (){
      if (this._depsLoaded) {
        return this.$store.getters['common/blocks/getBlockByHeight'](this.id)
      } else {
        return {}
      }
    },
  }
}
</script>
