var PubSub = require('../pubsubLib');
var utils = require('../utils');
var clear_status = utils.clear_status;
var remove_slash = utils.remove_slash;
var format_values = utils.format_values;
var showMessage = utils.showMessage;
module.exports = function (RED) {
    function sub(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        let topic = config.topic || msg.topic;
        PubSub.subscribe(topic, (message, data) => {
            let msg = {
                topic:message,
                message:data
            };
            node.send(msg);
        });
    }
    RED.nodes.registerType('sub', sub);
}