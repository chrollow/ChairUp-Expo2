exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updateData = {
      name,
      email,
      phone
    };

    // Only update the profile image if a new one was uploaded
    if (req.file) {
      updateData.profile_image = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profile_image,
      isAdmin: user.is_admin
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this method to your user controller
exports.subscribeToPromotions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Update user preferences to receive promotion notifications
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { 'preferences.receivePromotions': true } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.status(200).send({ 
      message: 'Successfully subscribed to promotion notifications',
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};