const Category = require("../../models/user/Category.model");
// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

       
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        
        const category = new Category({ name, description });
        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category
        });
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
