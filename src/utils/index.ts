/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import jwt from "jsonwebtoken";

type PermissionToken = {
  [key: string]: boolean;
};

export const verifyPermission = (
  permissionToken: string,
  permission: string
) => {
  try {
    if (!permissionToken || !permission) return false;
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    const decodedToken = jwt.verify(permissionToken, secret) as PermissionToken;
    return decodedToken[permission] as boolean;
  } catch (e) {
    // console.log(e);
  }
};

export const getGreetings = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
