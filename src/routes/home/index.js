import React from 'react'
import Herobanner from './herobanner'
import AiAds from './aiAds'
import HelixOrchestrationLayer from './helixOrchestrationLayer'
import MultiPlatform from './multiPlatform'
import PromotionalVideos from './promotionalVideos'
import ProductPhotoshoots from './productPhotoshoots'
import MultiPlatformDigital from './multiPlatformDigital'
import InductriesServiced from './inductriesServiced'
import MarketingSection from './marketingSection'
import CreateProduct from './createProduct'
import SimplePricing from './simplePricing'

export default function HomePage() {
  return (
    <div>
      <Herobanner />
      <AiAds />
      <HelixOrchestrationLayer />
      {/* video */}
      <>
        <MultiPlatform />
      </>
      <>
        <PromotionalVideos />
      </>
      <>
        <ProductPhotoshoots />
      </>
      <>
        <MultiPlatformDigital />
      </>
      {/* video */}
      <InductriesServiced />
      <MarketingSection />
      <CreateProduct />
      <SimplePricing />
    </div>
  )
}
