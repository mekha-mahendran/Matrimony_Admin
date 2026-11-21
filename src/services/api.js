const CANDIDATE_URLS = [
  import.meta.env.VITE_API_URL,
  'http://localhost:5000/api',
  'https://relocate-carnivore-raffle.ngrok-free.dev/api',
  'https://matrimony-backend-jade.vercel.app/api',
].filter(Boolean);

let activeBaseUrl = CANDIDATE_URLS[0];

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...(options.headers || {}),
  };

  let lastError = null;

  // Try activeBaseUrl first, then fallback urls if network error
  const urlsToTry = [
    activeBaseUrl,
    ...CANDIDATE_URLS.filter((u) => u !== activeBaseUrl),
  ];

  for (const baseUrl of urlsToTry) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      activeBaseUrl = baseUrl;
      return data;
    } catch (err) {
      lastError = err;
      // If it's a 4xx/5xx error from a working server, don't retry other base URLs
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Unable to connect to backend server');
}

export const adminApi = {
  getBaseUrl: () => activeBaseUrl,

  async getProfiles() {
    const res = await request('/profiles', { method: 'GET' });
    return res.profiles || [];
  },

  async getProfileById(id) {
    const res = await request(`/profiles/${id}`, { method: 'GET' });
    return res.profile;
  },

  async createProfile(profileData) {
    const res = await request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
    return res.profile;
  },

  async updateProfileStatus(id, action, reason = '') {
    const res = await request(`/profiles/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ action, reason }),
    });
    return res.profile;
  },

  async deleteProfile(id) {
    return await request(`/profiles/${id}`, {
      method: 'DELETE',
    });
  },
};

