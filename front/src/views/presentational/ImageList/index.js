import React, {Component} from 'react';
import imgStyles from './image_list.module.scss';
import Title from '../Title';
import ImageItem from './ImageItem';


export default class App extends Component {

  render() {

    const { images, deleteImage, handleSelect, handleView } = this.props;
    return (
      <div className={imgStyles.container}>
        <Title text='Available images'/>
        <div className={imgStyles.list}>

          { images.map(img => 
              <ImageItem {...img} 
                onViewImage={() => handleView(img)}
                onDeleteImage={() => deleteImage(img.key)}
                onEditImage={() => handleSelect(img)}/>)
          }
        </div>
      </div>
    );
  }
}