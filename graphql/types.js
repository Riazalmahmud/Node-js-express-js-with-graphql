const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");
const { users, posts } = require("../data-user");

const GenderEnumType = new GraphQLEnumType({
  name: "GenderEnumType",
  description: "gender enum",
  values: {
    male: {
      value: "male",
    },
    female: {
      value: "female",
    },
  },
});

const UsersType = new GraphQLObjectType({
  name: "User",
  description: "User",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    gander: {
      type: GenderEnumType,
    },
    posts: {
      type: new GraphQLList(PostTypes),
      resolve: (user) => {
        console.log(user.posts);
        posts.filter((post) => {
          if (user.posts.includes(post.id)) {
            return true;
          }
          return false;
        });
      },
    },
  }),
});

// userInputType
const userInputType = new GraphQLInputObjectType({
  name: "userInputType",
  description: "user input type",
  fields: () => ({
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gander: {
      type: new GraphQLNonNull(GenderEnumType),
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLString,
    },
  }),
});
// updateInputType
const updateInputType = new GraphQLInputObjectType({
  name: "updateInputType",
  description: "user input type",
  fields: () => ({
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    gander: {
      type: GenderEnumType,
    },
    phone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  }),
});
const PostTypes = new GraphQLObjectType({
  name: "post",
  description: "post",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    user: {
      type: UsersType,
      resolve(post, args) {
        return users.find((user) => user.id == post.user);
      },
    },
  }),
});
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    users: {
      type: new GraphQLList(new GraphQLNonNull(UsersType)),
      resolve() {
        return users;
      },
    },
    user: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_, { id }) {
        return (user = users.find((user) => user.id == id));
      },
    },
    posts: {
      type: new GraphQLList(PostTypes),
      resolve() {
        return posts;
      },
    },
    post: {
      type: PostTypes,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_, { id }) {
        return (post = posts.find((post) => post.id == id));
      },
    },
  }),
});

// RootMutationType

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation Object type",
  fields: () => ({
    addUser: {
      type: UsersType,
      args: {
        input: {
          type: userInputType,
        },
      },
      resolve(_, { input: { firstName, lastName, gander, phone, email } }) {
        const user = {
          id: users.length + 1,
          firstName,
          lastName,
          gander,
          phone,
          email,
        };
        users.push(user);
        return user;
      },
    },
    updateUser: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID,
        },
        input: {
          type: updateInputType,
        },
      },
      resolve(_, { id, input: { firstName, lastName, gander, phone, email } }) {
        let updateUser = null;
        users.forEach((user) => {
          if (user.id == id) {
            if (firstName) {
              user.firstName = firstName;
            }
            if (lastName) {
              user.lastName = lastName;
            }
            if (gander) {
              user.gander = gander;
            }
            if (phone) {
              user.phone = phone;
            }
            if (email) {
              user.email = email;
            }
            updateUser = user;
          }
        });
        return updateUser;
      },
    },
    deleteUser: {
        type: GraphQLNonNull(GraphQLBoolean),
        args: {
          id: {
            type: GraphQLID,
          },
        },
        resolve(_, {id}) {
          const index = users.findIndex(user=> user.id== id)
          if(index >= 0){
              users.splice(index,1)
              return true
          }
          else{
            return false
          }
      },
    }
  }),
});

module.exports = {
  RootQueryType,
  UsersType,
  RootMutationType,
};
