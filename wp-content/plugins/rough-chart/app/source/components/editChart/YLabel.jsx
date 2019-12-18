import { h } from 'preact';
import ChartPropInput from './ChartPropInput';

class YLabel extends ChartPropInput {
    state = {
        title: 'Y Label',
        inputId: 'chart-title',
    };
}

export default YLabel;
