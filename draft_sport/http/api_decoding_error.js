/* Draft Sport JS - API Response Decoding Error */
const API_DECODING_ERROR_MESSAGE = "Unable to decode API response, raw data: "

class ApiResponseDecodingError extends ApiError {

    constructor(rawData, error) {
        console.log(API_DECODING_ERROR_MESSAGE, rawData, error);
        super(null, null);
    }

}
