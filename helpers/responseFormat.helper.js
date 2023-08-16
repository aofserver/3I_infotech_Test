class ResponseFormat {
    constructor() { }

    getGeneralResponse(code, devMsg, data = null) {
        let response = {
            Code: JSON.stringify(code),
            DeveloperMessage: devMsg,
            Data: data
        };
        if(!data && typeof(data)!='boolean'){
            delete response.Data
        }
        return response;
    }

    error40000() {
        return {
            Code: "40000",
            DeveloperMessage: "The client requested missing or invalid format."
        };
    }
    error40010() {
        return {
            Code: "40010",
            DeveloperMessage: "The client requested Bad Request."
        };
    }
    error40101(sec) {
        return {
            Code: "40101",
            DeveloperMessage: `Limit OTP is count down ${sec} sec.`,
            CountDown: sec
        };
    }
    error40103() {
        return {
            Code: "40103",
            DeveloperMessage: "The token is Untrusted or Invalid."
        };
    }
    error40400() {
        return {
            Code: "40400",
            DeveloperMessage: "The requested operation could not be found."
        };
    }
    error50002() {
        return {
            Code: "50002",
            DeveloperMessage: "Unable to connection to the database service."
        };
    }
    error50099() {
        return {
            Code: "50099",
            DeveloperMessage: "Unknow error."
        };
    }
    success20000() {
        return {
            Code: "20000",
            DeveloperMessage: "The requested operation was successfully."
        };
    }
    success20100() {
        return {
            Code: "20100",
            DeveloperMessage: "The requested operation was successfully."
        };
    }
}

module.exports = {
    ResponseFormat
};