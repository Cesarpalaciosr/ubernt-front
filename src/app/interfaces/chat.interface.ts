export interface UserChat {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    profilePicture: string;
}

export interface ChatInterface {
    idRoom: string;
    messages: string[];
    participants: string[];
    type: string;
}

export interface MessageInterface {
    idRoom: string;
    idSender: string;
    idSentTo?: string;
    message: string;
    sendTo?: string;
    sender: string;
}