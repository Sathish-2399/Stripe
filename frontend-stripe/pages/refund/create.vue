<script setup lang="ts">
const transactions = ref<any[]>([])
const loading = ref(true)
const error = ref("")

const loadTransactions = async () => {
  try {
    transactions.value = await $fetch("http://localhost:8083/pay/payment-intents")
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const createRefund = async (paymentIntentId: string) => {
  try {
    const result = await $fetch("http://localhost:8083/refund/create", {
      method: "POST",
      body: {
        payment_intent_id: paymentIntentId
      }
    })

    alert(`Refund Created\nRefund ID : ${result.refund_id}`)
  } catch (err: any) {
    alert(err.data?.message || err.message)
  }
}

onMounted(loadTransactions)
</script>

<template>
  <div class="container">
    <h1>Create Refund</h1>

    <p v-if="loading">Loading transactions...</p>

    <p v-if="error" style="color:red">
      {{ error }}
    </p>

    <table v-if="transactions.length">
      <thead>
        <tr>
          <th>Payment Intent</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.payment_intent_id"
        >
          <td>{{ transaction.payment_intent_id }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.currency }}</td>
          <td>{{ transaction.status }}</td>
          <td>
            <button
              @click="createRefund(transaction.payment_intent_id)"
            >
              Refund
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container{
    width:900px;
    margin:40px auto;
}
table{
    width:100%;
    border-collapse:collapse;
}
th,td{
    border:1px solid #ddd;
    padding:10px;
}
th{
    background:#f3f3f3;
}
button{
    padding:8px 16px;
    cursor:pointer;
}
</style>