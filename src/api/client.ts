// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(
  endpoint: string,
  { body, ...customConfig }: any = {}
) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    // As we are requesting to another origin, using an API key, we are blocked while using fetch.
    // So, this URL serves as a backend to bypass CORS.
    const response = await fetch(
      `${
        customConfig.useProxy ? process.env.REACT_APP_PROXY_URL : ""
      }${endpoint}`,
      config
    );
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint: string, body: Object, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
