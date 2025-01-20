const { query } = require("express");
const Post = require("../models/post.model");
const errorHandler = require("../utils/error")

const create = async (req, res, next) => {
        if(!req.user.isAdmin){
            return next(errorHandler(403,"You are not allowed to create a post."))
        }
        console.log(req.body);
        
        if(!req.body.title || !req.body.content){
            return next(errorHandler(400,"Please provide all required fields."))
        }

        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');

        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user._id
        })
        
        try {

            const savedPost = await newPost.save()
            res.status(201).json(savedPost)            
        } catch (error) {
            next(error)
        }


}

const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.oeder === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {category: req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {title: {$regex: req.query.searchTerm, $option: '1'}},
                    {content: {$regex: req.query.searchTerm, $option: '1'}}
                ]
            })
        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit)

        const totalPosts = await Post.countDocuments()

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1, 
            now.getDate()
        )
        const lastMonthPosts = await Post.countDocuments({
            createdAt: {$gte : oneMonthAgo},
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    } catch (error) {
        next(error)
    }
}

const deletepost = async (req, res, next) => {

    if(!req.user.isAdmin || req.user._id !== req.params.userId){
        return next(errorHandler(403, "You are not allowed to delete this post."))
    }

    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post has been deleted.")

    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    getposts,
    deletepost,
}