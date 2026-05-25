export async function onRequest(context) {
  const country = context.request.cf?.country;
  if (country === 'CN') {
    return new Response('Access Denied', { status: 403 });
  }
  return context.next();
}
