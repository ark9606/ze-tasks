import React, {PureComponent} from 'react';
import styles from './image_form.module.scss';
import Button from './Button';

export default class FormFooter extends PureComponent {
  handleChange = (event) => {
    this.props.handleInput('tooltip', event.target.value);
  }

  render() {

    const {tooltip, handleSave} = this.props;

    return (
      <footer className={styles.footer}>
        <input type="text" name="toolrip" onChange={this.handleChange} value={tooltip} maxLength={200} placeholder='Tooltip text'/>
        <Button title='Save' onClick={handleSave}/>
      </footer>
    );
  }
}