const models = require('../models');
const { User, Like } = models;

var Socket = {};

Socket.setup = (io) => {
  io.on('connection', client => {
    console.log('socket connected');

    client.on('findLike', likeIds => {
      if (likeIds.likerId == likeIds.likedId) {
        client.emit('ownedProfile', `.like-link#${ likeIds.likedId }`);
        return;
      }

      User.findOne({
        where: {
          id: likeIds.likerId
        },
        include: [
          { model: User, as: 'likes' }
        ]
      })
      .then(user => {
        if (user.likes.find(l => l.Like.LikedId == likeIds.likedId)) {
          client.emit('alreadyLiked', `.like-link#${ likeIds.likedId }`);
        } else {
          client.emit('notLiked', `.like-link#${ likeIds.likedId }`);
        }
      });
    });

    client.on('createLike', likeIds => {
      Like.create({ LikerId: likeIds.likerId, LikedId: likeIds.likedId })
        .then(like => {
          client.emit('likeSuccess', `.like-link#${ likeIds.likedId }`);
        });
    });

    client.on('removeLike', likeIds => {
      Like.destroy({ where: { LikerId: likeIds.likerId, LikedId: likeIds.likedId } })
        .then(() => {
          client.emit('likeRemoved', `.like-link#${ likeIds.likedId }`);
        });
    });
  });
};

module.exports = Socket;
