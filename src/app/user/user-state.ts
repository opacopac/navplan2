import {User} from './model/user';


export interface UserState {
    currentUser: User;
    registerEmailSentTo: string;
    lostPwEmailSentTo: string;
}
