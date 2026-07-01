const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const getApiBaseUrl = () => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://127.0.0.1:8000';
};

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && payload.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/${resource}/`);

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
};
