import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Shikha",
    lastName: "Singh",
    username: "shikhasingh",
    password: "shikhasingh123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Founder, CEO and creator of @Appwrite , the 100% open source alternative for Firebase",
    link: "https://shikha.netlify.app/",
    country: 'India',
    followers: [],
    following: [],
  },
  {
    _id: uuid(),
    firstName: "Elon",
    lastName: "Musk",
    username: "elonmusk",
    password: "elon123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Founder, CEO and creator of @Tesla, @Boring Company etc",
    link: "https://www.tesla.com/",
    country: 'LA'
  },
  {
    _id: uuid(),
    firstName: "Sundar",
    lastName: "Pichai",
    username: "sundar.gg",
    password: "sundar123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "CEO of @Google",
    link: "https://google.com/",
    country: 'Mountain View, CA'
  },
  {
    _id: uuid(),
    firstName: "Jeff",
    lastName: "Bezos",
    username: "jeffB",
    password: "jeff123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Amazon. Blue Origin. Washington Post. Bezos Earth Fund. Bezos Academy.",
    link: "hoo.be/jeffbezos",
    country: ''
  },
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "tanaypratap",
    password: "tanay123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Founder @invactHQ | x @Microsoft | Fixing education | Mentored 100+ students to first tech job | Tweets: Tech, Education, Career, Metaverse and Startups.",
    link: "https://letters.tanaypratap.com/",
    country: 'India'
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "john123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "bot user",
    link: "",
    country: 'India'
  }
  
];
