import React from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ imageGalleryItems, onGalleryItemClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {imageGalleryItems.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          id={id}
          onItemClick={() => onGalleryItemClick(id)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
