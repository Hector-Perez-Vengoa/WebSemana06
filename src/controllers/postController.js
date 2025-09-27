import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.params;
            const post = await postService.createPost(userId, req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const [posts, users] = await Promise.all([
                postService.getPosts(),
                userRepository.findAll()
            ]);
            res.render("posts", { posts, users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { postId } = req.params;
            const updated = await postService.updatePost(postId, req.body);
            if (!updated) return res.status(404).json({ error: "Post no encontrado" });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { postId } = req.params;
            const deleted = await postService.deletePost(postId);
            if (!deleted) return res.status(404).json({ error: "Post no encontrado" });
            res.json({ message: "Post eliminado" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PostController();
