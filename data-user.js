 const users  = [{
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    age: 30,
    gander: "MALE",
    posts:[1,2]
},
{
  id: "2",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "123-456-7890",
  email: "john.doe@example.com",
  age: 30,
  gander: "MALE",
  posts:[1,2]
},
{
  id: "3",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "123-456-7890",
  email: "john.doe@example.com",
  age: 30,
  gander: "MALE",
  posts:[1,2]
}]


const posts = [
    {
      id: 1,
      title: "GraphQL",
      description: "SaA query language for your APIrkar",
      user: 1,
    },
    {
      id: 2,
      title: "JS",
      description: "SaA query language for your APIrkar",
      user: 1,
    },
    {
      id: 3,
      title: "PHP",
      description: "SaA query language for your APIrkar",
      user: 2,
    },
  ];

module.exports = {users, posts}