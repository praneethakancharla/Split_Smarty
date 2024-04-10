const { Op } = require("sequelize");
const {
  SplitGroup: _SplitGroup,
  User,
  GroupExpense,
  Expense,
  Split,
} = require("../models");
const SplitGroup = _SplitGroup;

const { AdminGroup, Member } = require("../models");

async function createSplitGroup(req, res, next) {
  try {
    const { name } = req.body;
    // console.log(name);
    // console.log(description);
    if (!name) {
      return res.status(400).json({ error: "Group name is required." });
    }
    // console.log("reached here");
    const groupId = Math.floor(Math.random() * 1000000);
    const userId = req.params.id;
    // console.log(groupId);
    // console.log(userId);
    const newGroup = await SplitGroup.create({
      group_id: groupId,
      name: name,
    });
    await Member.create({ member_id: userId, group_id: groupId });
    await AdminGroup.create({ admin_id: userId, group_id: groupId });

    res.status(201).json({ message: "Group created successfully." });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal server error." });
    next(error);
  }
}

async function getUserGroups(req, res, next) {
  try {
    const userId = req.params.id;
    const userGroups = await Member.findAll({
      where: {
        member_id: userId,
      },
      include: [
        {
          model: SplitGroup,
          attributes: ["name", "group_id"],
        },
      ],
    });
    const groupNames = userGroups.map((userGroup) => ({
      name: userGroup.SplitGroup.name,
      group_id: userGroup.SplitGroup.group_id,
    }));
    res.json(groupNames);
  } catch (error) {
    console.error("Error retrieving user groups:", error);
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
}

async function getMembers(req, res, next) {
  try {
    const groupId = req.params.id;
    const groupMembers = await Member.findAll({
      where: {
        group_id: groupId,
      },
      include: [
        {
          model: User,
          attributes: ["name", "user_id"],
        },
      ],
    });
    const memberNames = groupMembers.map((groupMember) => groupMember.User);
    res.json(memberNames);
  } catch (error) {
    console.error("Error retrieving user groups:", error);
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
}

async function getGroupById(req, res, next) {
  try {
    const groupId = req.params.id;
    const group = await SplitGroup.findOne({ where: { group_id: groupId } });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ group_describe: group.group_describe });
  } catch (error) {
    next(error);
  }
}

async function addNewMember(req, res) {
  try {
    const { id: groupId } = req.params;

    const { email, addingMember } = req.body;

    const user = await User.findOne({ where: { email: email } });
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const adminCheck = await AdminGroup.findOne({
      where: { group_id: groupId },
    });
    const admin = adminCheck.admin_id;
    console.log(addingMember);
    console.log(admin);
    if (admin != addingMember) {
      return res.status(401).json({ error: "Only Admins can add members" });
    }
    const isMember = await Member.findOne({
      where: { member_id: user.user_id, group_id: groupId },
    });
    if (isMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of this group" });
    }

    await Member.create({ member_id: user.user_id, group_id: groupId });

    res.status(200).json({ message: "User added to the group successfully" });
  } catch (error) {
    console.error("Error adding member to split group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function leaveGroup(req, res, next) {
  try {
    const { group_id: groupId, user_id: userId } = req.params;
    const isMember = await Member.findOne({
      where: { member_id: userId, group_id: groupId },
    });
    const isAdmin = await AdminGroup.findOne({
      where: { admin_id: userId, group_id: groupId },
    });
    if (isAdmin)
      AdminGroup.destroy({ where: { admin_id: userId, group_id: groupId } });

    if (!isMember) {
      return res
        .status(401)
        .json({ error: "User is not a member of this group" });
    }
    await Member.destroy({ where: { member_id: userId, group_id: groupId } });

    res.status(200).json({ message: "User has left the group" });
  } catch (error) {
    console.error("Error leaving group:", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
}

async function deleteGroup(req, res, next) {
  try {
    const { group_id: groupId, user_id: userId } = req.params;

    const check = await AdminGroup.findOne({
      where: { admin_id: userId, group_id: groupId },
    });
    if (!check) {
      res.status(201).json({ error: "You are not the Admin" });
    }
    const groupExpenses = await GroupExpense.findAll({
      where: { group_id: groupId },
    });

    const expenseIds = groupExpenses.map((expense) => expense.expense_id);
    for (const expense in expenseIds) {
      await Expense.destroy({ where: { expense_id: expense } });
      await Split.destroy({ where: { expense_id: expense } });
    }

    await GroupExpense.destroy({ where: { group_id: groupId } });
    await AdminGroup.destroy({ where: { group_id: groupId } });
    await Member.destroy({ where: { group_id: groupId } });
    await SplitGroup.destroy({ where: { group_id: groupId } });

    res
      .status(200)
      .json({ message: "SplitGroup and related records deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Error deleting SplitGroup" });
    throw new Error("Failed to delete SplitGroup and related records");
  }
}

async function checkAdmin(req, res, next) {
  try {
    const { group_id: groupId, user_id: userId } = req.params;
    const check = await AdminGroup.findOne({
      where: { admin_id: userId, group_id: groupId },
    });
    if (!check) {
      return res.status(404).json({ error: "Cannot find the admin" });
    }
    return res.status(200).json({ message: "He is the admin!" });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function makeAdmin(req, res, next) {
  try {
    const { group_id: groupId, user_id: userId } = req.params;

    const isMember = await Member.findOne({
      where: { member_id: userId, group_id: groupId },
    });
    if (!isMember) {
      return res
        .status(404)
        .json({ error: "User is not a member of this group" });
    }

    await AdminGroup.create({ admin_id: userId, group_id: groupId });

    res.status(200).json({ message: "User is now an admin of the group" });
  } catch (error) {
    console.error("Error making member admin:", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
}

async function removeMember(req, res, next) {
  try {
    const {
      group_id: groupId,
      user_id: userId,
      remove_id: removeId,
    } = req.params;
    const isAdmin = await AdminGroup.findOne({
      where: { admin_id: userId, group_id: groupId },
    });
    if (!isAdmin) {
      return res.status(401).json({ error: "Only admins can remove members" });
    }

    await Member.destroy({ where: { member_id: removeId, group_id: groupId } });

    res.status(200).json({ message: "Member removed from the group" });
  } catch (error) {
    console.error("Error removing member from group:", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
}

module.exports = {
  createSplitGroup,
  getUserGroups,
  getMembers,
  addNewMember,
  getGroupById,
  deleteGroup,
  checkAdmin,
  makeAdmin,
  leaveGroup,
  removeMember,
};

// !HALT: makeAdmin, checkAdmin
