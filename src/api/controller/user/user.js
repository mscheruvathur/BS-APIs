import { sendResponse, throwErrorResponse } from "../../../utils/response.js";
import HttpStatusCode from "../../../constants/status.js";

class UserController {
  static register = async (req, res) => {
    try {
      return sendResponse(res, "success", {
        status: HttpStatusCode.OK,
        message: "SuccessFully registered.",
        data: {},
      });
    } catch (err) {
      return throwErrorResponse(res, err);
    }
  };
}

export default UserController;
