import { h } from 'preact';
import ChartPropInput from './ChartPropInput';

class ChartTitle extends ChartPropInput {
    state = {
        title: 'Title',
        inputId: 'chart-title',
    };
}

export default ChartTitle;
