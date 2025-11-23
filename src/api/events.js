// Create an event ============================================================
export const recipeTrackEvent = (event) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((res) => res.json())

// Get total total views of a single recipe ===================================
export const getTotalViews = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/totalViews/${recipeId}`,
  ).then((res) => res.json())

// Get the daily views of the recipe =========================================
export const getDailyViews = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyViews/${recipeId}`,
  ).then((res) => res.json())

// Get the daily duration on the recipe page ==================================
export const getDailyDurations = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyDurations/${recipeId}`,
  ).then((res) => res.json())

export const getTotalLikes = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/totalLikes/${recipeId}`,
  ).then((res) => res.json())

// Get the recipe list with information =====================================
export const getLikesInfo = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/likesInfo/`,
  )
  return await res.json()
}
