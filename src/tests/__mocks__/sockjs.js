const sockjsClient = jest.genMockFromModule("sockjs-client");

function _SockJS(address) {
    return sockjsClient.fetch('http://localhost' + address);
}

sockjsClient.SockJS = _SockJS;

module.exports = sockjsClient;