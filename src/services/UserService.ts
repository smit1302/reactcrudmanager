import axios from 'axios'
export class UserService{
    static getUserById(id: number) {
      throw new Error("Method not implemented.")
    }
    private static URL:string='https://jsonplaceholder.typicode.com/'
    public static getAllUsers(){
        let UserURL:string = `${this.URL}/users`
        return axios.get(UserURL)
    }
}