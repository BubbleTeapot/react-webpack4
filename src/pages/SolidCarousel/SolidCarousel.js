import React, { Component } from 'react';
import { SolidCarouselAction } from '@/actions';

export default class SolidCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { imgList: null }
    }
    componentDidMount() {
        SolidCarouselAction.getImgs();
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
