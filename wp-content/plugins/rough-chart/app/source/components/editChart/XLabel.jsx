import { h } from 'preact';
import ChartPropInput from './ChartPropInput';

class XLabel extends ChartPropInput {
    state = {
        title: 'X Label',
        inputId: 'chart-title',
    };
}

export default XLabel;
