import React from 'react'
import Img1 from '../../images/midjorney/generator_1.png'

const GeneratorItem = (title, img) => {
    const MidjourneyData = {
        title: 'Быстрые действия',
        img: Img1
    };
    return (

        <div className="generator_item">
            <div className="generator_item_top">
                <label className="generator_check_container">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkmark"></span>
                </label>
                <span>{MidjourneyData.title}</span>
            </div>
            <div className="generator_item_middle">
                <img src={MidjourneyData.img} alt="" />
            </div>
            <div className="generator_item_bottom">
                <input type="range" min="1" max="100" value="0" className="slider_range" />
            </div>
        </div>

    )
}

export default GeneratorItem