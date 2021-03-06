import Kuzzle from 'kuzzle-sdk'
import Config from './kuzzle-config'
import notification from './notification';

var optConnect = {
    defaultIndex: Config.defaultIndex,
    connect: 'auto',
    autoReconnect: true,
    ioPort: 7512,
    wsPort: 7513,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
};

var kuzzle = new Kuzzle(Config.kuzzleUrl, optConnect, function (err, res) {
        if(err) {
            notification.init({
                type: 'error',
                message: 'Can\'t connect to Kuzzle'
            });
        }
    }
);
export default kuzzle