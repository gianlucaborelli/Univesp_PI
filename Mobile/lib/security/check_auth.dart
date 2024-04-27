import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/pages/home_page.dart';

import '../pages/auth_pages/login/login_page.dart';
import '../service/auth_service.dart';

class CheckAuth extends StatelessWidget {
  const CheckAuth({super.key});
  final bool userIsAuthenticated = false;

  @override
  Widget build(BuildContext context) {
    return Obx(() => AuthService.to.userIsAuthenticated.value
        ? HomePage()
        : const LoginPage());
  }
}
