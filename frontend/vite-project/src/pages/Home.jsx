//Home.jsx
import React from 'react'
import UrgentRequests from '../mycomponents/UrgentRequests'
import Corousel from '../mycomponents/Corousel'
import HeroSection from '../mycomponents/HeroSection'
import BloodLinkChatbot from '../mycomponents/ChatBot'
function Home() {
  return (
    <div> 
    <div className='mt-0'>
      <Corousel/>
    </div>
    <div>
      <UrgentRequests/>
    </div>
    <div>
      <HeroSection/>
    </div>
</div>
    

  )
}

export default Home