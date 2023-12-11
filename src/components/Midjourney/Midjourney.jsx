import React from 'react'
import MidjourneyTabs from '../MidjourneyTabs/MidjourneyTabs'
import MidjourneyPoint from '../MidjourneyPoint/MidjourneyPoint'
import NavigationsMidj from '../NavigationsMidj/NavigationsMidj'

const Midjourney = () => {
    return (
        <div className='flex-reverse'>
            <div className="midjourney__left">
                <div className="flex"></div>
                <MidjourneyTabs />
            </div>
            <div className="midjourney__right">
                {/* <NavigationsMidj /> */}
            </div>


        </div>
    )
}

export default Midjourney