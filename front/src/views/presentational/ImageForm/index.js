import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import styles from './image_form.module.scss';
import Title from '../Title';
import ImageInput from './ImageInput';
import FormFooter from './FormFooter';
import PointersGrid from './PointersGrid';


const FormTitle = () => <Title text='Save image'/>;

const TextButton = ({text, onClick, ...props}) => <span className={styles.text_button} onClick={onClick} {...props}>{text}</span>;

const TrackBar = props => <input type='range' className={styles.trackbar} {...props}/>;

TrackBar.defaultProps = {
  min: 0,
  max: 100,
}

TrackBar.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

class ImageForm extends PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {

    const { tooltip, pointer, image, totalSize, maxSize, position,
      handleInput, handleSave, handleImage} = this.props;

    const limitMsg = `Memory: ${totalSize} / ${maxSize} ${ maxSize !== Infinity ? 'Mb (LocalStorage limit) ' : ''}`;

    return (
      <form className={styles.image_form} onSubmit={this.handleSubmit}>
        <FormTitle />
        <p>
          {limitMsg}
          {maxSize !== Infinity && <TextButton text="Maximize limit" onClick={() => handleInput('maxSize', Infinity)} 
                      title="Saving image isn't guaranteed with unlimited storage"/>}
        </p>
        <div className={styles.settings}>
          <ImageInput handleInput={handleImage} image={image} 
                      tooltip={tooltip} pointer={pointer} position={position}/>
          
          <TrackBar value={position} 
                    onChange={(e) => handleInput('position', +e.target.value)}/>

          <PointersGrid pointer={pointer} handlePointerChange={handleInput}/>       
          <FormFooter tooltip={tooltip} 
                      handleInput={handleInput}
                      handleSave={handleSave}/> 
        </div>

      </form>
    );
  }
}

export default ImageForm;