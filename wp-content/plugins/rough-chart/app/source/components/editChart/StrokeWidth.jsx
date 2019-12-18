import { h } from 'preact';
import ChartPropInput from './ChartPropInput';

class StrokeWidth extends ChartPropInput {
    state = {
        title: 'Stroke Width',
        inputId: 'chart-stroke-width',
    };
}

export default StrokeWidth;
