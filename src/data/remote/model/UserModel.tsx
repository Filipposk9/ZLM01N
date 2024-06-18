export interface UserModel {
  USERNAME: string;
  BUILDINGCODE: string;
  FIRSTNAME: string;
  LASTNAME: string;
}

export interface UserResponse {
  data: UserModel;
}
