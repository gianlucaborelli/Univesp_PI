import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/model/user.dart';
import 'package:sisgem_app/model/user_settings.dart';
import 'package:sisgem_app/security/secure_storage.dart';
import 'package:sisgem_app/security/user_token_handler.dart';
import 'package:sisgem_app/utility/dio_interceptor/onerror_interceptor.dart';
import 'package:sisgem_app/utility/dio_interceptor/onrequest_interceptor.dart';
import 'package:sisgem_app/utility/message_snackbar.dart';
import 'package:sisgem_app/utility/webservice_url.dart';

class AuthService extends GetxController {
  late final Dio _dio;
  final Rxn<User?> _user = Rxn<User?>();
  final Rxn<UserSettings?> _settings = Rxn<UserSettings?>();
  var userIsAuthenticated = false.obs;

  AuthService() {
    _dio = Dio(BaseOptions(
      connectTimeout: const Duration(milliseconds: 5000),
    ));
    _dio.interceptors.add(OnRequestInterceptor());
    _dio.interceptors.add(OnErrorInterceptor());
  }

  @override
  void onInit() {
    super.onInit();
    ever(_user, (User? user) => userIsAuthenticated.value = user != null);
  }

  User? get user => _user.value;
  UserSettings? get settings => _settings.value;
  static AuthService get to => Get.find<AuthService>();

  createUser(String email, String password, String confirmPassword,
      String name) async {
    final Map<String, dynamic> registerData = {
      'name': name,
      'email': email,
      'password': password,
      "confirmPassword": password
    };
    try {
      var response = await _dio.post(
        WebServiceUrl.register,
        data: registerData,
      );

      if (response.statusCode == 200) {
        MessageSnackBar(
                message:
                    'Foi enviado um email de confirmação para o e-mail cadastrado')
            .show();
      }
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    }
  }

  Future login(String email, String password) async {
    final Map<String, dynamic> loginData = {
      'email': email,
      'password': password
    };

    try {
      var response = await _dio.post(WebServiceUrl.login, data: loginData);

      final Map<String, dynamic> responseData = response.data;

      TokenSecureStore().saveTokens(
        responseData['accessToken'],
        responseData['refreshToken'],
      );

      _user.value = UserTokenHandler().createUser(responseData['accessToken']);
      //_settings.value = UserSettings.fromJson(responseData['settings']);

      userIsAuthenticated.value = true;
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    }
  }

  Future refreshToken() async {
    try {
      final Map<String, dynamic> refreshTokenData = {
        'accessToken': TokenSecureStore().getAccessTokens(),
        'refresToken': TokenSecureStore().getRefreshTokens()
      };

      var response = await _dio.post(
        WebServiceUrl.refresToken,
        data: refreshTokenData,
      );

      final Map<String, dynamic> responseData = response.data;

      TokenSecureStore().saveTokens(
        responseData['accessToken'],
        responseData['refreshToken'],
      );
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    }
  }

  resetPassword(String email) async {}

  Future logout() async {
    try {
      await _dio.post(WebServiceUrl.logout);
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } finally {
      _user.value = null;
      TokenSecureStore().deleteTokens();
    }
  }
}
