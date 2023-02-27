type PermissionToken = {
  [key: string]: boolean;
};

export const verifyPermission = (
  permissionToken: string,
  permission: string
) => {
  if (!permissionToken || !permission) return false;
  const decodedToken = window.atob(permissionToken.split(".")[1] as string);
  const parsedToken = JSON.parse(decodedToken) as PermissionToken;
  return parsedToken[permission] as boolean;
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
