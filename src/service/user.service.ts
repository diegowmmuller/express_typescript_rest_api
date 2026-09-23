import { userRepository } from "../repository/user.repository.js";
import type { User } from "../types/user.type.js";
import type { responseService } from "../types/responseService.type.js";

export const userService = {
  async getUsers(): Promise<responseService<User[]>> {
    return await userRepository.getUsers();
  },
  async findUserById(id: string): Promise<responseService<User>> {
    return await userRepository.findById(id);
  },
  async insertUser(user: User): Promise<responseService> {
    return await userRepository.insertUser(user);
  },
  async updateUser(id: string, user: User): Promise<responseService> {
    return await userRepository.updateUser(id, user);
  },
  async deleteUser(id: string): Promise<responseService> {
    return await userRepository.deleteUser(id);
  },
};
