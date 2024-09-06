export interface newUser {
    fullName: string,
    ci: string,
    username: string,
    email: string,
    password: string,
    repeat_password: string,
    career: string,
    phoneNumber: string,
    profilePhoto?:string
}

export interface existingUser {
    userInfo: string;
    password: string;
    email?: string;
}


export interface userProfile {
    name: string;
    lastname: string;
    username: string;
    email?: string;
    profilePicture: string | undefined;
    _id: string;
    bio?: string;
    followers?: any;
    following?: number;
    isFollowing?: boolean;
    createdAt?: any;
}