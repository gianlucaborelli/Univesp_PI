import 'dart:io';

class WebServiceUrl {
  static String get baseUrl {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080';
    } else if (Platform.isWindows) {
      // URL para Windows
      return 'http://localhost:8080';
    } else {
      return 'http://localhost:8080';
    }
  }  

  static String login = '$baseUrl/auth/login';
  static String refresToken = '$baseUrl/auth/refresh-token';
  static String register = '$baseUrl/auth/register';
  static String logout = '$baseUrl/auth/logout';
}
