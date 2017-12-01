$(document).ready(() => {
  const socket = io.connect();
  const currentUserId = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)currentUser\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

  for (let link of $('.like-link')) {
    let likeIds = { likerId: currentUserId, likedId: parseInt(link.id) };
    socket.emit('findLike', likeIds);
  }

  socket.on('alreadyLiked', selector => {
    $(`${ selector }`).html('&#10003 Liked');
  });

  socket.on('notLiked', selector => {
    $(`${ selector }`).text('Like?');
  });

  socket.on('ownedProfile', selector => {
    $(`${ selector }`).text('(You)');
  });

  $('.like-link').click(e => {
    e.preventDefault();
    let likeIds = { likerId: currentUserId, likedId: parseInt(e.target.id) };

    if (e.target.text == 'Like?') {
      socket.emit('createLike', likeIds);
    } else if (e.target.text !== '(You)') {
      socket.emit('removeLike', likeIds);
    }
  });

  socket.on('likeSuccess', selector => {
    $(`${ selector }`).html('&#10003 Liked');
  });

  socket.on('likeRemoved', selector => {
    $(`${ selector }`).text('Like?');
  });
});
