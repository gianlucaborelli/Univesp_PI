import 'package:dio/dio.dart';
import 'package:sisgem_app/security/secure_storage.dart';

class OnRequestInterceptor extends Interceptor {
  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    var accessToken = await TokenSecureStore().getAccessTokens();

    if (accessToken != null) {
      options.headers['Authorization'] = 'Bearer $accessToken';
    }
    options.headers['Content-Type'] = 'application/json';

    return handler.next(options);
  }
}
