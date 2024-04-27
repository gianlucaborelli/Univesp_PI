import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/theme_controller.dart';
import '../service/auth_service.dart';

class AuthenticationController extends GetxController {
  final name = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  final confirmPassword = TextEditingController();
  final formKey = GlobalKey<FormState>();

  var isLoading = false.obs;

  login() async {
    isLoading.value = true;
    await AuthService.to.login(email.text, password.text);
    //await ThemeController.to.loadThemeMode(AuthService.to.settings?.themeMode);
    isLoading.value = false;
  }

  logout() async {
    isLoading.value = true;
    await AuthService.to.logout();
    isLoading.value = false;
  }

  register() async {
    isLoading.value = true;
    await AuthService.to
        .createUser(email.text, password.text, confirmPassword.text, name.text);
    isLoading.value = false;
  }

  resetPassword() async {
    isLoading.value = true;
    await AuthService.to.resetPassword(email.text);
    isLoading.value = false;
  }
}
