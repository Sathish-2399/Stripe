<template>
  <div class="container">
    <h1>Dispute</h1>

    <div class="card">
      <h3>Create Dispute</h3>
      <p>Create a dispute for the full transaction amount.</p>
      <NuxtLink to="/dispute/create">
        <button>Create Dispute</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>Partial Dispute</h3>
      <p>Create a dispute for part of the transaction amount.</p>
      <NuxtLink to="/dispute/partial">
        <button>Create Partial Dispute</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>Get Dispute</h3>
      <p>Retrieve dispute details by Dispute ID.</p>
      <NuxtLink to="/dispute/get">
        <button>Get Dispute</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>All Disputes</h3>
      <p>View all disputes created in the system.</p>
      <NuxtLink to="/dispute/all">
        <button>View Disputes</button>
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
