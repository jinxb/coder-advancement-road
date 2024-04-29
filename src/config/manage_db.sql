/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : manage_db

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 29/04/2024 16:34:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parentId` int NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `layout` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keepAlive` tinyint NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `show` tinyint NOT NULL DEFAULT 1 COMMENT '是否展示在页面菜单',
  `enable` tinyint NOT NULL DEFAULT 1,
  `order` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_30e166e8c6359970755c5727a2`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (1, '资源管理', 'Resource_Mgt', 'MENU', 2, '/pms/resource', NULL, 'i-fe:list', '/src/views/pms/resource/index.vue', NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` VALUES (2, '系统管理', 'SysMgt', 'MENU', NULL, NULL, NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` VALUES (3, '角色管理', 'RoleMgt', 'MENU', 2, '/pms/role', NULL, 'i-fe:user-check', '/src/views/pms/role/index.vue', NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` VALUES (4, '用户管理', 'UserMgt', 'MENU', 2, '/pms/user', NULL, 'i-fe:user', '/src/views/pms/user/index.vue', NULL, 1, NULL, NULL, 1, 1, 3);
INSERT INTO `permission` VALUES (5, '分配用户', 'RoleUser', 'MENU', 3, '/pms/role/user/:roleId', NULL, 'i-fe:user-plus', '/src/views/pms/role/role-user.vue', NULL, NULL, NULL, NULL, 0, 1, 1);
INSERT INTO `permission` VALUES (6, '业务示例', 'Demo', 'MENU', NULL, NULL, NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` VALUES (7, '图片上传', 'ImgUpload', 'MENU', 6, '/demo/upload', NULL, 'i-fe:image', '/src/views/demo/upload/index.vue', NULL, 1, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` VALUES (8, '个人资料', 'UserProfile', 'MENU', NULL, '/profile', NULL, 'i-fe:user', '/src/views/profile/index.vue', NULL, NULL, NULL, NULL, 0, 1, 99);
INSERT INTO `permission` VALUES (9, '基础功能', 'Base', 'MENU', NULL, '/base', NULL, 'i-fe:grid', NULL, NULL, NULL, NULL, NULL, 1, 1, 0);
INSERT INTO `permission` VALUES (10, '基础组件', 'BaseComponents', 'MENU', 9, '/base/components', NULL, 'i-me:awesome', '/src/views/base/index.vue', NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` VALUES (11, 'Unocss', 'Unocss', 'MENU', 9, '/base/unocss', NULL, 'i-me:awesome', '/src/views/base/unocss.vue', NULL, NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` VALUES (12, 'KeepAlive', 'KeepAlive', 'MENU', 9, '/base/keep-alive', NULL, 'i-me:awesome', '/src/views/base/keep-alive.vue', NULL, 1, NULL, NULL, 1, 1, 3);
INSERT INTO `permission` VALUES (13, '创建新用户', 'AddUser', 'BUTTON', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` VALUES (14, '图标 Icon', 'Icon', 'MENU', 9, '/base/icon', NULL, 'i-fe:feather', '/src/views/base/unocss-icon.vue', NULL, NULL, NULL, NULL, 1, 1, 0);
INSERT INTO `permission` VALUES (15, 'MeModal', 'TestModal', 'MENU', 9, '/testModal', NULL, 'i-me:dialog', '/src/views/base/test-modal.vue', NULL, NULL, NULL, NULL, 1, 1, 5);
INSERT INTO `permission` VALUES (16, '测试用例', 'TestCase', 'MENU', 6, '/demo/case', NULL, 'i-fe:box', '/src/views/demo/case/index.vue', 'empty', NULL, NULL, NULL, 1, 1, 3);
INSERT INTO `permission` VALUES (19, '资源管理', 'resourceManage', 'MENU', 6, '/demo/resourceManage', NULL, 'i-fe:package', '/src/views/demo/resourceManage/index.vue', 'empty', NULL, NULL, NULL, 1, 1, 4);
INSERT INTO `permission` VALUES (21, '物料资源', 'materialResource', 'MENU', NULL, '', NULL, 'i-fe:package', '', 'empty', NULL, NULL, NULL, 1, 1, 2);
INSERT INTO `permission` VALUES (22, '组件库', 'componentLib', 'MENU', 21, '/resourceManage/componentsLib', NULL, 'i-fe:cpn', '/src/views/resourceManage/componentLib/index.vue', 'empty', NULL, NULL, NULL, 1, 1, 0);
INSERT INTO `permission` VALUES (23, '脚手架', 'scaffold', 'MENU', 21, '/resourceManage/scaffold', NULL, 'i-fe:tool', '/src/views/resourceManage/scaffold/index.vue', 'empty', NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` VALUES (24, '模板库', 'templateLib', 'MENU', 21, '/resourceManage/templateLib', NULL, 'i-fe:layout', '/src/views/resourceManage/templateLib/index.vue', 'empty', NULL, NULL, NULL, 1, 1, 2);

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `gender` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of profile
-- ----------------------------
INSERT INTO `profile` VALUES (1, 1, NULL, '中国', '13219099888', '123@qq.com', '2');
INSERT INTO `profile` VALUES (2, 5, NULL, '中国', '12393932019', '111@qq.com', '1');
INSERT INTO `profile` VALUES (3, 6, NULL, '中国', '12393932019', '111@qq.com', '1');
INSERT INTO `profile` VALUES (4, 7, NULL, '中国', '12393932519', '111@qq.com', '2');
INSERT INTO `profile` VALUES (6, 9, NULL, '中国', '12393932119', '111@qq.com', '2');
INSERT INTO `profile` VALUES (8, 11, NULL, '中国', '12393932519', '111@qq.com', '2');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enable` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ee999bb389d7ac0fd967172c41`(`code` ASC) USING BTREE,
  UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'SUPER_ADMIN', '超级管理员', 1);
INSERT INTO `role` VALUES (2, 'TEST', '测试人员', 1);
INSERT INTO `role` VALUES (4, 'TEST_TEST', 'test', 1);

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions_permission`;
CREATE TABLE `role_permissions_permission`  (
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  PRIMARY KEY (`roleId`, `permissionId`) USING BTREE,
  INDEX `IDX_b36cb2e04bc353ca4ede00d87b`(`roleId` ASC) USING BTREE,
  INDEX `IDX_bfbc9e263d4cea6d7a8c9eb3ad`(`permissionId` ASC) USING BTREE,
  CONSTRAINT `fk_pr_id` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_rp_id` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
INSERT INTO `role_permissions_permission` VALUES (1, 1);
INSERT INTO `role_permissions_permission` VALUES (1, 2);
INSERT INTO `role_permissions_permission` VALUES (1, 3);
INSERT INTO `role_permissions_permission` VALUES (1, 4);
INSERT INTO `role_permissions_permission` VALUES (1, 5);
INSERT INTO `role_permissions_permission` VALUES (1, 6);
INSERT INTO `role_permissions_permission` VALUES (1, 7);
INSERT INTO `role_permissions_permission` VALUES (1, 8);
INSERT INTO `role_permissions_permission` VALUES (1, 9);
INSERT INTO `role_permissions_permission` VALUES (1, 10);
INSERT INTO `role_permissions_permission` VALUES (1, 11);
INSERT INTO `role_permissions_permission` VALUES (1, 12);
INSERT INTO `role_permissions_permission` VALUES (1, 13);
INSERT INTO `role_permissions_permission` VALUES (1, 14);
INSERT INTO `role_permissions_permission` VALUES (1, 15);
INSERT INTO `role_permissions_permission` VALUES (1, 16);
INSERT INTO `role_permissions_permission` VALUES (1, 19);
INSERT INTO `role_permissions_permission` VALUES (1, 21);
INSERT INTO `role_permissions_permission` VALUES (1, 22);
INSERT INTO `role_permissions_permission` VALUES (1, 23);
INSERT INTO `role_permissions_permission` VALUES (1, 24);
INSERT INTO `role_permissions_permission` VALUES (2, 1);
INSERT INTO `role_permissions_permission` VALUES (4, 1);
INSERT INTO `role_permissions_permission` VALUES (4, 2);
INSERT INTO `role_permissions_permission` VALUES (4, 6);
INSERT INTO `role_permissions_permission` VALUES (4, 7);
INSERT INTO `role_permissions_permission` VALUES (4, 9);
INSERT INTO `role_permissions_permission` VALUES (4, 10);
INSERT INTO `role_permissions_permission` VALUES (4, 11);
INSERT INTO `role_permissions_permission` VALUES (4, 12);
INSERT INTO `role_permissions_permission` VALUES (4, 14);
INSERT INTO `role_permissions_permission` VALUES (4, 15);
INSERT INTO `role_permissions_permission` VALUES (4, 16);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enable` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '刘老板', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 10:51:49', '2024-03-19 15:02:03');
INSERT INTO `user` VALUES (5, '用户1', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 10:58:37', '2024-03-04 10:58:37');
INSERT INTO `user` VALUES (6, '用户2', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 11:00:00', '2024-03-04 11:00:00');
INSERT INTO `user` VALUES (7, '用户3', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 11:00:34', '2024-03-04 11:00:34');
INSERT INTO `user` VALUES (9, '用户5', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 11:02:44', '2024-03-04 11:02:44');
INSERT INTO `user` VALUES (11, 'test01', 'e10adc3949ba59abbe56e057f20f883e', NULL, '2024-03-04 11:46:59', '2024-03-04 11:46:59');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId` ASC) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId` ASC) USING BTREE,
  CONSTRAINT `fk_role_id` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);
INSERT INTO `user_roles_role` VALUES (1, 2);
INSERT INTO `user_roles_role` VALUES (1, 4);
INSERT INTO `user_roles_role` VALUES (5, 2);
INSERT INTO `user_roles_role` VALUES (5, 4);
INSERT INTO `user_roles_role` VALUES (6, 2);
INSERT INTO `user_roles_role` VALUES (6, 4);
INSERT INTO `user_roles_role` VALUES (7, 2);
INSERT INTO `user_roles_role` VALUES (7, 4);
INSERT INTO `user_roles_role` VALUES (9, 2);
INSERT INTO `user_roles_role` VALUES (9, 4);
INSERT INTO `user_roles_role` VALUES (11, 1);
INSERT INTO `user_roles_role` VALUES (11, 4);

SET FOREIGN_KEY_CHECKS = 1;
