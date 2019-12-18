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
    const appEl = document.getElementById('app');
    appEl.innerHTML = '';
    render(<App title='Preact boilerplate' />, appEl);
});
