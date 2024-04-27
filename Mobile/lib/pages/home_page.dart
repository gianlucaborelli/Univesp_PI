import 'package:flutter/material.dart';
import 'package:sisgem_app/service/auth_service.dart';
import 'package:sisgem_app/widgets/admin_appbar.dart';
import 'package:sisgem_app/widgets/custumer_appbar.dart';
import 'package:sisgem_app/widgets/navbar.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});

  final bool isAdmin = AuthService.to.user?.role == 'ROLE_ADMIN';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: isAdmin ? AdminAppBar() : CustumerAppBar(),
      drawer: isAdmin ? const NavBar() : null,
    );
  }
}
