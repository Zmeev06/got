import React from 'react'
import Img1 from '../../images/midjorney/generator_1.png'
import Img2 from '../../images/midjorney/generator_2.png'
import Img3 from '../../images/midjorney/generator_3.png'
import Img4 from '../../images/midjorney/generator_4.png'
import GeneratorItem from '../GeneratorItem/GeneratorItem'


const MidjourneyPoint = () => {
    return (
        <div className='midjourney-80'>
            <div className="generator_block generator_block_tab_body desc show" id="generator_block_one">
                <GeneratorItem />
                <GeneratorItem />
                <GeneratorItem />
                <GeneratorItem />
            </div>
        </div>
    )
}

export default MidjourneyPoint