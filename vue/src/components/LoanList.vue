<template>
    <div>

        <div class="cards sp-box sp-shadow" :key="loan.id" v-for="loan in loans.Loan">
          <h4>{{ loan.id }}</h4>
          <p>
            Fee: {{ loan.fee }} <br />
            Amount: {{ loan.amount }} <br />
            Lender: {{ loan.lender }} <br />
            Collateral : {{ loan.collateral }} <br />
            Lender: {{ loan.deadline }} <br />
            Borrower: {{ loan.borrower }} <br />
            State: {{ loan.state }} <br />
          </p>
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
export default {
  name: 'LoanList',
  props: {
      loans: {
        type: Array,
      },
  },
}
</script>
