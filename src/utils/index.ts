import { type Permissions } from "~/store/slices/createAuthSlice";

export const verifyPermission = (
  permissions: Permissions,
  permission: string
) => {
  return permissions[permission] as boolean;
};
