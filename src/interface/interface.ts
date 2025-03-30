export interface IUserInfo {
  email: string,
  password: string,
  uid: string,
  username: string,
}

export interface IUploadResume {
  fileKey: string;
  role: string;
  level: string;
  university: string;
  passCompany: string[];
}
