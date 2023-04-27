const Post = require('../models/posts');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  
// INDEX
app.get('/', (req, res) => {
  const { user } = req;
  console.log(req.cookies);
  Post.find({}).lean().populate('author')
    .then((posts) => res.render('posts-index', { posts, user }))
    .catch((err) => {
      console.log(err.message);
    });
});

app.get('/posts/new', (req, res) => {
    res.render('posts-new');
})

// CREATE
app.post('/posts/new', (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    const post = new Post(req.body);
    post.author = userId;

    post
      .save()
      .then(() => User.findById(userId))
      .then((user) => {
        user.posts.unshift(post);
        user.save();
        // REDIRECT TO THE NEW POST
        return res.redirect(`/posts/${post._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});

// LOOK UP THE POST
app.get('/posts/:id', async (req, res) => {
  try {
  const currentUser = req.user;
  const post = await Post.
  Post.findById(req.params.id).lean().populate({ path:'comments', populate: { path: 'author' } }).populate('author')
  return res.render('posts-show', { post, currentUser });
  } catch (err) {
      console.log(err.message);
  }
});

// SUBREDDIT
app.get('/n/:subreddit', async (req, res) => {
  try {
  const posts = await Post.find({ subreddit: req.params.subreddit }).lean().populate('author')
  const currentUser = req.user
  return res.render('posts-index', { posts, currentUser })
} catch(err) {
  console.log(err)
}
});

}
