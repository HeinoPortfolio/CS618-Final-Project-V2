import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {
  getTotalViews,
  getDailyViews,
  getDailyDurations,
  getTotalLikes,
} from '../api/events'
/*import {
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory'*/

export function RecipeStatistics({ recipeId }) {
  // Get total views for the recipe =================
  const totalViews = useQuery({
    queryKey: ['totalViews', recipeId],
    queryFn: () => getTotalViews(recipeId),
  })
  // Get daily view for the recipe ==================
  const dailyViews = useQuery({
    queryKey: ['dailyViews', recipeId],
    queryFn: () => getDailyViews(recipeId),
  })
  // Get the daily duration for the recipe ==========
  const dailyDurations = useQuery({
    queryKey: ['dailyDurations', recipeId],
    queryFn: () => getDailyDurations(recipeId),
  })
  const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })

  // Display message about loading the stats of the recipe ===
  if (
    totalViews.isLoading ||
    dailyViews.isLoading ||
    dailyDurations.isLoading ||
    totalLikes.isLoading
  ) {
    return <div>Loading recipe stats...</div>
  }
  // End useQuery functions ====================================================
  return (
    <div>
      <b>Total Views: </b> {totalViews.data?.views}
      <br />
      <b>Total Likes: </b> {totalLikes.data?.likes}
    </div>
  )
}

RecipeStatistics.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
