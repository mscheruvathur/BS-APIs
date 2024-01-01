import HttpStatusCode from "../constants/status.js";
import { APIError } from "../exceptions.js";
import { UNKNOWN_ERROR } from "../constants/operationalErrors.js";

const sendResponse = (res, type, options = { status, message, data }) => {
    let { message, status, data } = options;
    if (!status) {
      if (type === "success") status = HttpStatusCode.OK;
      else status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
  
    const response = {
      status: status,
      message: {
        message: message,
      },
    };
  
    if (data) response.message.data = data;
  
    return res.status(status).json(response).end();
  };
  
  const throwErrorResponse = (res, e) => {
    if (e instanceof APIError) {
      const errorData = {
        error: {
          operationErrorCode: e.operationErrorCode ?? UNKNOWN_ERROR,
        },
      };
  
      return sendResponse(res, "error", {
        message: e.message,
        status: e.statusCode,
        data: errorData,
      });
    }
  };
  
  
  export {sendResponse, throwErrorResponse} 