const names = ['James', 'Robert', 'Michael', 'William', 'David', 'Thomas', 'Charles', 'Matthew'];

export const getRandomName = () => names[Math.floor(Math.random() * names.length)];
