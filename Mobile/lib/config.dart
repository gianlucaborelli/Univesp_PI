import "package:flutter/material.dart";
import "package:get/get.dart";
import "package:sisgem_app/controllers/theme_controller.dart";
import "package:sisgem_app/controllers/user_detail_controller.dart";
import "package:sisgem_app/controllers/users_controller.dart";
import "package:sisgem_app/service/auth_service.dart";
import "package:sisgem_app/service/user_service.dart";
import "package:sisgem_app/service/user_settings/user_settings_service.dart";

initConfigurations() async {
  WidgetsFlutterBinding.ensureInitialized();

  Get.lazyPut<AuthService>(() => AuthService());
  Get.lazyPut<ThemeController>(() => ThemeController());
  Get.lazyPut<UserSettingsService>(() => UserSettingsService());
  Get.lazyPut<UserService>(() => UserService());
  Get.lazyPut<UsersController>(() => UsersController());
  Get.lazyPut<UserDetailController>(() => UserDetailController());
}
