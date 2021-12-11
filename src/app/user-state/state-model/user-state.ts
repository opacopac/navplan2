import {User} from '../../user/domain-model/user';


export interface UserState {
    currentUser: User;
    registerEmailSentTo: string;
    lostPwEmailSentTo: string;
}
