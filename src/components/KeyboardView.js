import React, { PureComponent } from 'react';
import { View, Button, FlatList, Text, ScrollView } from 'react-native';
import { KeyboardAccessoryView, KeyboardRegistry } from 'react-native-keyboard-input';
import { connect } from 'react-redux';
import * as actions from '../Redux/actions';
import { EDIT_SCREEN, KEYBOARD_VIEW, EDIT_BUTTON } from '../consts/consts';

class KeyboardView extends PureComponent {

constructor(props) {
    super(props);
  }

  onEditPress() {
    KeyboardRegistry.onItemSelected(KEYBOARD_VIEW, {
      item: EDIT_BUTTON,
    });
  }

 renderButton = ({ item }) =>
 <Button color='black' onPress={() => this.props.selectReply(item.description)} title={item.title} />

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
          <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.replies}
          renderItem={this.renderButton}
          />
          <Button onPress={() => this.onEditPress()} title='Edit' />
      </View>
    );
  }
}

const mapStateToProps = state =>
  ({ replies: state.replies });

export default connect(mapStateToProps, actions)(KeyboardView);