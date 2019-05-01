import React from 'react';
import PropTypes from 'prop-types';
import imgStyles from './image_list.module.scss';
import Tooltip from '../Tooltip';

const ImageButton = ({position, onClick, children}) => (
  <button className={imgStyles.button} 
          data-pos={position} onClick={onClick}>{children}</button>
)

const ImageItem = ({src, onDeleteImage, onEditImage, onViewImage, ...tooltipOptions}) => (
  <div className={imgStyles.image_wrapper}>
    <Tooltip {...tooltipOptions} classes={[imgStyles.image_container]}>

      <div className={imgStyles.image_inner} style={{backgroundImage: `url(${src})`}}/>
      <ImageButton position='left' onClick={onEditImage}>Edit</ImageButton>
      <ImageButton position='right' onClick={onDeleteImage}>Delete</ImageButton>
      <ImageButton position='center' onClick={onViewImage}>View</ImageButton>
    </Tooltip>

  </div>
);

ImageItem.propTypes = {
  pointer: PropTypes.string,
  tooltip: PropTypes.string,
};


export default ImageItem;
