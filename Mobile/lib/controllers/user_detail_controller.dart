import 'package:get/get.dart';
import 'package:sisgem_app/model/user_model.dart';
import 'package:sisgem_app/service/user_service.dart';

class UserDetailController extends GetxController {
  final Rx<UserModel?> _userModel = Rxn<UserModel?>();
  var isLoading = false.obs;

  static UserDetailController get to => Get.find();
  UserModel? get user => _userModel.value;

  loadUser(String id) async {
    isLoading.value = true;
    _userModel.value = await UserService.to.getUserById(id);
    isLoading.value = false;
  }
}
