import "package:flutter/material.dart";
import "package:get/get.dart";
import "package:sisgem_app/controllers/product_controller.dart";
import "package:sisgem_app/controllers/product_detail_controller.dart";
import "package:sisgem_app/controllers/user_detail_controller.dart";
import "package:sisgem_app/controllers/users_controller.dart";
import "package:sisgem_app/service/auth_service.dart";
import "package:sisgem_app/service/product_service.dart";
import "package:sisgem_app/service/user_service.dart";
import "package:sisgem_app/service/user_settings/user_settings_service.dart";

initConfigurations() async {
  WidgetsFlutterBinding.ensureInitialized();

  Get.lazyPut<AuthService>(() => AuthService());
  Get.lazyPut<UserSettingsService>(() => UserSettingsService());
  Get.lazyPut<UserService>(() => UserService());
  Get.lazyPut<UsersController>(() => UsersController());
  Get.lazyPut<UserDetailController>(() => UserDetailController());
  Get.lazyPut<ProductController>(() => ProductController());
  Get.lazyPut<ProductService>(() => ProductService());
  Get.lazyPut<ProductDetailController>(() => ProductDetailController());
}
