import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenSecureStore {
  final storage = const FlutterSecureStorage();

  Future<bool> saveTokens(String accessToken, String refreshToken) async {
    await storage.write(key: 'accessToken', value: accessToken);
    await storage.write(key: 'refreshToken', value: refreshToken);

    return true;
  }

  Future<String?> getAccessTokens() async {
    String? accessToken = await storage.read(key: 'accessToken');
    return accessToken;
  }

  Future<String?> getRefreshTokens() async {
    String? token = await storage.read(key: 'refreshToken');
    return token;
  }

  Future<bool> deleteTokens() async {
    await storage.deleteAll();

    return true;
  }
}
