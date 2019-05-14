import React from 'react';
import {Link} from 'gatsby';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';


export default class Shell extends React.Component {
    render(){
        return(
            <React.Fragment>
                {/* <CssBaseline/> */}
              <div>{this.props.children} <Drawer></Drawer></div>
              <AppBar position="fixed" color="primary"
                style={{margin: 0, top: 'auto', bottom: 0, background: 'white', color: 'black'}}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                  <IconButton edge="end" color="inherit">
                    <MoreIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
             
            </React.Fragment>

        )
    }
}