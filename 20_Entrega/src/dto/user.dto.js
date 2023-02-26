//Complemento del patron DAO, creo un DTO para mostrar solamente email y password
//Esta clase se instancia junto con la implementacion del patron DAO
class UserDto {
  constructor({ username, email, age }) {
    (this.username = username), (this.email = email), (this.age = age);
  }
}

export const convertToDto = (users) => {
  if (Array.isArray(users)) {
    const newData = users.map((user) => new UserDto(user));
    return newData;
  } else {
    const newData = new UserDto(users);
    return newData;
  }
};
