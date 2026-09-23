import type { Request, Response } from "express";
import { userService } from "../service/user.service.js";
import { httpStatus } from "../consts/httpStatus.js";

export const userController = {
  async getUsers(req: Request, res: Response): Promise<Response> {
    const { status, message, data } = await userService.getUsers();
    if (status === "error") {
      return res.status(httpStatus.NOT_FOUND).json({
        status: status,
        message: message,
        data: data,
      });
    }
    return res.status(httpStatus.OK).json({
      status: status,
      message: message,
      data: data,
    });
  },
  async getUserById(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const id = req.params.id;
    const { status, message, data } = await userService.findUserById(id);
    if (status === "error") {
      return res.status(httpStatus.NOT_FOUND).json({
        status: status,
        message: message,
        data: data,
      });
    }
    return res.status(httpStatus.OK).json({
      status: status,
      message: message,
      data: data,
    });
  },
  async insertUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    console.log(req.body);
    const { status, message } = await userService.insertUser({ name, email, password });
    if (status === "existing_user") {
      return res.status(httpStatus.CONFLICT).json({
        status,
        message,
      });
    }

    if (status === "error") {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status,
        message,
      });
    }

    return res.status(httpStatus.CREATED).json({
      status,
      message,
    });
  },
  async updateUser(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const id = req.params.id;
    const user = req.body;

    const { status, message } = await userService.updateUser(id, user);

    if (status === "error") {
      return res.status(httpStatus.NOT_FOUND).json({
        status,
        message,
      });
    }

    return res.status(httpStatus.OK).json({
      status,
      message,
    });
  },
  async deleteUser(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const id = req.params.id;
    const { status, message } = await userService.deleteUser(id);
    if (status === "error") {
      return res.status(httpStatus.NOT_FOUND).json({ status, message });
    }
    return res.status(httpStatus.NO_CONTENT).send();
  },
};
