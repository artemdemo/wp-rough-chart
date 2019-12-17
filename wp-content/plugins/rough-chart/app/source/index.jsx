import { render, h } from 'preact';
import App from './views/App';

const docReady = (cb) => {
    // see if DOM is already available
    if (['complete', 'interactive'].includes(document.readyState)) {
        setTimeout(cb);
    } else {
        document.addEventListener('DOMContentLoaded', cb);
    }
};

docReady(() => {
    render(<App title='Preact boilerplate' />, document.getElementById('app'));
});
