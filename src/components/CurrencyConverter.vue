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

export default {
  setup() {
    const amount = ref(1);
    const baseCurrency = ref('USD');
    const targetCurrency = ref('EUR');
    const currencies = ref(['USD', 'EUR', 'GBP', 'JPY', 'RUB']); // список валют
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
