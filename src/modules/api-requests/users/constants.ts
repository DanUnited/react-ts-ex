export enum UserGroupEnum {
  ADMINS = 'admins',
  MANAGERS = 'managers',
  TRADERS = 'traders',
  USERS = 'users',
}

export function getUserGroupName(groupName: keyof typeof UserGroupEnum) {
  switch (groupName) {
    case 'ADMINS':
      return 'Admins';
    case  'MANAGERS':
      return 'Managers';
    case  'TRADERS':
      return 'Traders';
    default:
      return 'Users';
  }
}
