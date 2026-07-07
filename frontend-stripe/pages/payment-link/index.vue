<template>
  <div class="container">
    <h1>Payment Link</h1>

    <div class="card">
      <h3>Create Payment Link</h3>
      <p>Create a payment link for a product.</p>
      <NuxtLink to="/payment-link/create">
        <button>Create Link</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>Get Payment Link</h3>
      <p>Retrieve payment link details by Payment Link ID.</p>
      <NuxtLink to="/payment-link/get">
        <button>Get Link</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>Make Payment</h3>
      <p>Make a test payment using a Payment Link ID.</p>
      <NuxtLink to="/payment-link/pay">
        <button>Make Payment</button>
      </NuxtLink>
    </div>

    <NuxtLink to="/">Back Home</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  width: 700px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
h1 {
  margin-bottom: 30px;
}
h3 {
  margin-bottom: 10px;
}
p {
  margin-bottom: 15px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
