import { ProviderName } from '@/constants/provider';
import { provide, ref, watch } from 'vue';

const providePersistRef = (providerName: ProviderName) => {
  const storageData = sessionStorage.getItem(providerName);
  const providedData = ref<string | number | null>(
    typeof storageData === 'number' ? +storageData : storageData
  );

  provide(providerName, providedData);

  watch(providedData, value => {
    if (value !== null) {
      sessionStorage.setItem(providerName, `${value}`);
    }
  });
};

export default providePersistRef;
