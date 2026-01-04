import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { Page, Card, Text, BlockStack } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

type OrderListItem = {
  id: string;
  name: string;
  createdAt: string;
  displayFinancialStatus?: string | null;
  displayFulfillmentStatus?: string | null;
  totalPriceSet?: {
    presentmentMoney?: { amount: string; currencyCode: string } | null;
  } | null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const resp = await admin.graphql(
    `#graphql
      query OrdersList($first: Int!) {
        orders(first: $first, sortKey: CREATED_AT, reverse: true) {
          nodes {
            id
            name
            createdAt
            displayFinancialStatus
            displayFulfillmentStatus
            totalPriceSet {
              presentmentMoney {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
    { variables: { first: 20 } }
  );

  const json = await resp.json();
  const orders: OrderListItem[] = json?.data?.orders?.nodes ?? [];

  return { orders };
};

export default function OrdersPage() {
  const { orders } = useLoaderData<typeof loader>();

  return (
    <Page title="Orders">
      <BlockStack gap="400">
        {orders.length === 0 ? (
          <Text as="p">No orders found.</Text>
        ) : (
          orders.map((o) => {
            const money = o.totalPriceSet?.presentmentMoney;
            const total = money ? `${money.amount} ${money.currencyCode}` : "";
            const metaParts = [
              new Date(o.createdAt).toLocaleString(),
              total,
              o.displayFinancialStatus ?? "",
              o.displayFulfillmentStatus ? `• ${o.displayFulfillmentStatus}` : "",
            ].filter(Boolean);

            return (
              <Card key={o.id}>
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h2">
                    {o.name}
                  </Text>
                  <Text as="p" tone="subdued">
                    {metaParts.join(" ")}
                  </Text>
                </BlockStack>
              </Card>
            );
          })
        )}
      </BlockStack>
    </Page>
  );
}
