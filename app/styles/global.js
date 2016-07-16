'use strict';
/* define all the style here */

import React, {
  StyleSheet
} from 'react-native';



module.exports = StyleSheet.create({
  navigatorBox: {
    flex: 1,
  },
  listviewWrapper: {
    marginTop: 60,
  },
  detailText: {
    marginBottom: 10,
  },
  listView: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
  },
  actionBar: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#f98262',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  appBackBtn: {
    
  },
  appTitle: {
    fontSize: 20,
  },
  appActionBarView: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 20,
  },
  detailItem: {
    padding: 20,
    flex: 1,
    flexDirection: "column"
  },
  bigfont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  speakerName: {
    fontWeight: 'bold',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

});
