import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Button, FlatList, TextInput, StyleSheet, Platform, PixelRatio, TouchableOpacity, Text, Image } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import * as actions from '../Redux/actions';
import LineSeperator from '../components/LineSeperator';

class EditScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newReplies: this.props.replies.slice(),
    };
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }


  onSaveClick(){
    this.props.saveChanges(this.state.newReplies.filter(reply => reply.title));
    this.props.navigator.dismissModal();
  }

  onCancelClick = () => this.props.navigator.dismissModal();

  onAddClick = () => this.setState({
    newReplies: [...this.state.newReplies,
      {
        title: '',
        description: ''
      }
    ]
  })

  onDeleteClick(item){
    const that = this;
    return function(){
      const newReplies = that.state.newReplies.filter(reply => reply !== item);
      that.setState({ newReplies });
    }
  }

  updateTitle(item) {
    const that = this;
    return function (newText) {
      const newReplies = that.state.newReplies.map(reply => reply !== item ? reply : {
        title: newText,
        description: reply.description
      });
      that.setState({ newReplies });
    };
 }

 updateDescription(item) {
  const that = this;
  return function (newText) {
    const newReplies = that.state.newReplies.map(reply => reply !== item ? reply : {
      title: reply.title,
      description: newText
    });
    that.setState({ newReplies });
  };
}

 renderEditItem = ({ item }) =>
    <View style={styles.replyContainer}>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.textInput}
        defaultValue={item.title}
        placeholder='title'
        onChangeText={this.updateTitle(item)}
        />
        <TextInput
        style={styles.textInput}
        defaultValue={item.description}
        placeholder='description'
        multiline
        onChangeText={this.updateDescription(item)}
        />
      </View>
      <Icon
      name='delete'
      onPress={this.onDeleteClick(item)}
      />
    </View>


  render() {
    return (
      <View blurType="xlight" style={styles.container}>
          <FlatList
          style={styles.listContainer}
          keyExtractor={(item, index) => index}
          data={this.state.newReplies}
          renderItem={this.renderEditItem}
          />
        <Divider style={{ backgroundColor: '#bbb' }}/>
        <View>
          <Button color='green' title='Add' onPress={this.onAddClick} />
          <Button color='red' title='Cancel' onPress={this.onCancelClick} />
          <Button title='Save' onPress={this.onSaveClick}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state =>
  ({ replies: state.replies });

export default connect(mapStateToProps, actions)(EditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    alignSelf: 'stretch',
    paddingTop: 20,
    padding: 10
  },
  replyContainer: {
    flexDirection: 'row',
    marginBottom: 25
  },
  inputContainer: {
    flex: 5,
    flexDirection: 'column'
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    // borderRadius: 18,
    borderColor: 'gray',
    borderWidth: 1
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});