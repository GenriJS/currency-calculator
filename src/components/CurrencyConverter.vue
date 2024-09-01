<template>
  <div class="converter">
    <h1>Currency Converter</h1>
    <input type="number" v-model="amount" placeholder="Enter amount" />
    <select v-model="baseCurrency">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
    <select v-model="targetCurrency">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
    <p>Converted Amount: {{ convertedAmount }}</p>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { fetchRates } from '../services/currencyService.js';
import { getLocaleAndCurrency } from '../services/LocaleCurrency.js';

export default {
  setup() {
    const amount = ref(1);
    const baseCurrency = ref(getLocaleAndCurrency());
    const targetCurrency = ref('EUR');
    const currencies = ref(['USD', 'EUR', 'GBP', 'JPY', 'RUB']);
    const rates = ref({});

    const convertedAmount = computed(() => {
      const rate = rates.value[targetCurrency.value];
      return amount.value * rate;
    });

    const fetchCurrencyRates = async () => {
      rates.value = await fetchRates(baseCurrency.value);
    };

    watch([amount, baseCurrency, targetCurrency], fetchCurrencyRates);

    onMounted(() => {
      fetchCurrencyRates();
    });

    return {
      amount,
      baseCurrency,
      targetCurrency,
      currencies,
      convertedAmount,
    };
  },
};

</script>

<style scoped>
.converter {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

input[type="number"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

select {
  width: calc(50% - 22px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

select:nth-of-type(1) {
  margin-right: 10px;
}

p {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  text-align: center;
}
</style>