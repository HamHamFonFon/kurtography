import Kuzzle from 'kuzzle-sdk'
import Config from './config'
import notification from './notification';

var optConnect = {
    defaultIndex: Config.defaultIndex,
    connect: 'auto',
    autoReconnect: true,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
};

var kuzzle = new Kuzzle(Config.kuzzleUrl, optConnect, function (err, res) {
        if(err) {
            notification.init({
                type: 'error',
                class: 'mdl-color--red-400',
                message: 'Can\'t connect to Kuzzle',
                icon: 'error'
            });
        }
    }
);
export default kuzzle