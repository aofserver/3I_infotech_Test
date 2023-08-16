class ResponseTemplate {
    constructor(statusCode, devMsg) {
        let response = {};

        response = {
            Code: statusCode,
            DeveloperMessage: devMsg
        };

        return response;
    }
}
module.exports = ResponseTemplate;