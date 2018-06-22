var PubSub = require('../pubsubLib');
module.exports = function (RED) {
    function sub(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        let topic = config.topic || msg.topic;
        PubSub.subscribe(topic, (message, data) => {
            let msg = {
                topic:message,
                payload:data
            };
            try{
                msg.payload = JSON.parse(msg.payload);
            }catch(e){
                node.warn("Formating to JSON format failed.");
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType('sub', sub);
}