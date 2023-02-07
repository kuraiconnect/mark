<script setup lang="ts">
import { useUserStore } from "~~/stores/userStore";

const userStore = useUserStore();

const props = defineProps<{
  companies: string[];
}>();

// state
const test = `query GetOrder($company_uuids: [String]!, $company_type: String!, $page: Int!) {
  listOrders(
    page: $page
    company_type: $company_type
    company_uuids: $company_uuids
  ) {
    ... on OrderPagination {
      data {
        uuid
        user_uuid
        company_buyer_uuid
        company_buyer_name
        company_seller_uuid
        company_seller_name
        created_at
        available_statuses
        status
        order_items {
          uuid
          order_uuid
          catalog_item_uuid
          names
          prices
          weight_key
          amount
        }
        order_reports {
          order_uuid
          user_uuid
          difference {
            old {
              order {
                uuid
                user_uuid
                company_buyer_uuid
                company_buyer_name
                company_seller_uuid
                company_seller_name
                created_at
                status
                currency_code
                order_items {
                  uuid
                  order_uuid
                  catalog_item_uuid
                  names
                  prices
                  weight_key
                  amount
                }
              }
            }
            new {
              order {
                uuid
                user_uuid
                company_buyer_uuid
                company_buyer_name
                company_seller_uuid
                company_seller_name
                created_at
                status
                currency_code
                order_items {
                  uuid
                  order_uuid
                  catalog_item_uuid
                  names
                  prices
                  weight_key
                  amount
                }
              }
            }
          }
          created_at
        }
      }
    }
    ... on ValidationError {
      __typename
      errors
    }
    ... on AuthenticationError {
      __typename
      errors
    }
  }
}
`;
const orders = ref();

// mounted
onMounted(async () => {
  const { data } = await $fetch<{
    data: {
      listOrders: {
        data: [];
      };
    };
  }>("https://order.dev.tglobal.market/graphql", {
    headers: {
      Authorization: `Bearer ${userStore.accessToken}`,
    },
    body: JSON.stringify({
      query: test,
      variables: {
        company_uuids: props.companies,
        company_type: "seller",
        page: 1,
      },
    }),
    method: "POST",
  });

  orders.value = data;
});
</script>

<template>
  <div>
    <h2>fetch</h2>
    <p>result:</p>
    <p>{{ orders }}</p>
  </div>
</template>
