export async function loadMap(city) {
  try {
    const data = await import(`../maps/${city}.json`);
    return data.default;
  } catch (error) {
    console.error(`Failed to load map for ${city}:`, error);
    return {
      layoutGrid: [[0]],
      items: []
    };
  }
}
