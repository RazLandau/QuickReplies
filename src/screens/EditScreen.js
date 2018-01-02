import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Button, FlatList, TextInput, StyleSheet, Platform, PixelRatio, TouchableOpacity, Text, Image } from 'react-native';
import * as actions from '../Redux/actions';

class EditScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // replies: props.replies,
      newReplies: this.props.replies.slice(),
    };
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }


  onSaveClick(){
    this.props.saveChanges(this.state.newReplies);
    this.props.navigator.dismissModal();
  }

  onCancelClick = () => this.props.navigator.dismissModal();

  onAddClick = () => this.setState({ newReplies: [...this.state.newReplies,
    {
      title: '',
      description: ''
  }] })

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
  <View style={{ alignSelf: 'stretch', padding: 5, flex: 1, marginBottom: 25 }}>
        <View style={styles.inputContainer}>
          <View style={{ flex: 5, flexDirection: 'column'}}>
            <TextInput
            style={styles.textInput}
            defaultValue={item.title}
            placeholder='title'
            onChangeText={this.updateTitle(item)}
            />
            <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, height: 50 }}
            defaultValue={item.description}
            placeholder='description'
            multiline
            onChangeText={this.updateDescription(item)}
            />
          </View>
          <TouchableOpacity onPress={this.onDeleteClick(item)}>
            <Image
            testID='delete'
            style={{width: 20, height: 20 }}
            source={require('../assets/trash.png')}
            />
          </TouchableOpacity>
        </View>
    </View>


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', padding: 10 }}>
          <FlatList
          style={{ alignSelf: 'stretch', paddingTop: 20 }}
          keyExtractor={(item) => item.id}
          data={[...this.state.newReplies]}
          renderItem={this.renderEditItem}
          />
        </View>
       <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View>
          <Button title='Add' onPress={this.onAddClick} />
          <Button title='Cancel' onPress={this.onCancelClick} />
          <Button title='Save' onPress={this.onSaveClick}/>
        </View>
      </View>
      // <View style={styles.container}>
      //   <View contentContainerStyle={styles.scrollContainer}>
      //     <FlatList
      //       // style={{ alignSelf: 'stretch', paddingTop: 20 }}
      //       keyExtractor={(item) => item.id}
      //       data={[...this.state.replies, ...this.state.newReplies]}
      //       renderItem={this.renderEditItem}
      //       />
      //   </View>
      //   <View blurType="xlight" style={styles.blurContainer}>
      //     <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
      //       <Button title='Add' onPress={this.onAddClick} />
      //       <Button title='Cancel' onPress={this.onCancelClick} />
      //       <Button title='Save' onPress={() => {}}/>
      //     </View>
      // </View>
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
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 3,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    //flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    // justifyContent: 'space-between',
    // marginBottom: 25,
  },
  blurContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  textInput: {
    flex: 1,
    // marginLeft: 10,
    //marginTop: 10,
    //marginBottom: 10,
    // paddingLeft: 10,
    //paddingTop: 2,
    // paddingBottom: 5,
    // fontSize: 16,
    // backgroundColor: 'white',
    // borderWidth: 0.5 / PixelRatio.get(),
    //borderRadius: 18,
    borderColor: 'gray',
    borderWidth: 1
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});