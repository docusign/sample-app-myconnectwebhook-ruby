import axios from './interceptors';

export async function storeData(request) {
  const response = await axios.post(
    '/api/docusign/clickwrap/store_data.json',
    request,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function getInitParams() {
  const response = await axios.get('/api/docusign/clickwrap/init_params.json', {
    withCredentials: true,
  });
  return response.data;
}
