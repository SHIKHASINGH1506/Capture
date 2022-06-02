export const searchUsers = (users, searchKey) => {
  if (searchKey === ''){  
    return [];
  }

  return users.filter(({ firstName, lastName }) =>
    `${firstName}${lastName}`.toLowerCase().includes(searchKey.toLowerCase())
  )
}