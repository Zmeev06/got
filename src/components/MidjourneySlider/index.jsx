import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { MidjourneySliderItem } from '../MidjourneySliderItem';

export const MidjourneySlider = ({text, setText}) => {
  const sections = [
    {
      title: 'Стили',
      link: 'styles'
    },
    {
      title: 'Освещение',
      link: 'lighting'
    },
    {
      title: 'Камера',
      link: 'camera'
    },
    {
      title: 'Художественность',
      link: 'artistry'
    },
    {
      title: 'Цвета',
      link: 'colors'
    },
    {
      title: 'Материалы',
      link: 'materials'
    }
  ];
  const [imageLists, setImageLists] = useState();

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);

    const imagePaths = {
      camera: importAll(require.context('../../slider_images/camera', false, /\.(png|jpe?g|svg)$/)),
      styles: importAll(require.context('../../slider_images/styles', false, /\.(png|jpe?g|svg)$/)),
      lighting: importAll(
        require.context('../../slider_images/lighting', false, /\.(png|jpe?g|svg)$/)
      )
    };
    const imageLists = {};
    Object.keys(imagePaths).forEach((folder) => {
      imageLists[folder] = imagePaths[folder].map((imagePath) => {
        const pathArray = imagePath.split('/');
        const fileName = pathArray[pathArray.length - 1];
        const match = fileName.match(/^(.+)\.(\w+)\.(\w+)\.(.+)$/);

        if (match) {
          const name = match[1];
          const style = match[2];

          return { name, style, folder, fileName };
        } else {
          console.error(`Invalid filename format: ${fileName}`);
          return null;
        }
      });
    });

    setImageLists(imageLists);
  }, []);

  const [currentSection, setCurrentSection] = useState('styles');
  console.log(imageLists);
  return (
    <div className={styles.main}>
      <div className={styles.sections}>
        {sections.map((item, index) => (
          <div
            key={index}
            className={`${styles.section} ${
              item.link === currentSection ? styles.activeSection : ''
            }`}
            onClick={() => setCurrentSection(item.link)}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className={styles.images}>
        {imageLists &&
          imageLists[currentSection].map((item, index) => (
              <MidjourneySliderItem key={index} img={`../../slider_images/` +
                  `${item.folder}/` +
                  `${item.fileName.split('.')[0]}.` +
                  `${item.fileName.split('.')[1]}.` +
                  `${item.fileName.split('.')[3]}`} name={item.name}
                  value={item.style}
                  text={text}
                  setText={setText} />
          ))}
      </div>
      <div></div>
    </div>
  );
};
