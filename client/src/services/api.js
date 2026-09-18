const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Generic error thrown for any failed API call.
 * Keeps a reference to the HTTP status so callers can branch on it if needed.
 */
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // response wasn't JSON — ignore and use the default message
    }
    throw new ApiError(message, response.status);
  }

  // Some endpoints (e.g. 204 No Content) may not return a body
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/**
 * Fetch the restaurant menu.
 * GET /api/menu
 * @returns {Promise<Array>} list of menu items
 */
export async function fetchMenu() {
  const response = await fetch(`${BASE_URL}/api/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}

/**
 * Submit an order.
 * POST /api/orders
 * @param {Object} order - order payload, e.g. { items: [{ id, quantity }], total }
 * @returns {Promise<Object>} the created order (as returned by the server)
 */
export async function submitOrder(order) {
  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return handleResponse(response);
}

export { ApiError };