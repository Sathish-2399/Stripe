<script setup lang="ts">
interface PaymentIntent {
  payment_intent_id: string
  charge_id?: string
  amount: number
  currency: string
  status: string
}

const API_BASE = "http://localhost:8083"
const transactions = ref<PaymentIntent[]>([])
const loading = ref(false)
const error = ref("")
const processing = ref<string | null>(null)
const amounts = ref<Record<string, string>>({})
const reasons = ref<Record<string, string>>({})
const evidence = ref<Record<string, string>>({})

const loadTransactions = async () => {
  loading.value = true
  error.value = ""

  try {
    const data = await $fetch<PaymentIntent[]>(`${API_BASE}/pay/payment-intents`)
    transactions.value = data.filter(
      transaction => Boolean(transaction.charge_id) && transaction.status !== "refunded"
    )
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}

const createPartialDispute = async (transaction: PaymentIntent) => {
  if (!transaction.charge_id) {
    alert("Charge ID is missing for this transaction")
    return
  }

  const amount = Number(amounts.value[transaction.charge_id])

  if (Number.isNaN(amount) || amount <= 0) {
    alert("Dispute amount should be greater than zero")
    return
  }

  if (amount > transaction.amount) {
    alert("Dispute amount should be less than or equal to transaction amount")
    return
  }

  processing.value = transaction.charge_id

  try {
    const result = await $fetch<any>(`${API_BASE}/create/dispute`, {
      method: "POST",
      body: {
        charge_id: transaction.charge_id,
        amount,
        currency: transaction.currency,
        reason: reasons.value[transaction.charge_id] || undefined,
        evidence: evidence.value[transaction.charge_id] || undefined
      }
    })

    alert(`Partial Dispute Created Successfully\n\nDispute ID: ${result.dispute_id}`)
    amounts.value[transaction.charge_id] = ""
    reasons.value[transaction.charge_id] = ""
    evidence.value[transaction.charge_id] = ""
    await loadTransactions()
  } catch (err: any) {
    alert(err.data?.message || err.message)
  } finally {
    processing.value = null
  }
}

onMounted(loadTransactions)
</script>

<template>
  <div class="container">
    <h1>Create Partial Dispute</h1>

    <p v-if="loading">Loading transactions...</p>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <p v-if="!loading && transactions.length === 0">No transactions found.</p>

    <table v-if="transactions.length">
      <thead>
        <tr>
          <th>Payment Intent ID</th>
          <th>Charge ID</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Partial Amount</th>
          <th>Reason</th>
          <th>Evidence</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.payment_intent_id"
        >
          <td>{{ transaction.payment_intent_id }}</td>
          <td>{{ transaction.charge_id }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.currency }}</td>
          <td>
            <input
              v-if="transaction.charge_id"
              v-model="amounts[transaction.charge_id]"
              type="number"
              min="1"
              :max="transaction.amount"
              placeholder="required"
            >
          </td>
          <td>
            <input
              v-if="transaction.charge_id"
              v-model="reasons[transaction.charge_id]"
              type="text"
              placeholder="optional"
            >
          </td>
          <td>
            <input
              v-if="transaction.charge_id"
              v-model="evidence[transaction.charge_id]"
              type="text"
              placeholder="optional"
            >
          </td>
          <td>
            <button
              :disabled="processing === transaction.charge_id"
              @click="createPartialDispute(transaction)"
            >
              {{ processing === transaction.charge_id ? "Processing..." : "Dispute" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <br>
    <NuxtLink to="/dispute">Back</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  width: 1100px;
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
input {
  width: 130px;
  padding: 8px;
  box-sizing: border-box;
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
