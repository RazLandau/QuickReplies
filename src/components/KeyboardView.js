import React, { PureComponent } from 'react';
import { View, Button, FlatList, Text, ScrollView } from 'react-native';
import { KeyboardAccessoryView, KeyboardRegistry } from 'react-native-keyboard-input';
import { connect } from 'react-redux';
import * as actions from '../Redux/actions';
import { EDIT_SCREEN, KEYBOARD_VIEW } from '../consts/index';

class KeyboardView extends PureComponent {

constructor(props) {
    super(props);
  }

  onButtonPress() {
    KeyboardRegistry.onItemSelected(KEYBOARD_VIEW, {
    });
  }

 renderButton = ({ item }) =>
 <Button onPress={() => this.props.selectReply(item.description)} title={item.title} />

  render() {
    return (
      <View style={{ flex: 1 }} testId='31143368'>
          <FlatList
          keyExtractor={(item) => item.id}
          data={this.props.replies}
          renderItem={this.renderButton}
          />
          <Button onPress={() => this.onButtonPress()} title='Edit' />
      </View>
    );
  }
}

const mapStateToProps = state =>
  ({ replies: state.replies });

export default connect(mapStateToProps, actions)(KeyboardView);