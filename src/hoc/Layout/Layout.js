import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxl from '../Auxl/Auxl';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSidedrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer };
        } )
    }
    
    render() {
        return (
          <Auxl>
            <Toolbar
              drawerToggleClicked={this.sideDrawerToggleHandler}
              isAuth={this.props.isAuthenticated}
            />

            <SideDrawer
              isAuth={this.props.isAuthenticated}
              open={this.state.showSidedrawer}
              closed={this.sideDrawerClosedHandler}
            />

            <main className={classes.Content}>{this.props.children}</main>
          </Auxl>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);