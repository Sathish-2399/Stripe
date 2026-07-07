<script setup lang="ts">
interface PaymentIntent {
  payment_intent_id: string
  amount: number
  currency: string
  status: string
}

const transactions = ref<PaymentIntent[]>([])
const loading = ref(false)
const error = ref("")
const processing = ref<string | null>(null)

const loadTransactions = async () => {
  loading.value = true
  error.value = ""

  try {
    const data = await $fetch<PaymentIntent[]>(
      "http://localhost:8083/pay/payment-intents"
    )

    transactions.value = data.filter(
      transaction=> transaction.status==="succeeded" || transaction.status==="partially_refunded"
    )

  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}

const createRefund = async (paymentIntentId: string) => {
  processing.value = paymentIntentId

  try {
    const result = await $fetch<any>(
      "http://localhost:8083/create/refund",
      {
        method: "POST",
        body: {
          payment_intent_id: paymentIntentId
        }
      }
    )

    alert(
      `Refund Created Successfully\n\nRefund ID: ${result.refund_id}`
    )

    await loadTransactions()
  } catch (err: any) {
    alert(err.data?.message || err.message)
  } finally {
    processing.value = null
  }
}

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="container">
    <h1>Create Refund</h1>

    <p v-if="loading">Loading transactions...</p>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <p
      v-if="!loading && transactions.length === 0"
    >
      No transactions found.
    </p>

    <table v-if="transactions.length">
      <thead>
        <tr>
          <th>Payment Intent ID</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Status</th>
          <th>Action</th>
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
              :disabled="processing === transaction.payment_intent_id"
              @click="createRefund(transaction.payment_intent_id)"
            >
              {{
                processing === transaction.payment_intent_id
                  ? "Processing..."
                  : "Refund"
              }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <br>

    <NuxtLink to="/refund">
      ← Back
    </NuxtLink>
  </div>
</template>

<style scoped>
.container {
  width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error {
  color: red;
  margin-bottom: 15px;
}
</style>