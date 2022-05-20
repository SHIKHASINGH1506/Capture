import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adasrh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarsh123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Aspiring full satck developer. Learning web development at neog camp.",
    link: "https://adarshbalika.netlify.app/",
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653030110/khdifnv2kbowfnktc6tn.webp',
    country: 'India'
  },
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653024939/pizliy4iltckyeg3x472.jpg',
    country: 'India'
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653022965/auuaadzrkqktrtz1ynbe.webp',
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653024027/lsmhex707jyvxhtzttjt.jpg',
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653024226/qnp3ymjww2tde0j5pvyd.jpg',
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653024333/qges2fzogogtsst31k7r.jpg',
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
    profileImage: 'http://res.cloudinary.com/ddbguqhts/image/upload/v1653024588/nl1ahipwwohxvoegi3b5.jpg',
    country: 'India'
  }
  
];
