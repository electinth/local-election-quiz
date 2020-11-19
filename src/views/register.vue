<template>
  <div class="flex-1 flex flex-col bg-gray">
    <div class="my-auto space-y-8 md:space-y-12 m-4">
      <H2 class="text-center font-black max-w-screen-lg mx-auto"
        >หากสะดวก
        รบกวนขอข้อมูลเพิ่มเติมเพื่อรวบรวมเป็นสถิติสำหรับการวิจัยของสถาบันฯ</H2
      >
      <div
        class="flex flex-col space-y-2 md:space-y-6 max-w-xs md:max-w-md mx-auto"
      >
        <div class="flex flex-row space-x-2">
          <Label for="age" class="w-20 my-auto text-right">อายุ</Label>
          <input
            type="number"
            id="age"
            v-model.number="age"
            class="flex-1 px-4 py-2 border-2 appearance-none"
          />
        </div>
        <div class="flex flex-row space-x-2">
          <Label for="province" class="w-20 my-auto text-right">จังหวัด</Label>
          <ProvinceInput v-model="province" />
        </div>
      </div>
      <div class="flex flex-col text-center space-y-2">
        <Button class="mx-auto" @click="submit">ส่งคำตอบ</Button>
        <router-link to="/result" class="underline"><P>ข้าม</P></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue';
import Button from '@/components/button.vue';
import H2 from '@/components/typography/h2.vue';
import P from '@/components/typography/p.vue';
import Label from '@/components/typography/label.vue';
import ProvinceInput from '@/components/province-input.vue';
import router from '@/router';
import { ProviderName } from '@/constants/provider';
import { submitDemographicData } from '@/utils/database';

export default defineComponent({
  components: {
    Button,
    H2,
    P,
    Label,
    ProvinceInput
  },
  setup() {
    const userId = inject(ProviderName.UserId) as Ref<string>;

    const age = ref<number>();
    const province = ref<string>();

    const submit = () => {
      console.log(age.value, province.value);

      if (age.value && province.value) {
        submitDemographicData(userId.value, {
          age: age.value,
          province: province.value
        });

        router.push('/result');
      }
    };

    return {
      age,
      province,
      submit
    };
  }
});
</script>
