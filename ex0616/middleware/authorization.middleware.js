const prisma = require('../utils/prisma/index')

exports.checkPostOwner = async(req, res, next) =>{
  const {postId} = req.params
  const userId = req.user.postId
  
  const post = await prisma.posts.findUnique({
    where:{postId:+postId}
  })

  if(!post){
    return next(new Error("Post를 찾을 수 없습니다"))
  }

  
  if(!post.userId !== userId){
    return next(new Error("Post를 찾을 수 없습니다"))
  }

  res.locals.post = post
  next()
}