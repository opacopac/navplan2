import {User} from './model/user';


export interface UserState {
    currentUser: User;
    verifyEmailSentTo: string;
}
