export async function getFunction(params = {}) {
  const query = new URLSearchParams(params).toString();

  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}
