export function getLocaleAndCurrency() {
  const locale = navigator.language || 'en-US';

  const localeToCurrencyMap = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
    'jp-JP': 'JPY',
    'ru-RU': 'RUB',
  };

  const currencyCode = localeToCurrencyMap[locale] || 'USD';
  return currencyCode;
}