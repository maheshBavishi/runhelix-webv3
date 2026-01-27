import React from 'react'
import Herobanner from './herobanner'
import AiAds from './aiAds'
import HelixOrchestrationLayer from './helixOrchestrationLayer'
import MultiPlatform from './multiPlatform'
import PromotionalVideos from './promotionalVideos'
import ProductPhotoshoots from './productPhotoshoots'
import MultiPlatformDigital from './multiPlatformDigital'

export default function HomePage() {
  return (
    <div>
      <Herobanner />
      <AiAds />
      <HelixOrchestrationLayer />
      <MultiPlatform />
      <PromotionalVideos />
      <ProductPhotoshoots />
      <MultiPlatformDigital />
    </div>
  )
}
