import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/model/user_model.dart';
import 'package:sisgem_app/utility/dio_interceptor/onerror_interceptor.dart';
import 'package:sisgem_app/utility/dio_interceptor/onrequest_interceptor.dart';
import 'package:sisgem_app/utility/message_snackbar.dart';
import 'package:sisgem_app/utility/webservice_url.dart';

class UserService extends GetxController {
  static final String _baseUrl = WebServiceUrl.baseUrl;
  late final Dio _dio;

  UserService() {
    _dio = Dio(BaseOptions(
      connectTimeout: const Duration(milliseconds: 5000),
    ));
    _dio.interceptors.add(OnRequestInterceptor());
    _dio.interceptors.add(OnErrorInterceptor());
  }

  static UserService get to => Get.find<UserService>();

  Future<List<UserModel>> getAllUsers() async {
    try {
      var response = await _dio.get(_baseUrl);
      var list = response.data as List;
      return list.map((json) => UserModel.fromJson(json)).toList();
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } catch (e) {
      MessageSnackBar(message: e.toString()).show();
    }
    return [];
  }

  Future<UserModel?> getUserById(String id) async {
    try {
      var url = "$_baseUrl/$id";
      var response = await _dio.get(url);
      UserModel user = UserModel.fromJson(response.data);
      return user;
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } catch (e) {
      MessageSnackBar(message: e.toString()).show();
    }
    return null;
  }

  Future<UserModel?> createNewUser(UserModel newUser) async {
    try {
      var url = _baseUrl;
      var response = await _dio.post(url, data: newUser);
      var user = response.data;
      MessageSnackBar(
              message: "Usuário criado com sucesso.",
              title: "Criação de Usuário")
          .show();
      return user;
    } on DioException catch (e) {
      MessageSnackBar(
              message: e.response!.data.toString(), title: "Criação de Usuário")
          .show();
    } catch (e) {
      MessageSnackBar(message: e.toString(), title: "Criação de Usuário")
          .show();
    }
    return null;
  }

  Future<UserModel?> updateUser(UserModel newUser) async {
    try {
      var url = _baseUrl;
      var response = await _dio.put(url, data: newUser);
      var user = response.data;
      MessageSnackBar(
              message: "Usuário atualizado com sucesso.",
              title: "Atualização de Usuário")
          .show();
      return user;
    } on DioException catch (e) {
      MessageSnackBar(
              message: e.response!.data.toString(),
              title: "Atualização de Usuário")
          .show();
    } catch (e) {
      MessageSnackBar(message: e.toString(), title: "Atualização de Usuário")
          .show();
    }
    return null;
  }

  Future deleteUserById(String id) async {
    try {
      var url = "$_baseUrl/$id";
      await _dio.delete(url);
      MessageSnackBar(
              message: "Usuário excluido com sucesso.",
              title: "Exclusão de Usuário")
          .show();
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } catch (e) {
      MessageSnackBar(message: e.toString()).show();
    }
  }
}
