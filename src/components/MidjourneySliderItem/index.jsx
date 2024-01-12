import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'

export const MidjourneySliderItem = ({ img, name, text, value, setText }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleAddWord = (word) => {
    if (word && text.indexOf(word) === -1) {
      setText((prevString) => prevString + ' ' + word);
    }
  };

  const handleRemoveWord = (word) => {
    setText((prevString) => prevString.replace(new RegExp(`\\b${word}\\b`, 'g'), '').trim());
  };

  useEffect(() => {
    if(isChecked) {
      handleAddWord(value)
    } else {
      handleRemoveWord(value)
    }
  }, [isChecked])

  useEffect(() => {
    if(text.includes(value)) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [text])
  return (
    <div className={styles.main}>
      <div className={styles.checkBox}>
        <input type="checkbox" id={`sliderItem-${value}`} checked={isChecked} value={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
        <label htmlFor={`sliderItem-${value}`}>{name}</label>
      </div>
      <img src={img} alt="name" className={styles.img} onClick={() => setIsChecked(!isChecked)} />
    </div>
  );
};
