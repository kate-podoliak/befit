import React, {Component} from 'react';
import './SliderPhoto.scss';
import {Carousel} from "react-bootstrap";
import runImg from '../../img/gymRun.jpg';
import groupImg from '../../img/group.jpg';
import gymImg from '../../img/gym.jpg';

class SliderPhoto extends Component {
    render() {
        return (
            <Carousel className='carousel__box'>
                <Carousel.Item interval={2000}>
                    <img className='d-block w-100' src={groupImg} alt='Group'/>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img className='d-block w-100' src={runImg} alt='TRX'/>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img className='d-block w-100' src={gymImg} alt='GYM'/>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default SliderPhoto;