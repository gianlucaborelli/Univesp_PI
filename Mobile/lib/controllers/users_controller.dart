import 'package:get/get.dart';
import 'package:sisgem_app/model/user_model.dart';
import 'package:sisgem_app/service/user_service.dart';

class UsersController extends GetxController {
  final Rx<UsersControllerState> _state = Rx(UsersControllerState.starting);
  List<UserModel> users = [];

  static UsersController get to => Get.find<UsersController>();

  UsersControllerState get state => _state.value;

  Future start() async {
    _state.value = UsersControllerState.loading;
    try {
      users = await UserService.to.getAllUsers();
      _state.value = UsersControllerState.ready;
    } catch (ex) {
      _state.value = UsersControllerState.onError;
    }
  }
}

enum UsersControllerState { starting, loading, ready, onError }
