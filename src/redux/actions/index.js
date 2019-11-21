export const USER_INFO = 'USER_INFO';

export const userInfo = user => {
    return {
        type: USER_INFO,
        user
    }
}