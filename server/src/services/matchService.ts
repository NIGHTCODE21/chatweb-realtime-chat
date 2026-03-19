import { User } from "../models/user";
import { generateRoomId } from "../utils/helpers";

let waitingUser: User | null = null;

export const matchUser = (currentUser: User) => {
  if (waitingUser && waitingUser.id !== currentUser.id) {
    const room = generateRoomId(waitingUser.id, currentUser.id);

    const matchedUser = waitingUser;
    waitingUser = null;

    return { room, matchedUser };
  }

  waitingUser = currentUser;
  return null;
};

export const resetWaitingUser = (userId: string) => {
  if (waitingUser?.id === userId) {
    waitingUser = null;
  }
};
