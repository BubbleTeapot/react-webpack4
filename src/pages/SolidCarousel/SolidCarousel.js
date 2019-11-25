import React, { Component } from 'react';
import { SolidCarouselAction } from '@/actions';
import "styles/SolidCarousel.less";

export default class SolidCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { imgList: null }
        this._renderImgItem = this._renderImgItem.bind(this);
    }
    componentDidMount() {
        SolidCarouselAction.getImgs().then(res => {
            this.setState({ imgList:res });
        });
    }
    _renderImgItem() {
        return this.state.imgList && this.state.imgList.map((item, index) => {
            return <li className="imgItem" key={"imgIndex"+index}><img width="192" height="108" src={item.url} alt="" /></li>
        })
    }
    render() {
        return (
            <div className="container">
                <div className="PositionBox">
                    <ul className="imgWrapper">
                        {this._renderImgItem()}
                    </ul>
                </div>
            </div>
        )
    }
}
