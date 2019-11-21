import React, { Component } from 'react';
import { userInfo } from '../../redux/actions';
import { connect } from 'react-redux';

class Login extends Component {
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }
    setUser = () => {
        this.props.userInfo('redux-dispatch')
    }
    render() {
        return (
            <div>
                {this.props.name}
                <button onClick={this.setUser}>改变name</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {setUserInfo} = state;
    return {name: setUserInfo.name}
}
const mapDispatchToProps = dispatch => {
    return ({
        userInfo: user => dispatch(userInfo(user))
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);