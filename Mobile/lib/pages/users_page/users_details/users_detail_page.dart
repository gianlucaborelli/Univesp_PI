import 'package:flutter/material.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:sisgem_app/controllers/user_detail_controller.dart';
import 'package:sisgem_app/utility/responsive.dart';

class UserDetailPage extends StatefulWidget {
  final String? user;

  const UserDetailPage({Key? key, this.user}) : super(key: key);

  @override
  State<UserDetailPage> createState() => _UserDetailPageState();
}

class _UserDetailPageState extends State<UserDetailPage> {
  @override
  void initState() {
    if (widget.user != null) {
      UserDetailController.to.loadUser(widget.user!);
    }
    super.initState();
  }

  _ready() {
    if (UserDetailController.to.user == null) {
      return Container();
    } else {
      return Responsive(
        mobile: Scaffold(
          appBar: AppBar(
            title: const Text('Usuário'),
            centerTitle: true,
            backgroundColor: Color.fromARGB(
                255, 101, 233, 233), // Defina a cor da AppBar aqui
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: ListView(
              padding: EdgeInsets.all(8.0),
              children: [
                _buildDetailItem("Nome", UserDetailController.to.user!.name!),
                _buildDetailItem(
                    "E-mail", UserDetailController.to.user!.email!),
                _buildDetailItem(
                    "Observação", UserDetailController.to.user!.obs!),
                _buildDetailItem("Função", UserDetailController.to.user!.role!),
              ],
            ),
          ),
        ),
        desktop: Scaffold(
          body: Text(UserDetailController.to.user!.name!),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => UserDetailController.to.isLoading.value
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : _ready(),
    );
  }

  Widget _buildDetailItem(String description, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          description,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 14,
          ),
        ),
        SizedBox(height: 16),
      ],
    );
  }
}
