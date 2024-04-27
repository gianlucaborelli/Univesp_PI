import 'dart:async';

import 'package:dio/dio.dart';
import 'package:sisgem_app/security/secure_storage.dart';
import 'package:sisgem_app/service/auth_service.dart';

class OnErrorInterceptor extends Interceptor {
  @override
  FutureOr<void> onError(
    err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.response?.statusCode == 401) {
      await AuthService.to.refreshToken();
      var newAccessToken = TokenSecureStore().getAccessTokens();

      err.requestOptions.headers['Authorization'] = 'Bearer $newAccessToken';

      return handler.resolve(await _retry(err.requestOptions));
    }
    return handler.next(err);
  }

  Future<Response<dynamic>> _retry(RequestOptions requestOptions) async {
    final options = Options(
      method: requestOptions.method,
      headers: requestOptions.headers,
    );
    return Dio().request<dynamic>(
      requestOptions.path,
      data: requestOptions.data,
      queryParameters: requestOptions.queryParameters,
      options: options,
    );
  }
}
