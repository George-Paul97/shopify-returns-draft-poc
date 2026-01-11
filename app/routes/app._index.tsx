import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <s-page heading="Returns Draft PoC">
      <s-button slot="primary-action" variant="primary" href="/app/orders">
        View Orders
      </s-button>

      <s-section heading="What this PoC does">
        <s-paragraph>
          This app demonstrates an embedded Shopify Admin workflow for creating a
          <strong> return request draft</strong> (no real refunds or gift cards
          executed).
        </s-paragraph>
      </s-section>

      <s-section heading="Next">
        <s-unordered-list>
          <s-list-item>
            Open <s-link href="/app/orders">Orders</s-link> and select an order
          </s-list-item>
          <s-list-item>
            Create a return draft (items + reason + resolution)
          </s-list-item>
          <s-list-item>View drafts list + draft details</s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
