import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'styles/Home.less';

export default class Home extends Component {
    render() {
        return (
            <div className="title">
                Home
                <Link to={`/login`}>go to login</Link>
                {this.props.children}
            </div>
        )
    }
}
