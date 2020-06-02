import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from './Home.module.less';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.toSolidCarousel = this.toSolidCarousel.bind(this);
    }
    toSolidCarousel() {
        this.props.history.push({pathname: '/SolidCarousel'})
    }
    render() {
        return (
            <div className={styles.title}>
                Home
                <Link to={`/login`}>go to login</Link>
                <div onClick={this.toSolidCarousel} className={styles.cursor}>go to solidCarousel</div>
            </div>
        )
    }
}
