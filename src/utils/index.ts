export const verifyPermission = (permissions: string[], permission: string) => {
  return permissions.includes(permission) ? true : false;
};
