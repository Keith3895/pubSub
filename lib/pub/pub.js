var PubSub = require('../pubsubLib');
var utils = require('../utils');
var clear_status = utils.clear_status;
var format_values = utils.format_values;
module.exports = function (RED) {
    function pub(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function (msg) {
            clear_status(node)
            format_values(msg);
            format_values(config);
            let topic = config.topic||msg.topic;
            let message = config.message|| msg.message || msg.payload;
            if(typeof message == "object")
                message = JSON.stringify(message);
                // publish the message on to the conceptual queue
            PubSub.publish(topic, message);
        });
    }
    RED.nodes.registerType('pub', pub);
}
