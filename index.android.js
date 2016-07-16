/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableHighlight,
  Alert,
} from 'react-native';


import styles from './app/styles/global';

let confID = 1;
let baseURL = "http://dev-conf-schedule.pantheonsite.io/";
let homeDataURL = baseURL + 'rest/get/conf?confid=' + confID;
let detailDataURL = baseURL + 'rest/get/conf/schedule?confid=' + confID;



class JSChannel extends Component {

  render() {
    return (
      <AppToolbar />
    );
  }
}


class AppToolbar extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        style={styles.navigatorBox}
        initialRoute={{id: 'home', title: "Conf schedule "}}
        renderScene={ (route, navigator) => this.navigatorRenderScene(route, navigator) }
        configureScene={ this.configureScene }
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
                {
                  if (route.id == "home") {
                    return '';
                  } else {
                    return (
                      <View style={styles.appActionBarView}>
                        <TouchableHighlight style={styles.appBackBtn} onPress={() => navigator.jumpBack(0)} underlayColor="#fff">
                          <Text style={styles.appTitle}>&lang; Back</Text>
                        </TouchableHighlight>
                      </View>
                    );
                  }
                },
               RightButton: (route, navigator, index, navState) =>
                 { return (<Text></Text>); },
               Title: (route, navigator, index, navState) =>
                 { return (<View style={styles.appActionBarView}><Text style={styles.appTitle}>{route.title}</Text></View>); },
             }}
             style={styles.actionBar} />
        }/>
    );
  }
                 

  configureScene(route, routeStack){
    return Navigator.SceneConfigs.PushFromRight;
  }

  navigatorRenderScene(route, navigator) {
    //_navigator = navigator;
    switch (route.id) {
      case 'home':
        return <HomeScreen navigator={navigator}/>;
      case 'detail':
        return <ViewDetail navigator={navigator} nid={route.nid}/>;
    }
  }
}



class HomeScreen extends Component {

  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: dataSource.cloneWithRows(['loading...'])};
  }

  componentWillMount() {
    fetch(homeDataURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.fetchHomeData(responseJson);
    })
    .done((responseJson) => {});
  }


  fetchHomeData(responseJson) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseJson),
    });
  }

  render() {
    return (
        <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this.renderHeader}/>
    );
  }

  renderHeader() {
    return (<View style={styles.listviewWrapper}></View>)
  }

  _renderRow(rowData) {
    //var rowHash = Math.abs(hashCode(rowData));
    //var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    //console.log(rowData + "helloz");
    return (
      <TouchableHighlight 
        onPress={() => this._navigate(rowData)}
        underlayColor="#f9f9f9">
        <View>
          <View  style={styles.listItem}>
            <Text style={styles.bigfont}>
              {rowData.display}
            </Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  _navigate(rowData) {
    this.props.navigator.push({id: "detail", nid: rowData.nid});
    this.props.navigator.navigationContext.currentRoute.title = rowData.display;
  }

 
}



class ViewDetail extends Component{
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: dataSource.cloneWithRows(['loading...'])};
  }

  componentWillMount() {
    let newURL = detailDataURL + "&nid=" + this.props.nid;
    fetch(newURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.fetchHomeData(responseJson);
    })
    .done((responseJson) => {
    });
  }


  fetchHomeData(responseJson) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseJson)
    });
  } 

  render() {
    return (
         <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this.renderHeader}/>
    );
  }

  renderHeader() {
    return (<View style={styles.listviewWrapper}></View>)
  }


  _renderRow(rowData) {
    return (
      <View>
          <View  style={styles.detailItem}>
            <View  style={styles.detailText}>
            <Text style={styles.bigfont} lineBreakMode="tail" numberOfLines={5}>
              {rowData.topic}
            </Text>
            </View>
            <View  style={styles.detailText}>
              <Text style={styles.speakerName}>
                {rowData.speaker}
              </Text>
            </View>
            <View  style={styles.detailText}>
            <Text>
              {rowData.time}
            </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
    );
  }

}





AppRegistry.registerComponent('JSChannel', () => JSChannel);
