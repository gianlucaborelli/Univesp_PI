import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:sisgem_app/controllers/users_controller.dart';
import 'package:sisgem_app/pages/users_page/components/list_of_users.dart';
import 'package:sisgem_app/pages/users_page/users_details/users_detail_page.dart';
import 'package:sisgem_app/utility/responsive.dart';

class UsersPage extends StatefulWidget {
  const UsersPage({super.key});

  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  @override
  initState() {
    super.initState();
    UsersController.to.start();
  }

  Widget _start() {
    return Container();
  }

  Widget _loading() {
    return const Center(child: CircularProgressIndicator());
  }

  Widget _onError() {
    return Container();
  }

  Widget _ready() {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Responsive(
        mobile: const ListOfUsers(),
        tablet: const Row(
          children: [
            Expanded(
              flex: 6,
              child: ListOfUsers(),
            ),
            Expanded(
              flex: 9,
              child: UserDetailPage(),
            ),
          ],
        ),
        desktop: Row(
          children: [
            Expanded(
              flex: size.width > 1120 ? 3 : 5,
              child: const ListOfUsers(),
            ),
            Expanded(
              flex: size.width > 1120 ? 6 : 10,
              child: const UserDetailPage(),
            ),
          ],
        ),
      ),
    );
  }

  Widget stateManagement(UsersControllerState state) {
    switch (state) {
      case UsersControllerState.starting:
        return _start();
      case UsersControllerState.loading:
        return _loading();
      case UsersControllerState.onError:
        return _onError();
      case UsersControllerState.ready:
        return _ready();
      default:
        return _start();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Usuários"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context, false),
        ),
      ),
      body: Obx(
        () {
          return stateManagement(UsersController.to.state);
        },
      ),
    );
  }
}
