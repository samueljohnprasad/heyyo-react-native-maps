import io from "socket.io-client";
import { getBaseUrl } from "../../helpers";
export const socket = io(getBaseUrl());
