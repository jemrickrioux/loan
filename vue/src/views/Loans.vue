<template>
  <div class="container">
    <div class="sp-type">
      <div class="sp-type__header sp-component-title">
        <h3>Loans</h3>
        <span>|</span>
        <span>View all loans on chain.</span>
      </div>

        <LoanList :loans='loans'/>
      </div>
  </div>
</template>

<style scoped>
.cards {
  margin-top: 20px;
  margin-bottom: 20px;

}
</style>

<script>
import LoanList from "@/components/LoanList.vue";
export default {
  name: 'Loans',
  components: {LoanList},
  data() {
    return {
      loans: [],
      balances: [],
      bankAddress: '',

    }
  },
  created() {
    return this.$store.dispatch('jemrickrioux.loan.loan/QueryLoanAll',
     {
      options: 
      {
        subscribe:true
      }
    }).then(data => this.loans = data);
  },
  computed: {
    address(){
      if (this._depsLoaded) {
        return this.$store.getters['common/wallet/address']
      } else {
        return []
      }
    },
    }
  }
</script>
