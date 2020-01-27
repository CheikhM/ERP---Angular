export class User {
  id: number;
  name: string;
  email: string;
  roles: string [];
  username: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.roles = (data.role) ? data.role.split(',') : [];
    this.username = data.username;
    this.createdAt = data.created_at;
  }

  static arrayCast(data: any): User [] {
    const users: User [] = [];
    data.data.forEach(userItem => {
      const user = new User(userItem);
      users.push(user);
    });
    return users;
  }

  static getEmptyUser(): User {
    return {
      id: null,
      name: null,
      createdAt: null,
      username: null,
      email: null,
      roles: []
    };
  }

  static getEmptyRoles() {
    return {
      CEO: null,
      SM: null,
      PM: null,
      AC: null,
      SA: null
    };
  }
}
