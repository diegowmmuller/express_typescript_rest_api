import type { User } from "../types/user.type.js";
import type { responseRepository } from "../types/responseRepository.type.js";
import { getId, incrementId } from "../functions/idUpdater.js";
const users: Array<User> = [];

export const userRepository = {
  async getUsers(): Promise<responseRepository<User[]>> {
    return { status: "success", message: "user found", data: users };
  },
  async findById(id: string): Promise<responseRepository<User>> {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return { status: "error", message: "user not found" };
    }
    return { status: "success", message: "user found", data: user };
  },
  async insertUser(user: User): Promise<responseRepository> {
    const response = users.find((u) => u.email === user.email);
    if (response) {
      return { status: "existing_user", message: "user already exists" };
    }
    const newUser: User = {
      ...user,
      id: getId().toString(),
    };
    incrementId();
    users.push(newUser);
    return { status: "success", message: "user inserted" };
  },
  async updateUser(id: string, user: User): Promise<responseRepository> {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return { status: "error", message: "user not found" };
    }
    users[index] = {
      ...user,
      id,
    };
    return { status: "success", message: "user updated" };
  },
  async deleteUser(id: string): Promise<responseRepository> {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return { status: "error", message: "user not found" };
    }
    users.splice(index, 1);
    return { status: "success", message: "user deleted" };
  },
};
