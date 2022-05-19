import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Joining neogCamp is my best decision so far. Looking back I can only be grateful.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shikhasingh",
    fullname: 'Shikha Singh',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "johndoe",
        text: "Even I feel the same. The learning curve has grown exponential here for me.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },
      {
        _id: uuid(),
        username: "elonmusk",
        text: "You got a long way to go.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },

    ]
  },
  {
    _id: uuid(),
    content:
      "Explored memoization today will try to implement it in my current project",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shikhasingh",
    fullname: 'Shikha Singh',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "johndoe",
        text: "It's awesome",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      }
    ]
  },
  {
    _id: uuid(),
    content:
      "Thoughts! Never thought learning web development can be so much fun. So much more to learn and explore ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    fullname: 'Adarsh Balika',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "shikhasingh",
        text: "Wow! Keep it up.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },
      {
        _id: uuid(),
        username: "elonmusk",
        text: "You got a long way to go.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },

    ]
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    fullname: 'John Doe',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "sundar.gg",
        text: "Let's meet up soon",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },
    ]
  },
  {
    _id: uuid(),
    content:
      "Twitter claims that >95% of daily active users are real, unique humans. Does anyone have that experience?",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    fullname: 'Elon Musk',
    username: "elonmusk",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "jeffB",
        text: "I can confirm 69% of twitter users are real humans",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },
    ]
  },
  {
    _id: uuid(),
    content:
      "Always fun to go super deep on our products on The Vergecast. Chatted with @reckless and @pierce about AI advancements, our growing Pixel portfolio, AR + more!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sundar.gg",
    fullname: 'Sundar Pichai',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "tanaypratap",
        text: "Wao waiting for some new products!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        }
      },
    ]
  },
];
