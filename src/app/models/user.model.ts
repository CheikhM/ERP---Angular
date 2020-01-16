export class User {
  id: number;
  fullName: string;
  role: string;

  constructor(data: any) {
    this.id = data.id;
    this.fullName = data.full_name;
    this.role = data.role;
  }

  static arrayCast(data: any): User [] {
    const users: User [] = [];
    data.data.forEach(userItem => {
      const note = new User(userItem);
      users.push(note);
    });
    return users;
  }

  static getEmptyUser(): User {
    return {
      id: null,
      fullName: null,
      role: null,
    };
  }
}
