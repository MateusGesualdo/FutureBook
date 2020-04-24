import MainDB from './MainDatabase';
import User from '../business/entities/User';

export default class UserDB extends MainDB {

    async signup(user: User) {
        try {
            await this.connection.raw(
                `INSERT INTO future_book_users 
                 VALUES(
                    "${user.getId()}",             
                    "${user.getEmail()}", 
                    "${user.getName()}",
                    "${user.getPassword()}"
                    
                )`
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getUserByEmail(email: string) {
        try {
            const query = await this.connection.raw(
                `SELECT * 
                FROM future_book_users 
                WHERE email = "${email}"`
            )
            
            return query[0][0]

        } catch {
            throw new Error(
                "Usuário não encontrado ou senha incorreta."
            )
        }
    }

    async makeFriendship(userId: string, friendId: string) {
       try{
        await this.connection.raw(
            `INSERT INTO future_book_friends VALUES (
                "${userId}",
                "${friendId}"
            ),(               
                "${friendId}",
                "${userId}"
            )`
        )
       }catch(err){
           throw new Error(err.sqlMessage)
       }
    }

    async undoFriendship(userId: string, friendId: string) {
        await this.connection.raw(
            `DELETE 
            FROM future_book_friends 
            WHERE (user_id = "${userId}" AND friend_id = "${friendId}")
            OR (user_id = "${friendId}" AND friend_id = "${userId}")
            `
        )
    }
}