import React from "react";
import {Panel} from 'react-bootstrap';

import '../styles/adsandinfo.css';

export default class AdsAndInfo extends React.Component {
    render() {
        return (
            <div className='adsandinfo-wrapper'>
                <Panel className='adsandinfo-panel'>
                    <Panel.Body className='adsandinfo-panel-body'>
                        Ads and info here.
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}