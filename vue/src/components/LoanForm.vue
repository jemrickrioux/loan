<template>

<div class="sp-type-form__holder">
  <div class="sp-type-form sp-box" :class="typeClass" v-if="depsLoaded">
    <form class="sp-type-form__main__form">
      <div class="sp-type-form__header sp-box-header">CREATE NEW LOAN REQUEST</div>
      <div v-for="denom in balances" :key="denom.denom">
        {{ denom.amount}}
        -  <b>{{ denom.denom }}</b> <br>
      </div>
      <div>
        <b>Available:</b> {{ parseAmount(getDenomBalance("token")) - parseAmount(typeData.amount) }}
        {{ typeData }}
      </div>

      <div class="sp-type-form__field sp-form-group" v-for="field in createFieldList" v-bind:key="field.name">
        <input
            type="text"
            class="sp-input"
            :placeholder="capitalize(field.name)"
            :disabled="address"
            v-model="address"
            v-if="field.name == 'borrower'"
        />
        <input
          type="text"
          class="sp-input"
          :placeholder="capitalize(field.name)"
          :disabled="!address"
          v-model="typeData[field.name]"
          v-if="field.type == 'string' && field.name != 'borrower' && field.name != 'state'"
        />
        <input
          type="number"
          class="sp-input"
          :placeholder="capitalize(field.name)"
          :disabled="!address"
          v-model="typeData[field.name]"
          v-if="field.type == 'number'"
        />
      </div>
      <div class="sp-type-form__btns">
        <div class="sp-type-form__message" v-if="!address">Accesss a wallet to create a loan</div>
        <!-- <SpButton type="primary" v-on:click="createType" :disabled="!address" :busy="inFlight"
          >Create {{ moduleType }}</SpButton -->
          <input class="sp-button" type="button" value="Create Loan Request" v-on:click="createType" :disabled="!address" :busy="inFlight"/>
      </div>
    </form>
  </div>
  </div>
</template>
<script>

export default {
  name: 'LoanForm',
  components: {},
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
