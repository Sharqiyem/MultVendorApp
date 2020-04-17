import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TextInput, ViewPropTypes } from 'react-native';
import Colors from '../constants/Colors';
// import propTypes from 'prop-types'
type Props = {
  containerStyle?: viewPropTypes.style;
  maxLength?: number;
  isRTL: boolean;
  onChangeText?: (text: string) => void;
};

type State = {
  count: number;
};

export default class Textarea extends PureComponent<Props, State> {
  static defaultProps = {
    maxLength: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  _onChangeText = (text) => {
    const { onChangeText } = this.props;

    this.setState({ count: text.length });

    if (onChangeText) onChangeText(text);
  };

  _renderCount() {
    const { maxLength, isRTL } = this.props;
    const { count } = this.state;

    if (!maxLength) return null;

    return (
      <Text
        style={isRTL ? styles.countRTL : styles.count}
      >{`${count}/${maxLength}`}</Text>
    );
  }

  render() {
    const {
      containerStyle,
      maxLength,
      style,
      isRTL,
      value,
      textStyle,
      ...rest
    } = this.props;
    if (!!maxLength) {
      rest.maxLength = maxLength;
    }
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          style={textStyle}
          multiline
          {...rest}
          onChangeText={this._onChangeText}
          ref='textarea'
        />
        {/* <TextField
          multiline
          {...rest}
          style={style}
          onChangeText={this._onChangeText}
          ref="textarea"
        /> */}
        {maxLength !== 0 && this._renderCount()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 100,
    paddingHorizontal: 10,
    // margin: 5,
    backgroundColor: '#fff',
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 35 / 2,
  },
  count: {
    position: 'absolute',
    bottom: 8,
    right: 15,
    fontSize: 14,
    color: '#ccc',
  },
  countRTL: {
    position: 'absolute',
    bottom: 8,
    left: 15,
    fontSize: 14,
    color: '#ccc',
  },
});
