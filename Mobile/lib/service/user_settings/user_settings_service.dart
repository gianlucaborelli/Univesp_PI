import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/utility/dio_interceptor/onerror_interceptor.dart';
import 'package:sisgem_app/utility/dio_interceptor/onrequest_interceptor.dart';
import 'package:sisgem_app/utility/message_snackbar.dart';
import 'package:sisgem_app/utility/webservice_url.dart';

class UserSettingsService extends GetxController {
  late final Dio _dio;

  UserSettingsService() {
    _dio = Dio(BaseOptions(
      connectTimeout: const Duration(milliseconds: 5000),
    ));
    _dio.interceptors.add(OnRequestInterceptor());
    _dio.interceptors.add(OnErrorInterceptor());
  }

  static UserSettingsService get to => Get.find<UserSettingsService>();

  updateSettings(String settingsProperty, int settingsValue) async {
    // try {
    //   var url = WebServiceUrl.settings;

    //   await _dio.post(
    //     '$url/$settingsProperty/value=$settingsValue',
    //   );
    // } on DioException catch (e) {
    //   MessageSnackBar(message: e.response!.data.toString()).show();
    // }
  }
}
