import Features from "../components/LandingComponent/Features"
import Hero from "../components/LandingComponent/Hero"
import LandingPageFooter from "../components/LandingComponent/LandingPageFooter"
import LandingPageNavbar from "../components/LandingComponent/LandingPageNavbar"
import Pricing from "../components/LandingComponent/Pricing"
import Testimonials from "../components/LandingComponent/Testimonials"

function LandingPage() {
  console.log(localStorage)
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingPageNavbar />
      <Hero />
      <Features />
      <Testimonials />
      {/* <Pricing /> */}
      <LandingPageFooter />
    </div>
  )
}

export default LandingPage;
