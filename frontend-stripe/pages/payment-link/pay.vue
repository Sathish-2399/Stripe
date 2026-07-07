<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const paymentLinkId = ref("")
const payment = ref<any>(null)
const error = ref("")
const loading = ref(false)

const makePayment = async () => {
  payment.value = null
  error.value = ""

  if (!paymentLinkId.value.trim()) {
    error.value = "Payment Link ID is required"
    return
  }

  loading.value = true

  try {
    payment.value = await $fetch<any>(`${API_BASE}/pay/${paymentLinkId.value.trim()}`, {
      method: "POST"
    })
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Make Payment</h1>

    <div class="card">
      <label>Payment Link ID</label>
      <input
        v-model="paymentLinkId"
        type="text"
        placeholder="plink_..."
      >
      <button
        :disabled="loading"
        @click="makePayment"
      >
        {{ loading ? "Processing..." : "Make Payment" }}
      </button>
    </div>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <table v-if="payment">
      <tbody>
        <tr>
          <th>Payment Intent ID</th>
          <td>{{ payment.payment_intent_id }}</td>
        </tr>
        <tr>
          <th>Charge ID</th>
          <td>{{ payment.charge_id }}</td>
        </tr>
        <tr>
          <th>Balance Transaction ID</th>
          <td>{{ payment.balance_transaction_id }}</td>
        </tr>
        <tr>
          <th>Application Fee ID</th>
          <td>{{ payment.application_fee_id }}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{{ payment.amount }} {{ payment.currency }}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ payment.status }}</td>
        </tr>
      </tbody>
    </table>

    <br>
    <NuxtLink to="/payment-link">Back</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  width: 800px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
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
  width: 220px;
}
.error {
  color: red;
  margin-bottom: 15px;
}
</style>
