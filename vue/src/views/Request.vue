<template>
<div class="container">
  <div class="sp-type">
    <div class="sp-type__header sp-component-title">
        <h3>Request a loan</h3>
        <span>|</span>
        <span>Send a request to a cosmoneut for a loan.</span>
      </div>
      <div class="sp-type__holder">
      <LoanForm />
      <div>
        <div class="sp-type__header sp-component-title">
          <h3>Your requests</h3>
          <span>|</span>
          <span>See your request on chain</span>
        </div>
        <LoanList v-if='loans' :loans='loans.Loan'/>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoanForm from "@/components/LoanForm.vue";
import LoanList from "@/components/LoanList.vue";

export default {
  name: 'Request',
  components: {LoanForm, LoanList},
  props: {
    id: {
      type: String ,
      default: '',
    },
  },
  data: function () {
    return {
      fieldList: [],
      typeData: {} ,
      inFlight: false,
      bankAddress: '', 
      staking: {},
      loans: false,

    } 
  },
  emits: ['created'],
  watch: {
    id: async function (newId) {
      this.typeData['id'] = newId
      if (this._depsLoaded) {
        if (this.typeData['id'] != '') {
          await this.$store.dispatch("jemrickrioux.loan.loan" + '/Query' + "Loan", {
            options: { subscribe: true },
            params: { id: this.typeData['id'] },
          })
          const data = this.$store.getters["jemrickrioux.loan.loan" + '/get' + "Loan"]({
            params: { id: this.typeData['id'] },
          })
          this.typeData = data[this.capitalize("Loan")]
        }
      }
    },
  },    
  computed: {
    address: function () {
     const address = this.$store.getters['common/wallet/address']
     return address
    },
    balances: function () {
      if (this._depsLoaded) {
        return this.$store.getters['cosmos.bank.v1beta1/getAllBalances']({ params: { address: this.address }, })?.balances ?? []
      } else {
        return []
      }
    },
    typeClass: function () {
      return 'sp-type-form-Loan'
    },
    createFieldList: function () {
      return this.fieldList.filter((x) => x.name != 'creator' && x.name != 'id')
    },
    updateFieldList: function () {
      return this.fieldList.filter((x) => x.name != 'creator')
    },
    deleteFieldList: function () {
      return this.fieldList.filter((x) => x.name == 'id')
    },
    selectedAccount: function () {
      if (this._depsLoaded) {
        return this.$store.getters['common/wallet/address']
      } else {
        return null
      }
    },
    createTypeData: function () {
      const { id, ...rest } = this.typeData
      return rest
    },
    updateTypeData: function () {
      return this.typeData
    },
    deleteTypeData: function (){

      const { id, creator } = this.typeData
      return { id, creator }
    },
    depsLoaded: function () {
      return this._depsLoaded
    },
  },
  beforeCreate: function () {
    const module = [..."jemrickrioux.loan.loan".split('/')]
    for (let i = 1; i <= module.length; i++) {
      const submod = module.slice(0, i)
      if (!this.$store.hasModule(submod)) {
        console.log('Module jemrickrioux.loan.loan has not been registered!')
        this._depsLoaded = false
        break
      }
    }
  },
  created: async function () {
    this.$store.dispatch('jemrickrioux.loan.loan/QueryLoanAll', { options: { subscribe:true } })
      .then(data => this.loans = data)
      .then(data => this.loans = data.filter((x) => x.borrower == this.address)
);



    if (this._depsLoaded) {
      this.fieldList = this.$store.getters['jemrickrioux.loan.loan/getTypeStructure']("Loan");
      console.log("field list", this.fieldList);
      for (const field of this.fieldList) {
        this.typeData[field.name] = ''
      }
      this.typeData['id'] = this.id
      if (this.typeData['id'] != '') {
        await this.$store.dispatch('jemrickrioux.loan.loan/QueryLoan',{
          options: { subscribe: true },
          params: { id: this.typeData['id'] },
        })
        const data = this.$store.getters['jemrickrioux.loan.loan/getLoan']({
          params: { id: this.typeData['id'] },
        })
        this.typeData = data[this.capitalize("Loan")]
      }
    }
  },
  methods: {
    parseAmount: function (amount) { return amount == '' ? 0 : parseInt(amount) },
    getDenomBalance: function (denom) {
      console.log(this.balances.find(balance => balance.denom == denom));
      return 10;
    },
    capitalize: function (str) { return str.charAt(0).toUpperCase() + str.slice(1) },
    createType: async function () {
      if (this._depsLoaded && this.address) {
        this.typeData['creator'] = this.bankAddress ?? ''
        this.inFlight = true
        try {
          console.log({ value: { ...this.createTypeData, borrower: this.address }, fee: [], });
          await this.$store.dispatch('jemrickrioux.loan.loan/sendMsgRequestLoan', {
            value: { ...this.createTypeData, borrower: this.address },
            fee: [],
          })
          this.inFlight = false
          this.$emit('created')
          this.resetForm()
        } catch (e) {
          console.error(e)
        } finally {
          this.inFlight = false
        }
      }
    }
  },
}
</script>
