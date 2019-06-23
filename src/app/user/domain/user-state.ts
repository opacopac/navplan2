import {User} from './user';


export interface UserState {
    currentUser: User;
    registerEmailSentTo: string;
    lostPwEmailSentTo: string;
}
