import axios from 'axios';
import { Ziggy } from './ziggy';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (document.querySelector('meta[name="csrf-token"]')) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
} else {
    console.warn('CSRF token not found. Please add a meta tag with name="csrf-token" to your layout.');
}

export default axios;
