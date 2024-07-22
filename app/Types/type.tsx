// @flow
export type IRootObject = {
  _id: string;
  from: IUser;
  post: IPost;
  to: string;
  type: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IPost = {
  _id: string;
  user: IUser;
  text: string;
  img: null;
  video: string;
  likes: string[];
  comments: ICommentsItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IUser = {
  _id: string;
  username: string;
  age: number;
  country: string;
  city: string;
  Phone: string;
  email: string;
  Password: string;
  role: string;
  followers: string[];
  following: string[];
  ProfileImg: string;
  CoverImg: string;
  bio: string;
  link: string;
  __v: number;
  likedPosts: string[];
  fullname: string;
  createdAt: string;
  updatedAt: string;
};
export type ICommentsItem = {
  text: string;
  user: string;
  _id: string;
};
// ------------------------------------------------------------------------------------------------------
export type FormData = {
  fullname: String;
  username: String;
  Phone: String;
  email: String;
  Password: String;
};
// ------------------------------------------------------------------------------------------------------
export type UserData = {
  error: string;
  _id: string;
  Message: any;
  username: string;
  email: string;
  ProfileImg: string;
};
export type InCoded = {
  img: string;
  text: string;
  video: string;
}; // ------------------------------------------------------------------------------------------------------

export type UserObject_Type = {
  _id: string;
  user: IUsers;
  text: string;
  likes: string[];
  comments: ICommentsItems[];
  img: string;
  video: string;

  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IUsers = {
  _id: string;
  username: string;
  fullname: string;
  age: number;
  country: string;
  city: string;
  Phone: string;
  role: string;
  followers: string[];
  following: string[];
  likedPosts: string[];
  ProfileImg: string;
  CoverImg: string;
  bio: string;
  link: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
export type ICommentsItems = {
  text: string;
  img: string;
  video: string;
  user: IUsers;
  _id: string;
};
export type ISPostProps = {
  post: UserObject_Type;
};

// ------------------------------------------------------------------------------------------------------
export type HandelBtn = {
  title: string;
  containerStyles: string;
  iconRight: any;
  type: any;
  onClick: any;
};
// ------------------------------------------------------------------------------------------------------
export type HandelInput = {
  type: string;
  placeholder: string;
  styles: string;
  label: string;
  labelStyle: string;
  register: any;
  iconRight: any;
  name: string;
  error: any;
};
// ------------------------------------------------------------------------------------------------------
export type FormDataUpdateProfile = {
  fullname: string;
  username: string;
  email: string;
  bio: string;
  link: string;
  newPassword: string;
  currentPassword: string;
  coverImg: string;
  profileImg: string;
};
// ------------------------------------------------------------------------------------------------------

// @flow
export type IRootObjectModelNotification = {
  _id: string
  from: IFromModelNotification
  post: IPostModelNotification
  to: string
  type: string
  read: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
export type IFromModelNotification = {
  _id: string
  fullname: string
  username: string
  Phone: string
  email: string
  Password: string
  role: string
  followers: string[]
  following: string[]
  likedPosts: string[]
  __v: number
  updatedAt: string
  CoverImg: string
  ProfileImg: string
}
export type IPostModelNotification = {
  _id: string
  user: IUser
  text: string
  img: string
  video: null
  likes: string[]
  comments: any[]
  createdAt: string
  updatedAt: string
  __v: number
}
export type IUserModelNotification = {
  _id: string
  username: string
  age: number
  country: string
  city: string
  Phone: string
  email: string
  Password: string
  role: string
  followers: string[]
  following: string[]
  ProfileImg: string
  CoverImg: string
  bio: string
  link: string
  __v: number
  likedPosts: string[]
  fullname: string
  createdAt: string
  updatedAt: string
}
