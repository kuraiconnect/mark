<script setup lang="ts">
import GET_ORDER from "~~/graphql/GetOrder.gql";

const props = defineProps<{
  companies: string[];
}>();

// state
const page = ref(1);

// fetch orders
const variables = computed(() => {
  return {
    company_uuids: props.companies,
    company_type: "seller",
    page: page.value,
  };
});

const { result } = useQuery(GET_ORDER, variables.value, {
  clientId: "order",
  prefetch: false,
  enabled: true,
  returnPartialData: true,
});
</script>

<template>
  <div>
    <h2>apollo</h2>
    <p>result:</p>
    <p>{{ result }}</p>
  </div>
</template>
