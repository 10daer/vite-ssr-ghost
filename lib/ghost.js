import GhostContentAPI from "@tryghost/content-api";

// Initialize Ghost Content API
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL || "https://demo.ghost.io",
  key: process.env.GHOST_CONTENT_API_KEY || "22444f78447824223cefc48062",
  version: "v5.0",
});

/**
 * Fetch data from Ghost CMS
 * @param {string} type - The type of content to fetch (posts, pages, authors, tags, settings)
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Ghost API response
 */
export async function fetchGhostData(type, options = {}) {
  try {
    let data;

    switch (type) {
      case "posts":
        data = await api.posts.browse(options);
        break;
      case "post":
        data = await api.posts.read(options);
        break;
      case "pages":
        data = await api.pages.browse(options);
        break;
      case "page":
        data = await api.pages.read(options);
        break;
      case "authors":
        data = await api.authors.browse(options);
        break;
      case "tags":
        data = await api.tags.browse(options);
        break;
      case "settings":
        data = await api.settings.browse();
        break;
      default:
        throw new Error(`Invalid content type: ${type}`);
    }

    return { [type]: data };
  } catch (error) {
    console.error(`Error fetching Ghost ${type}:`, error);
    return { [type]: null, error: error.message };
  }
}

/**
 * Custom hook for Ghost content
 * @param {string} type - Content type
 * @param {Object} options - Query options
 * @returns {Object} - { data, loading, error }
 */
export function useGhostContent(type, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGhostData(type, options);
        setData(result[type]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, JSON.stringify(options)]);

  return { data, loading, error };
}
