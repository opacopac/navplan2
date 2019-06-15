import {User} from './domain/user';


export interface UserState {
    currentUser: User;
    registerEmailSentTo: string;
    lostPwEmailSentTo: string;
}
