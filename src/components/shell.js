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
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';


export default class Shell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drawer: false
        }
    }

    toggleDrawer(event){
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      this.setState({ drawer: !this.state.drawer });
    }
    render(){
        return(
            <React.Fragment>
                {/* <CssBaseline/> */}
              <div>{this.props.children}</div>

              <AppBar position="fixed" color="primary"
                style={{margin: 0, top: 'auto', bottom: 0, background: 'white', color: 'black'}}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Open drawer"
                    onClick={()=>this.setState({drawer: !this.state.drawer})}
                    onClose={()=>this.setState({drawer: false})}>
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
              <Drawer anchor="left" open={this.state.drawer}
              onClick={e => this.toggleDrawer(e)}
                onKeyDown={e => this.toggleDrawer(e)}>
                <div style={{width: 250}} role="presentation">
                  <List>
                    {[{label: 'Home', path: '/'}, {label: 'Tags', path: '/'}, {label: 'Archive', path: '/'}]
                    .map((item, index) => (
                      <Link to={item.path} onClick={e => this.toggleDrawer(e)}>
                      <ListItem button key={item.label}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                      </Link>
                    ))}
                  </List>
                  <Divider />
                  <List>
                    {[{label: 'GitHub', path: '/'}, {label: 'Facebook', path: '/'}, {label: 'Twitter', path: '/'}]
                    .map((item, index) => (
                      <Link to={item.path} onClick={e => this.toggleDrawer(e)}>
                      <ListItem button key={item.label}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                      </Link>
                    ))}
                  </List>
                </div>
              </Drawer>
            </React.Fragment>

        )
    }
}